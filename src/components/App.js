import React ,{Component}from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getUsersRequest,createUserRequest,deleteUserRequest,usersError} from '../actions/users';
import NewUserForm from './NewUserForm';
import {Alert} from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.props.getUsersRequest()
 this.state = {}
  }

  handleCreateUserSubmit = ({firstName, lastName}) => {
    this.props.createUserRequest({firstName,lastName})
};


  handleCloseAlert = () => {
    this.props.usersError({
        error: ''
    });
};



  render() {
    
    return (
      <div style={{margin:'0 auto',padding:'20px',maxWidth:'600px'}}>
         <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
                    {this.props.users.error}
          </Alert>
        <NewUserForm onSubmit={this.handleCreateUserSubmit} value={this.state}/>
       
      </div>
    );
  }
}

export default connect(({users})=>({users}),{getUsersRequest,createUserRequest,deleteUserRequest,usersError})(App);

