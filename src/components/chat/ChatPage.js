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

    constructor(props) {
        super(props);

        this.state = {
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
            selectedUser: null
        }
        // socket.on('RECEIVE_MESSAGE', function (data) {
        //     addMessage(data);
        // });

        // const addMessage = data => {
        //     console.log(data);
        //     this.setState({ messages: [...this.state.messages, data] });
        //     console.log(this.state.messages);
        // };

        // this.sendMessage = ev => {
        //     ev.preventDefault();
        //     socket.emit('SEND_MESSAGE', {
        //         author: this.state.username,
        //         message: this.state.message
        //     })
        //     this.setState({ message: '' });

        // }
    }

    componentDidMount() {
        //console.log(localStorage.userid)
        const { history, getUsers } = this.props;
        if (!localStorage.jwtToken) {
            return history.push('/signIn');
        } else {
            this.setState({
                userId: localStorage.userid
            });
            getUsers().then((res) => {
                // console.log(res)
                this.setState({
                    chatListUsers: res.payload,
                });
            });
        }
    }


    selectedUser = (user) => {
        // console.log(user._id)
        this.setState({
            selectedUserId: user._id
        });
        this.getMessages();
        // this.props.updateSelectedUser(user)
    }
    updateSelectedUser = (user) => {
        // console.log(user)
        this.setState({
            selectedUser: user
        });
    }
    // static getDerivedStateFromProps(props, state) {
    //     console.log(props);
    //     console.log('ici')
    //     if (state.selectedUser === null || state.selectedUser._id !== props.newSelectedUser.id) {
    //         return {
    //             selectedUser: props.newSelectedUser
    //         };
    //     }
    //     return null;
    // }

    receiveSocketMessages = (socketResponse) => {
        const { selectedUser } = this.state;
        if (selectedUser !== null && selectedUser.id === socketResponse.fromUserId) {
            this.setState({
                conversations: [...this.state.conversations, socketResponse]
            });
            this.scrollMessageContainer();
        }
    }

    getMessages = async () => {
        try {
            const { getMsg } = this.props;

            // this.setState({
            //     conversations : getMsg(this.state.userId, this.state.selectedUserId),
            //     messageLoading: false
            // });
            console.log(this.state.selectedUserId)
            getMsg(this.state.userId, this.state.selectedUserId).then((res) => {
                console.log(res.payload);

            });


        } catch (error) {
            console.log(error)


        }
    }

    sendMessage = (event) => {
        if (event.key === 'Enter') {
            const message = event.target.value;
            const { userId, newSelectedUser } = this.props;
            if (message === '' || message === undefined || message === null) {
                alert(`Message can't be empty.`);
            } else if (userId === '') {
                this.router.navigate(['/']);
            } else if (newSelectedUser === undefined) {
                alert(`Select a user to chat.`);
            } else {
                this.sendAndUpdateMessages({
                    fromUserId: userId,
                    message: (message).trim(),
                    toUserId: newSelectedUser.id,
                });
                event.target.value = '';
            }
        }
    }

    sendAndUpdateMessages(message) {
        try {
            //   ChatSocketServer.sendMessage(message);
            this.setState({
                conversations: [...this.state.conversations, message]
            });
            this.scrollMessageContainer();
        } catch (error) {
            alert(`Can't send your message`);
        }
    }

    scrollMessageContainer() {
        if (this.messageContainer.current !== null) {
            try {
                setTimeout(() => {
                    this.messageContainer.current.scrollTop = this.messageContainer.current.scrollHeight;
                }, 100);
            } catch (error) {
                console.warn(error);
            }
        }
    }

    alignMessages(toUserId) {
        const { userId } = this.props;
        return userId !== toUserId;
    }

    getMessageUI() {
        return (
            <ul ref={this.messageContainer} className="message-thread">
                {
                    this.state.conversations.map((conversation, index) =>
                        <li className={`${this.alignMessages(conversation.toUserId) ? 'align-right' : ''}`} key={index}> {conversation.message} </li>
                    )
                }
            </ul>
        )
    }

    getInitiateConversationUI() {
        if (this.props.newSelectedUser !== null) {
            return (
                <div className="message-thread start-chatting-banner">
                    <p className="heading">
                        You haven 't chatted with {this.props.newSelectedUser.username} in a while,
              <span className="sub-heading"> Say Hi.</span>
                    </p>
                </div>
            )
        }
    }
    // getChatListComponent() {
    //     return <ChatList updateSelectedUser={this.updateSelectedUser} />
    // }
    // getChatBoxComponent = () => {
    //     return <Conversation userId={this.state.userId} newSelectedUser={this.state.selectedUser} />
    // }
    render() {
        const { classes } = this.props;
        const { messageLoading, selectedUser } = this.state;

        return (
            <div>
                <NavbarContainer />
                <div className={classes.root}>


                        <Grid container >
                            <Grid item xs={3} className=" chat-list-container">
                                <div className=" chat-list-container">
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
                                </div>
                            </Grid>
                            <Grid item xs={3} className="message-container">
                                {/* <div className={`message-overlay ${!messageLoading ? 'visibility-hidden' : ''}`}>
                                    <h3> {selectedUser !== null && selectedUser.name ? 'Loading Messages' : ' Select a User to chat.'}</h3>
                                </div> */}
                                <div className={`message-wrapper ${messageLoading ? 'visibility-hidden' : ''}`}>
                                    <div className="message-container">
                                        <div className="opposite-user">
                                            {/* Chatting with {this.props.newSelectedUser !== null ? this.props.newSelectedUser.username : '----'} */}
                                        </div>
                                        {/* {this.state.conversations.length > 0 ? this.getMessageUI() : this.getInitiateConversationUI()} */}
                                    </div>

                                    <div className="message-typer">
                                        <form>
                                            <textarea className="message form-control" placeholder="Type and hit Enter" onKeyPress={this.sendMessage}>
                                            </textarea>
                                        </form>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                </div>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">Global Chat</div>
                                    <hr />
                                    <div className="messages">
                                        {this.state.messages.map(message => {
                                            return (
                                                <div>{message.author}: {message.message}</div>
                                            )
                                        })}
                                    </div>
                                    <div className="footer">
                                        <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                        <br />
                                        <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                        <br />
                                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
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
