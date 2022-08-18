import { UserConstants } from "../actions/UserConstants";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

const UserReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserConstants.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case UserConstants.GETALL_REQUEST:
      return {
        registering: true,
      };
    case UserConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registerState: true,
        data: payload,
      };
    case UserConstants.REGISTER_FAILURE:
      return {
        ...state,
        registerState: false,
        error: payload,
      };
    case UserConstants.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case UserConstants.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case UserConstants.ACCOUNT_DELETED:
    case UserConstants.AUTH_ERROR:
    case UserConstants.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default UserReducers;
