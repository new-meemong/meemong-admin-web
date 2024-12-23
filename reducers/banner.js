import produce from "../util/produce";

export const initialState = {
  banners: null,
  totalUsers: 0,
  image: null,
  //
  st_bannerListLoading: false,
  st_bannerListDone: false,
  st_bannerListError: null,
  //
  st_bannerCreateLoading: false,
  st_bannerCreateDone: false,
  st_bannerCreateError: null,
  //
  st_bannerUpdateLoading: false,
  st_bannerUpdateDone: false,
  st_bannerUpdateError: null,
  //
  st_bannerDeleteLoading: false,
  st_bannerDeleteDone: false,
  st_bannerDeleteError: null,
  //
  st_imageAddLoading: false,
  st_imageAddDone: false,
  st_imageAddError: null,
  //
  st_imageDeleteLoading: false,
  st_imageDeleteDone: false,
  st_imageDeleteError: null,
  //
};

export const BANNER_LIST_REQUEST = "BANNER_LIST_REQUEST";
export const BANNER_LIST_SUCCESS = "BANNER_LIST_SUCCESS";
export const BANNER_LIST_FAILURE = "BANNER_LIST_FAILURE";

export const BANNER_CREATE_REQUEST = "BANNER_CREATE_REQUEST";
export const BANNER_CREATE_SUCCESS = "BANNER_CREATE_SUCCESS";
export const BANNER_CREATE_FAILURE = "BANNER_CREATE_FAILURE";

export const BANNER_UPDATE_REQUEST = "BANNER_UPDATE_REQUEST";
export const BANNER_UPDATE_SUCCESS = "BANNER_UPDATE_SUCCESS";
export const BANNER_UPDATE_FAILURE = "BANNER_UPDATE_FAILURE";

export const BANNER_DELETE_REQUEST = "BANNER_DELETE_REQUEST";
export const BANNER_DELETE_SUCCESS = "BANNER_DELETE_SUCCESS";
export const BANNER_DELETE_FAILURE = "BANNER_DELETE_FAILURE";

export const IMAGE_ADD_REQUEST = "IMAGE_ADD_REQUEST";
export const IMAGE_ADD_SUCCESS = "IMAGE_ADD_SUCCESS";
export const IMAGE_ADD_FAILURE = "IMAGE_ADD_FAILURE";

export const IMAGE_DELETE_REQUEST = "IMAGE_DELETE_REQUEST";
export const IMAGE_DELETE_SUCCESS = "IMAGE_DELETE_SUCCESS";
export const IMAGE_DELETE_FAILURE = "IMAGE_DELETE_FAILURE";

export const IMAGE_RESET = "IMAGE_RESET";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BANNER_LIST_REQUEST:
        draft.st_bannerListLoading = true;
        draft.st_bannerListDone = false;
        draft.st_bannerListError = null;
        break;

      case BANNER_LIST_SUCCESS:
        draft.st_bannerListLoading = false;
        draft.st_bannerListDone = true;
        draft.st_bannerListError = null;
        draft.banners = action.data;
        break;

      case BANNER_LIST_FAILURE:
        draft.st_bannerListLoading = false;
        draft.st_bannerListDone = false;
        draft.st_bannerListError = action.error;
        break;

      //////////////////////////////////////
      case BANNER_CREATE_REQUEST:
        draft.st_bannerCreateLoading = true;
        draft.st_bannerCreateDone = false;
        draft.st_bannerCreateError = null;
        break;

      case BANNER_CREATE_SUCCESS:
        draft.st_bannerCreateLoading = false;
        draft.st_bannerCreateDone = true;
        draft.st_bannerCreateError = null;
        break;

      case BANNER_CREATE_FAILURE:
        draft.st_bannerCreateLoading = false;
        draft.st_bannerCreateDone = false;
        draft.st_bannerCreateError = action.error;
        break;

      //////////////////////////////////////
      case BANNER_UPDATE_REQUEST:
        draft.st_bannerUpdateLoading = true;
        draft.st_bannerUpdateDone = false;
        draft.st_bannerUpdateError = null;
        break;

      case BANNER_UPDATE_SUCCESS:
        draft.st_bannerUpdateLoading = false;
        draft.st_bannerUpdateDone = true;
        draft.st_bannerUpdateError = null;
        break;

      case BANNER_UPDATE_FAILURE:
        draft.st_bannerUpdateLoading = false;
        draft.st_bannerUpdateDone = false;
        draft.st_bannerUpdateError = action.error;
        break;

      //////////////////////////////////////
      case BANNER_DELETE_REQUEST:
        draft.st_bannerDeleteLoading = true;
        draft.st_bannerDeleteDone = false;
        draft.st_bannerDeleteError = null;
        break;

      case BANNER_DELETE_SUCCESS:
        draft.st_bannerDeleteLoading = false;
        draft.st_bannerDeleteDone = true;
        draft.st_bannerDeleteError = null;
        break;

      case BANNER_DELETE_FAILURE:
        draft.st_bannerDeleteLoading = false;
        draft.st_bannerDeleteDone = false;
        draft.st_bannerDeleteError = action.error;
        break;

      //////////////////////////////////////
      case IMAGE_ADD_REQUEST:
        draft.st_imageAddLoading = true;
        draft.st_imageAddDone = false;
        draft.st_imageAddError = null;
        break;

      case IMAGE_ADD_SUCCESS:
        draft.st_imageAddLoading = false;
        draft.st_imageAddDone = true;
        draft.st_imageAddError = null;
        draft.image = action.data.imgUrl[0];
        break;

      case IMAGE_ADD_FAILURE:
        draft.st_imageAddLoading = false;
        draft.st_imageAddDone = false;
        draft.st_imageAddError = action.error;
        break;

      //////////////////////////////////////
      case IMAGE_DELETE_REQUEST:
        draft.st_imageDeleteLoading = true;
        draft.st_imageDeleteDone = false;
        draft.st_imageDeleteError = null;
        break;

      case IMAGE_DELETE_SUCCESS:
        draft.st_imageDeleteLoading = false;
        draft.st_imageDeleteDone = true;
        draft.st_imageDeleteError = null;
        break;

      case IMAGE_DELETE_FAILURE:
        draft.st_imageDeleteLoading = false;
        draft.st_imageDeleteDone = false;
        draft.st_imageDeleteError = action.error;
        break;

      //////////////////////////////////////
      case IMAGE_RESET:
        draft.st_imageDeleteLoading = false;
        draft.st_imageDeleteDone = false;
        draft.st_imageDeleteError = null;
        draft.image = null;
        break;

      //////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
