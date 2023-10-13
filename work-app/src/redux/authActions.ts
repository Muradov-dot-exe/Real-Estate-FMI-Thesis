import * as types from "./actionType";
import { auth, facebookAuthProvider, googleAuthProvider } from "../firebase";

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFailed = (error: Error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

const googleSignInStart = () => ({
  type: types.GOOGLE_SIGN_IN_START,
});

const googleSignInSuccess = (user: any) => ({
  type: types.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

const googleSignInFailed = (error: Error) => ({
  type: types.GOOGLE_SIGN_IN_FAIL,
  payload: error,
});

const facebookSignInStart = () => ({
  type: types.FACEBOOK_SIGN_IN_START,
});

const facebookSignInSuccess = (user: any) => ({
  type: types.FACEBOOK_SIGN_IN_SUCCESS,
  payload: user,
});

const facebookSignInFailed = (error: Error) => ({
  type: types.FACEBOOK_SIGN_IN_FAIL,
  payload: error,
});

export const setUser = (user: any) => ({
  type: types.SET_USER,
  payload: user,
});

export const logoutInitiate = (): any => {
  return function (dispatch: any) {
    dispatch(logoutStart());
    auth
      .signOut()
      .then((response: any) => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFailed(error.message)));
  };
};

export const googleSignInInitiate = (): any => {
  return function (dispatch: any) {
    dispatch(googleSignInStart());
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleSignInSuccess(user));
      })
      .catch((error) => dispatch(googleSignInFailed(error.message)));
  };
};

export const facebookSignInInitiate = (): any => {
  return function (dispatch: any) {
    dispatch(facebookSignInStart());
    auth
      .signInWithPopup(facebookAuthProvider.addScope("user_birthday,email"))
      .then(({ user }) => {
        dispatch(facebookSignInSuccess(user));
      })
      .catch((error) => dispatch(facebookSignInFailed(error.message)));
  };
};
