import * as types from "./actionType";
import { auth } from "../firebase";
import { User } from "firebase/auth";

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (user: any) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFailed = (error: Error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user: any) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFailed = (error: Error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

export const registerInitiate = (
  email: string,
  password: string,
  displayName: string
): any => {
  return function (dispatch: any) {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user?.updateProfile({
          displayName,
        });
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFailed(error.message)));
  };
};

export const loginInitiate = (email: string, password: string): any => {
  return function (dispatch: any) {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => dispatch(loginFailed(error.message)));
  };
};
