import {
    USER_SIGN_IN,
    USER_SIGN_OUT,
    } from 'actions/actionTypes';
    
    const initialState = {
      email: '',
      token: '',
      name: '',
    };
    
    const userReducer = (state = initialState, action) => {
      switch (action.type) {
        case USER_SIGN_IN:
          return {
            ...state,
            token: action.payload.token,
            email: action.payload.email,
            name: action.payload.name,
            isAdmin: action.payload.isAdmin
          };
        case USER_SIGN_OUT:
          return initialState;
        default:
          return state;
      }
    };
    
    export default userReducer;