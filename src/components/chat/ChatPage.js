import React, { Component } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';
import io from 'socket.io-client';
import './ListUsers.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers, getUser } from '../../actions/userActions';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import { red } from '@material-ui/core/colors';
import ChatList from './ListUsersPage';
// import Conversation from './DiscussionPage';
import { getMsgUser } from '../../actions/msgActions';

// import openSocket from 'socket.io-client';
const socket = io('http://localhost:5000');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    couleur: {
        backgroundColor: red,
    }
});

class ChatPage extends Component {
    state = {
        isOverlayVisible: true,
        selectedUser: null,
        send: null,
        username: '',
        message: '',
        messages: [],
        loading: true,
        selectedUserId: null,
        chatListUsers: [],
        messageLoading: true,
        conversations: [],
        receiver: null,
        receiverId: null,
        salon: [],
        listMessages:null
    }
    constructor(props) {
        super(props);


        socket.on('newmsg', (data) => {
            console.log('Ajout message')
            document.getElementById('message-container').innerHTML +='<li><b>'+data.user +
            ':</b><span>'+data.message+'</span></li>'
        });

        socket.on('erreur', (data) => {
            alert(data);
        });

        socket.on('addSalon', (data) => {
            this.setState({
                salon: data
            })
            console.log('Nouveau salon')
            this.getMessages();
        });

    }

    componentDidMount() {
        const { history, getUsers, match, getUserById } = this.props;
        if (!localStorage.jwtToken) {
            return history.push('/signIn');
        } else {
            getUserById(match.params.id).then((res) => {
                this.setState({
                    sender: res.payload.user
                });
            })

            getUsers().then((res) => {
                this.setState({
                    chatListUsers: res.payload,
                });
            });
        }
        console.log(this.state.sender,this.state.chatListUsers);
    }


    selectedUser = async (user) => {
        console.log(this.state.chatListUsers[0]._id)
        console.log(this.state.sender._id )

        console.log(this.state.sender._id == this.state.chatListUsers[0]._id )
        this.setState({
            receiver: user,
            receiverId: user._id
        });

        if (this.state.receiver) {
            socket.emit('conversation', { user1: this.state.sender, user2: this.state.receiver });
        }
    }

    sendMessage = (event) => {
        if (event.key === 'Enter') {
            const msg = event.target.value;
            if (msg === '' || msg === undefined || msg === null) {
                alert(`Message can't be empty.`);
            } else if (this.state.receiver === undefined) {
                alert(`Select a user to chat.`);
            } else {
                if (msg && this.state.salon._id) {
                    socket.emit('msg', { message: msg, user: this.state.sender.name, salonId: this.state.salon._id });
                }
                event.target.value = '';
            }
        }
    }
    getMessages = ()=>{
    var tmp = null;
        if (this.state.salon.length == 0){
           tmp = <p>Pas de salon</p>;
        }
        else if(this.state.salon.messages.length == 0) {

            tmp = <p>Pas de messages</p>;
        } else {

            tmp =this.state.salon.messages.map((message, index) =>
                <li
                key={index}>
                    <b>
                        {message.userName} :
                    </b>
                    <span>
                        {message.contenu}
                    </span>
                </li>
                );
        }
        this.setState({
            listMessages : tmp
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavbarContainer />
                <div className={classes.root}>


                    <Grid container className="chat-message">
                        <Grid item xs={3} className=" chat-list-container">
                            <ul className={`user-list ${this.state.chatListUsers.length === 0 ? 'visibility-hidden' : ''}`} >
                                {

                                    this.state.chatListUsers.map((user, index) => 

                                    
                                    // {this.state.sender &&
                                    //  {user && this.state && this.state.sender && user._id != this.state.sender._id && 
                                        <li
                                            key={index}
                                            className={this.state.receiverId === user._id ? 'active' : ''}
                                            onClick={() => this.selectedUser(user)}
                                        >
                                            {user.name}
                                            <span className={user.online === 'Y' ? 'online' : 'offline'}></span>
                                        </li>
                                    //     console.log(this.state.sender)
                                    // console.log( user)

                                    // }
                                // }
                                    )
                                }
                                
                            </ul>
                        </Grid>
                        <Grid item xs={8} className="message-container">

                            <ul id="message-container">
                                {
                                        this.state.listMessages
                                    
                                }
                            </ul>

                            <textarea className="message" placeholder="Entrez votre message " onKeyPress={this.sendMessage}>
                            </textarea>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }


}

ChatPage.propTypes = {
    // getListUsers: PropTypes.func.isRequired
    getMsg: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    userReducer: state.userReducer,
    msgReducer: state.msgReducer

});

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getAllUsers()),
    getUserById: (id) => dispatch(getUser(id)),
    getMsg: (expediteur, destinataire) => dispatch(getMsgUser(expediteur, destinataire))

});

export default compose(
    withStyles(styles), connect(
        mapStateToProps,
        mapDispatchToProps
    ))(ChatPage);
