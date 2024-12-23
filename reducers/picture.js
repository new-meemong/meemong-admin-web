import produce from "../util/produce";

export const initialState = {
  pictures: null,
  totalFiles: 0,
  //
  st_pictureListLoading: false,
  st_pictureListDone: false,
  st_pictureListError: null,
  //
  st_pictureCreateLoading: false,
  st_pictureCreateDone: false,
  st_pictureCreateError: null,
  //
  st_pictureDeleteLoading: false,
  st_pictureDeleteDone: false,
  st_pictureDeleteError: null,
  //
  st_pictureUpdateLoading: false,
  st_pictureUpdateDone: false,
  st_pictureUpdateError: null,
};

export const PICTURE_LIST_REQUEST = "PICTURE_LIST_REQUEST";
export const PICTURE_LIST_SUCCESS = "PICTURE_LIST_SUCCESS";
export const PICTURE_LIST_FAILURE = "PICTURE_LIST_FAILURE";

export const PICTURE_CREATE_REQUEST = "PICTURE_CREATE_REQUEST";
export const PICTURE_CREATE_SUCCESS = "PICTURE_CREATE_SUCCESS";
export const PICTURE_CREATE_FAILURE = "PICTURE_CREATE_FAILURE";

export const PICTURE_DELETE_REQUEST = "PICTURE_DELETE_REQUEST";
export const PICTURE_DELETE_SUCCESS = "PICTURE_DELETE_SUCCESS";
export const PICTURE_DELETE_FAILURE = "PICTURE_DELETE_FAILURE";

export const PICTURE_UPDATE_REQUEST = "PICTURE_UPDATE_REQUEST";
export const PICTURE_UPDATE_SUCCESS = "PICTURE_UPDATE_SUCCESS";
export const PICTURE_UPDATE_FAILURE = "PICTURE_UPDATE_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PICTURE_LIST_REQUEST:
        draft.st_pictureListLoading = true;
        draft.st_pictureListDone = false;
        draft.st_pictureListError = null;
        break;

      case PICTURE_LIST_SUCCESS:
        draft.st_pictureListLoading = false;
        draft.st_pictureListDone = true;
        draft.st_pictureListError = null;
        draft.pictures = action.data.files;
        draft.totalFiles = action.data.totalFiles;
        break;

      case PICTURE_LIST_FAILURE:
        draft.st_pictureListLoading = false;
        draft.st_pictureListDone = false;
        draft.st_pictureListError = action.error;
        break;

      //////////////////////////////////////
      case PICTURE_CREATE_REQUEST:
        draft.st_pictureCreateLoading = true;
        draft.st_pictureCreateDone = false;
        draft.st_pictureCreateError = null;
        break;

      case PICTURE_CREATE_SUCCESS:
        draft.st_pictureCreateLoading = false;
        draft.st_pictureCreateDone = true;
        draft.st_pictureCreateError = null;
        break;

      case PICTURE_CREATE_FAILURE:
        draft.st_pictureCreateLoading = false;
        draft.st_pictureCreateDone = false;
        draft.st_pictureCreateError = action.error;
        break;

      //////////////////////////////////////

      case PICTURE_DELETE_REQUEST:
        draft.st_pictureDeleteLoading = true;
        draft.st_pictureDeleteDone = false;
        draft.st_pictureDeleteError = null;
        break;

      case PICTURE_DELETE_SUCCESS:
        draft.st_pictureDeleteLoading = false;
        draft.st_pictureDeleteDone = true;
        draft.st_pictureDeleteError = null;
        break;

      case PICTURE_DELETE_FAILURE:
        draft.st_pictureDeleteLoading = false;
        draft.st_pictureDeleteDone = false;
        draft.st_pictureDeleteError = action.error;
        break;

      //////////////////////////////////////////////

      case PICTURE_UPDATE_REQUEST:
        draft.st_pictureUpdateLoading = true;
        draft.st_pictureUpdateDone = false;
        draft.st_pictureUpdateError = null;
        break;

      case PICTURE_UPDATE_SUCCESS:
        draft.st_pictureUpdateLoading = false;
        draft.st_pictureUpdateDone = true;
        draft.st_pictureUpdateError = null;
        break;

      case PICTURE_UPDATE_FAILURE:
        draft.st_pictureUpdateLoading = false;
        draft.st_pictureUpdateDone = false;
        draft.st_pictureUpdateError = action.error;
        break;

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
