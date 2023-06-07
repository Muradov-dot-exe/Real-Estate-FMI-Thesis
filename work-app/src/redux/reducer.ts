import * as types from "./actionType";

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.REGISTER_START:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
