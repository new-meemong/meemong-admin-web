import produce from "../util/produce";

export const initialState = {
  users: null,
  userDetail: null,
  totalUsers: 0,
  //
  st_userListLoading: false,
  st_userListDone: false,
  st_userListError: null,
  //
  st_userFindLoading: false,
  st_userFindDone: false,
  st_userFindError: null,
  //
  st_userDetailLoading: false,
  st_userDetailDone: false,
  st_userDetailError: null,
  //
  st_userBlockLoading: false,
  st_userBlockDone: false,
  st_userBlockError: null,
  //
  st_userUnBlockLoading: false,
  st_userUnBlockDone: false,
  st_userUnBlockError: null,
  //
  st_userCreateLoading: false,
  st_userCreateDone: false,
  st_userCreateError: null,
  //
  st_userDeleteLoading: false,
  st_userDeleteDone: false,
  st_userDeleteError: null,
  //
  st_userUpdateLoading: false,
  st_userUpdateDone: false,
  st_userUpdateError: null,
  //
  st_userPaymodelYLoading: false,
  st_userPaymodelYDone: false,
  st_userPaymodelYError: null,
  //
  st_userPaymodelNLoading: false,
  st_userPaymodelNDone: false,
  st_userPaymodelNError: null,
};

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILURE = "USER_LIST_FAILURE";

export const USER_FIND_REQUEST = "USER_FIND_REQUEST";
export const USER_FIND_SUCCESS = "USER_FIND_SUCCESS";
export const USER_FIND_FAILURE = "USER_FIND_FAILURE";

export const USER_DETAIL_REQUEST = "USER_DETAIL_REQUEST";
export const USER_DETAIL_SUCCESS = "USER_DETAIL_SUCCESS";
export const USER_DETAIL_FAILURE = "USER_DETAIL_FAILURE";

export const USER_BLOCK_REQUEST = "USER_BLOCK_REQUEST";
export const USER_BLOCK_SUCCESS = "USER_BLOCK_SUCCESS";
export const USER_BLOCK_FAILURE = "USER_BLOCK_FAILURE";

export const USER_UNBLOCK_REQUEST = "USER_UNBLOCK_REQUEST";
export const USER_UNBLOCK_SUCCESS = "USER_UNBLOCK_SUCCESS";
export const USER_UNBLOCK_FAILURE = "USER_UNBLOCK_FAILURE";

export const USER_CREATE_REQUEST = "USER_CREATE_REQUEST";
export const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS";
export const USER_CREATE_FAILURE = "USER_CREATE_FAILURE";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";

export const USER_PAYMODELY_REQUEST = "USER_PAYMODELY_REQUEST";
export const USER_PAYMODELY_SUCCESS = "USER_PAYMODELY_SUCCESS";
export const USER_PAYMODELY_FAILURE = "USER_PAYMODELY_FAILURE";

