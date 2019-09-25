import React,{Component} from 'react';

import {ListGroup,ListGroupItem,Button} from 'reactstrap';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {

        const {users,onDeleteUser,onUpdateUser} = this.props
        return (
            <ListGroup>
            {users.sort((a, b) => {
                if (a.firstName > b.firstName) {
                    return 1;
                } else if (a.firstName < b.firstName) {
                    return -1;
                } else if (a.lastName > b.lastName) {
                    return 1;
                } else if (a.lastName < b.lastName) {
                    return -1;
                }
                return 0;
            }).map((user) => {
                return (
                    <ListGroupItem key={user.id}>
                        <section style={{display:'flex'}}>
                            <div style={{flexFlow: 1,margin:'auto'}}>
                                {user.firstName} {user.lastName}
                            </div>
                            <div>
                            <Button outline color="warning" onClick={()=>onUpdateUser(user)}>
                                    Update
                                </Button>
                                {' '}
                                
                                <Button outline color="danger" onClick={()=>onDeleteUser(user.id)}>
                                    Delete
                                </Button>
                              
                                
                            </div>
                        </section>
                    </ListGroupItem>
                );
            })}
        </ListGroup> 
        );
    }
}

export default UserList;