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

export const registerInitiate = (
  email: string,
  password: string,
  displayName: string
) => {
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
