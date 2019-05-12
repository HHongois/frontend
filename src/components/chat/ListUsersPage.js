import React, { Component } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';
import io from 'socket.io-client';
import './Chat.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import compose from 'recompose/compose';


class ListUsersPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            loading: true,
            selectedUserId: null,
            chatListUsers: []
        };
    }

    componentDidMount() {
        const {
            getUsers
        } = this.props;
        getUsers().then((res) => {
            // console.log(res)
            this.setState({
                chatListUsers: res.payload,
            });
        });
    }

    selectedUser = (user) => {
        this.setState({
            selectedUserId: user.id
        });
        this.props.updateSelectedUser(user)
    }

    render() {
        return (
            <div>

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
               
        );
    }


}

ListUsersPage.propTypes = {
    getListUsers: PropTypes.func.isRequired


};

const mapStateToProps = state => ({
    userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({

    getUsers: () => dispatch(getAllUsers())

});

export default  connect(
        mapStateToProps,
        mapDispatchToProps
    )(ListUsersPage);