export const USER_PAYMODELN_REQUEST = "USER_PAYMODELN_REQUEST";
export const USER_PAYMODELN_SUCCESS = "USER_PAYMODELN_SUCCESS";
export const USER_PAYMODELN_FAILURE = "USER_PAYMODELN_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        draft.st_userListLoading = true;
        draft.st_userListDone = false;
        draft.st_userListError = null;
        break;

      case USER_LIST_SUCCESS:
        draft.st_userListLoading = false;
        draft.st_userListDone = true;
        draft.st_userListError = null;
        draft.users = action.data.members;
        draft.totalUsers = action.data.totalUsers;
        break;

      case USER_LIST_FAILURE:
        draft.st_userListLoading = false;
        draft.st_userListDone = false;
        draft.st_userListError = action.error;
        break;

      //////////////////////////////////////
      case USER_FIND_REQUEST:
        draft.st_userFindLoading = true;
        draft.st_userFindDone = false;
        draft.st_userFindError = null;
        break;

      case USER_FIND_SUCCESS:
        draft.st_userFindLoading = false;
        draft.st_userFindDone = true;
        draft.st_userFindError = null;
        draft.users = action.data.member;
        break;

      case USER_FIND_FAILURE:
        draft.st_userFindLoading = false;
        draft.st_userFindDone = false;
        draft.st_userFindError = action.error;
        break;

      //////////////////////////////////////
      case USER_DETAIL_REQUEST:
        draft.st_userDetailLoading = true;
        draft.st_userDetailDone = false;
        draft.st_userDetailError = null;
        break;

      case USER_DETAIL_SUCCESS:
        draft.st_userDetailLoading = false;
        draft.st_userDetailDone = true;
        draft.st_userDetailError = null;
        draft.userDetail = action.data.member;
        break;

      case USER_DETAIL_FAILURE:
        draft.st_userDetailLoading = false;
        draft.st_userDetailDone = false;
        draft.st_userDetailError = action.error;
        break;

      //////////////////////////////////////
      case USER_BLOCK_REQUEST:
        draft.st_userBlockLoading = true;
        draft.st_userBlockDone = false;
        draft.st_userBlockError = null;
        break;

      case USER_BLOCK_SUCCESS:
        draft.st_userBlockLoading = false;
        draft.st_userBlockDone = true;
        draft.st_userBlockError = null;
        break;

      case USER_BLOCK_FAILURE:
        draft.st_userBlockLoading = false;
        draft.st_userBlockDone = false;
        draft.st_userBlockError = action.error;
        break;

      //////////////////////////////////////
      case USER_UNBLOCK_REQUEST:
        draft.st_userUnBlockLoading = true;
        draft.st_userUnBlockDone = false;
        draft.st_userUnBlockError = null;
        break;

      case USER_UNBLOCK_SUCCESS:
        draft.st_userUnBlockLoading = false;
        draft.st_userUnBlockDone = true;
        draft.st_userUnBlockError = null;
        break;

      case USER_UNBLOCK_FAILURE:
        draft.st_userUnBlockLoading = false;
        draft.st_userUnBlockDone = false;
        draft.st_userUnBlockError = action.error;
        break;

      //////////////////////////////////////
      case USER_CREATE_REQUEST:
        draft.st_userCreateLoading = true;
        draft.st_userCreateDone = false;
        draft.st_userCreateError = null;
        break;

      case USER_CREATE_SUCCESS:
        draft.st_userCreateLoading = false;
        draft.st_userCreateDone = true;
        draft.st_userCreateError = null;
        break;

      case USER_CREATE_FAILURE:
        draft.st_userCreateLoading = false;
        draft.st_userCreateDone = false;
        draft.st_userCreateError = action.error;
        break;

      //////////////////////////////////////

      case USER_DELETE_REQUEST:
        draft.st_userDeleteLoading = true;
        draft.st_userDeleteDone = false;
        draft.st_userDeleteError = null;
        break;

      case USER_DELETE_SUCCESS:
        draft.st_userDeleteLoading = false;
        draft.st_userDeleteDone = true;
        draft.st_userDeleteError = null;
        break;

      case USER_DELETE_FAILURE:
        draft.st_userDeleteLoading = false;
        draft.st_userDeleteDone = false;
        draft.st_userDeleteError = action.error;
        break;

      //////////////////////////////////////////////

      case USER_UPDATE_REQUEST:
        draft.st_userUpdateLoading = true;
        draft.st_userUpdateDone = false;
        draft.st_userUpdateError = null;
        break;

      case USER_UPDATE_SUCCESS:
        draft.st_userUpdateLoading = false;
        draft.st_userUpdateDone = true;
        draft.st_userUpdateError = null;
        break;

      case USER_UPDATE_FAILURE:
        draft.st_userUpdateLoading = false;
        draft.st_userUpdateDone = false;
        draft.st_userUpdateError = action.error;
        break;

      //////////////////////////////////////////////

      case USER_PAYMODELY_REQUEST:
        draft.st_userPaymodelYLoading = true;
        draft.st_userPaymodelYDone = false;
        draft.st_userPaymodelYError = null;
        break;

      case USER_PAYMODELY_SUCCESS:
        draft.st_userPaymodelYLoading = false;
        draft.st_userPaymodelYDone = true;
        draft.st_userPaymodelYError = null;
        break;

      case USER_PAYMODELY_FAILURE:
        draft.st_userPaymodelYLoading = false;
        draft.st_userPaymodelYDone = false;
        draft.st_userPaymodelYError = action.error;
        break;

      //////////////////////////////////////////////

      case USER_PAYMODELN_REQUEST:
        draft.st_userPaymodelNLoading = true;
        draft.st_userPaymodelNDone = false;
        draft.st_userPaymodelNError = null;
        break;

      case USER_PAYMODELN_SUCCESS:
        draft.st_userPaymodelNLoading = false;
        draft.st_userPaymodelNDone = true;
        draft.st_userPaymodelNError = null;
        break;

      case USER_PAYMODELN_FAILURE:
        draft.st_userPaymodelNLoading = false;
        draft.st_userPaymodelNDone = false;
        draft.st_userPaymodelNError = action.error;
        break;

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
