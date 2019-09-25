import{takeEvery,takeLatest,take,call,fork,put} from 'redux-saga/effects';
import * as actions from '../actions/users'
import * as api from '../api/users';

function* getUsers(){
    try{
        const result = yield call(api.getUsers);
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }))
    }catch(e){
        yield put(actions.usersError({
            error: 'An error occurred when trying to get the users'
        }));
    }
}

function* watchGetUserRequest(){

    yield takeEvery(actions.Types.GET_USERS_REQUEST,getUsers)
}

function* createUser(action){
    try {
        yield call(api.createUser,{firstName:action.payload.firstName,lastName:action.payload.lastName});
        yield call(getUsers);
    } catch (error) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to create the user'
        }));
    }
}

function* watchCreateUserRequest(){
    yield takeLatest(actions.Types.CREATE_USER_REQUEST,createUser)
}

function* deleteUser(userId){
    try{
        yield call(api.deleteUser, userId);

        yield call(getUsers);
    }catch(e){
        yield put(actions.usersError({
            error: 'An error occurred when trying to delete the user'
        }));
	}
}

function* watchDeleteUserRequest(){
    while(true){
        const {payload} = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, payload.userId);
    }
}

function* updateUser(user){
    try{
        yield call(api.updateUser, user);

        yield call(getUsers);
    }catch(e){
        yield put(actions.usersError({
            error: 'An error occurred when trying to update the user'
        }));
	}
}

function* watchUpdateUserRequest(){
    while(true){
        const {payload} = yield take(actions.Types.UPDATE_USER_REQUEST);
        yield call(updateUser, payload.user);
    }
}

const  userSagas = [
   fork(watchGetUserRequest),
   fork(watchCreateUserRequest),
   fork(watchDeleteUserRequest),
   fork(watchUpdateUserRequest)
];

export default userSagas;