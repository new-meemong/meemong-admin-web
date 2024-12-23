import produce from "../util/produce";

export const initialState = {
  userCount: null,
  //
  st_userCountLoading: false,
  st_userCountDone: false,
  st_userCountError: null,
  //
};

export const USER_COUNT_REQUEST = "USER_COUNT_REQUEST";
export const USER_COUNT_SUCCESS = "USER_COUNT_SUCCESS";
export const USER_COUNT_FAILURE = "USER_COUNT_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_COUNT_REQUEST:
        draft.st_userCountLoading = true;
        draft.st_userCountDone = false;
        draft.st_userCountError = null;
        break;

      case USER_COUNT_SUCCESS:
        draft.st_userCountLoading = false;
        draft.st_userCountDone = true;
        draft.st_userCountError = null;
        draft.userCount = action.data;
        break;

      case USER_COUNT_FAILURE:
        draft.st_userCountLoading = false;
        draft.st_userCountDone = false;
        draft.st_userCountError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
