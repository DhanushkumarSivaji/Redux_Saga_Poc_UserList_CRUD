import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UserList from './UserList';
import {connect} from 'react-redux';
import {getUsersRequest,createUserRequest,deleteUserRequest,usersError,updateUserRequest} from '../actions/users';
class NewUserForm extends Component {
constructor (props){
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        toggleButton:true,
        id:null
    };
    this.UpdateUser = this.UpdateUser.bind(this)
}



    handleSubmit = e => {
        e.preventDefault();
        const {firstName, lastName} = this.state;

        this.props.onSubmit({
            firstName,
            lastName
        });

        this.setState({
            firstName: '',
            lastName: ''
        });
    };

    handleFirstNameChange = e => {
        this.setState({
            firstName: e.currentTarget.value
        });
    };

    handleLastNameChange = e => {
        this.setState({
            lastName: e.currentTarget.value
        });
    };

    handleDeleteUserClick = (userId) => {
        this.props.deleteUserRequest(userId)
      }

      handleUpdateUserClick = (users) => {
            this.setState({firstName:users.firstName , lastName:users.lastName,id:users.id})
            this.setState({toggleButton:false})
      } 

      UpdateUser = () => {
        let user = {
            id:this.state.id,
            firstName:this.state.firstName,
            lastName:this.state.lastName
        }

        this.props.updateUserRequest(user)

       
      }
    
      CancelUpdate = () => {
          this.setState({firstName:'',lastName:'',id:null,toggleButton:true})
      }

    render() {
        const users = this.props.users;
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>
                        First name
                    </Label>
                    <Input  required type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Last name
                    </Label>
                    <Input  required type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
                </FormGroup>
                <FormGroup>
                    {this.state.toggleButton ? <Button block outline type="submit"  color="primary">Create</Button> :<> <Button block outline color='primary' onClick={this.UpdateUser} >Update</Button> <Button block outline color='danger' onClick={this.CancelUpdate}>Cancel</Button> </>}
                </FormGroup>
            </Form>
            <UserList onDeleteUser={this.handleDeleteUserClick}  onUpdateUser={this.handleUpdateUserClick} users={users.items}/>
            </div>
        );
    }
}

export default connect(({users})=>({users}),{getUsersRequest,createUserRequest,deleteUserRequest,usersError,updateUserRequest}) (NewUserForm);