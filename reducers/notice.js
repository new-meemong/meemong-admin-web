import produce from "../util/produce";

export const initialState = {
  notices: null,
  totalNotice: 0,
  noticePre: null,
  totalNoticePre: 0,
  //
  st_noticeListLoading: false,
  st_noticeListDone: false,
  st_noticeListError: null,
  //
  st_noticePreListLoading: false,
  st_noticePreListDone: false,
  st_noticePreListError: null,
  //
  st_noticePreToggleLoading: false,
  st_noticePreToggleDone: false,
  st_noticePreToggleError: null,
  //
  st_noticeUpdateLoading: false,
  st_noticeUpdateDone: false,
  st_noticeUpdateError: null,
};

export const NOTICE_LIST_REQUEST = "NOTICE_LIST_REQUEST";
export const NOTICE_LIST_SUCCESS = "NOTICE_LIST_SUCCESS";
export const NOTICE_LIST_FAILURE = "NOTICE_LIST_FAILURE";

export const NOTICE_PRE_LIST_REQUEST = "NOTICE_PRE_LIST_REQUEST";
export const NOTICE_PRE_LIST_SUCCESS = "NOTICE_PRE_LIST_SUCCESS";
export const NOTICE_PRE_LIST_FAILURE = "NOTICE_PRE_LIST_FAILURE";

export const NOTICE_PRE_TOGGLE_REQUEST = "NOTICE_PRE_TOGGLE_REQUEST";
export const NOTICE_PRE_TOGGLE_SUCCESS = "NOTICE_PRE_TOGGLE_SUCCESS";
export const NOTICE_PRE_TOGGLE_FAILURE = "NOTICE_PRE_TOGGLE_FAILURE";

export const NOTICE_UPDATE_REQUEST = "NOTICE_UPDATE_REQUEST";
export const NOTICE_UPDATE_SUCCESS = "NOTICE_UPDATE_SUCCESS";
export const NOTICE_UPDATE_FAILURE = "NOTICE_UPDATE_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NOTICE_LIST_REQUEST:
        draft.st_noticeListLoading = true;
        draft.st_noticeListDone = false;
        draft.st_noticeListError = null;
        break;

      case NOTICE_LIST_SUCCESS:
        draft.st_noticeListLoading = false;
        draft.st_noticeListDone = true;
        draft.st_noticeListError = null;
        draft.notices = action.data.announcements;
        draft.totalNotice = action.data.totalCount;
        break;

      case NOTICE_LIST_FAILURE:
        draft.st_noticeListLoading = false;
        draft.st_noticeListDone = false;
        draft.st_noticeListError = action.error;
        break;

      //////////////////////////////////////
      case NOTICE_PRE_LIST_REQUEST:
        draft.st_noticePreListLoading = true;
        draft.st_noticePreListDone = false;
        draft.st_noticePreListError = null;
        break;

      case NOTICE_PRE_LIST_SUCCESS:
        draft.st_noticePreListLoading = false;
        draft.st_noticePreListDone = true;
        draft.st_noticePreListError = null;
        draft.noticePre = action.data.announcements;
        draft.totalNoticePre = action.data.totalCount;
        break;

      case NOTICE_PRE_LIST_FAILURE:
        draft.st_noticePreListLoading = false;
        draft.st_noticePreListDone = false;
        draft.st_noticePreListError = action.error;
        break;

      //////////////////////////////////////

      case NOTICE_PRE_TOGGLE_REQUEST:
        draft.st_noticePreToggleLoading = true;
        draft.st_noticePreToggleDone = false;
        draft.st_noticePreToggleError = null;
        break;

      case NOTICE_PRE_TOGGLE_SUCCESS:
        draft.st_noticePreToggleLoading = false;
        draft.st_noticePreToggleDone = true;
        draft.st_noticePreToggleError = null;
        break;

      case NOTICE_PRE_TOGGLE_FAILURE:
        draft.st_noticePreToggleLoading = false;
        draft.st_noticePreToggleDone = false;
        draft.st_noticePreToggleError = action.error;
        break;

      //////////////////////////////////////////////

      case NOTICE_UPDATE_REQUEST:
        draft.st_noticeUpdateLoading = true;
        draft.st_noticeUpdateDone = false;
        draft.st_noticeUpdateError = null;
        break;

      case NOTICE_UPDATE_SUCCESS:
        draft.st_noticeUpdateLoading = false;
        draft.st_noticeUpdateDone = true;
        draft.st_noticeUpdateError = null;
        break;

      case NOTICE_UPDATE_FAILURE:
        draft.st_noticeUpdateLoading = false;
        draft.st_noticeUpdateDone = false;
        draft.st_noticeUpdateError = action.error;
        break;

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
