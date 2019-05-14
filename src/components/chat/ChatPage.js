import React, { Component } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';
import io from 'socket.io-client';
import './ListUsers.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
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
        userId: null,
        username: '',
        message: '',
        messages: [],
        loading: true,
        selectedUserId: null,
        chatListUsers: [],
        messageLoading: true,
        conversations: [],
        selectedUser: null,
        salon:[],
    }
    constructor(props) {
        super(props);
       
       
        socket.on('newmsg', (data) =>{
               document.getElementById('message-container').innerHTML += '<div><b>' + 
                  data.user + '</b>: ' + data.message + '</div>'
        });

        socket.on('erreur',(data) =>{
             alert(data);  
        });

        socket.on('addSalon',(data) => {
          this.setState({
              salon : data 
          })
        console.log('addSalon')
        console.log(this.state.salon)
       });

    }

    componentDidMount() {
        const { history, getUsers,match } = this.props;
        if (!localStorage.jwtToken) {
            return history.push('/signIn');
        } else {
            this.setState({
                userId: match.params.id
            });
            getUsers().then((res) => {
                this.setState({
                    chatListUsers: res.payload,
                });
            });
           // console.log(this.state.userId)

        }
    }


    selectedUser = async(user) => {
        this.setState({
            selectedUserId: user._id
        });

        if(this.state.selectedUserId){
            
            console.log(this.state.selectedUserId,this.state.userId)
            socket.emit('conversation',{user1: this.state.userId,user2:this.state.selectedUserId});
        }
        // this.ajoutSalon();
    }
    // ajoutSalon (){
    //     socket.on('addSalon',function(data) {
    //         console.log(data)
    //       this.setState({
    //           salon : data 
    //       })
    //        console.log(this.state.salon)
    //    });
       
    // }


    sendMessage = (event) => {
        if (event.key === 'Enter') {
            const msg = event.target.value;
            if (msg === '' || msg === undefined || msg === null) {
                alert(`Message can't be empty.`);
            } else if (this.state.selectedUser === undefined) {
                alert(`Select a user to chat.`);
            } else {
                if(msg && this.state.salon._id) {
                    socket.emit('msg', {message: msg, user: this.state.userId,salonId:this.state.salon._id});
                 }
                event.target.value = '';
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavbarContainer />
                <div className={classes.root}>


                        <Grid container  className="chat-message">
                            <Grid item xs={3} className=" chat-list-container">
                                    <ul className={`user-list ${this.state.chatListUsers.length === 0 ? 'visibility-hidden' : ''}`} >
                                        {
                                            this.state.chatListUsers.map((user, index) =>
                                                <li
                                                    key={index}
                                                    className={this.state.selectedUserId === user.id ? 'active' : ''}
                                                    onClick={() => this.selectedUser(user)}
                                                >
                                                    {user.name}
                                                    <span className={user.online === 'Y' ? 'online' : 'offline'}></span>
                                                </li>
                                            )
                                        }
                                    </ul>
                            </Grid>
                            <Grid item xs={8} className="message-container">

                                        <div id="message-container">
                                        </div>

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
    getMsg: (expediteur, destinataire) => dispatch(getMsgUser(expediteur, destinataire))

});

export default compose(
    withStyles(styles), connect(
        mapStateToProps,
        mapDispatchToProps
    ))(ChatPage);
