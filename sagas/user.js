import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  USER_BLOCK_FAILURE,
  USER_BLOCK_REQUEST,
  USER_BLOCK_SUCCESS,
  USER_CREATE_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAIL_FAILURE,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_FIND_FAILURE,
  USER_FIND_REQUEST,
  USER_FIND_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_PAYMODELN_FAILURE,
  USER_PAYMODELN_REQUEST,
  USER_PAYMODELN_SUCCESS,
  USER_PAYMODELY_FAILURE,
  USER_PAYMODELY_REQUEST,
  USER_PAYMODELY_SUCCESS,
  USER_UNBLOCK_FAILURE,
  USER_UNBLOCK_REQUEST,
  USER_UNBLOCK_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "@/reducers/user";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userCreateAPI(data) {
  return await axios.post(`/api/user/create`, data);
}

function* userCreate(action) {
  try {
    const result = yield call(userCreateAPI, action.data);
    yield put({
      type: USER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListAPI(data) {
  const { limit, offset, userType, phone, nickname, dateFrom, dateTo } = data;

  const _userType = !userType || userType === 0 ? "" : userType;
  const _phone = phone ? phone : "";
  const _nickname = nickname ? nickname : "";

  console.log(dateFrom);

  return await axios.get(
    `/admin/getAllMember?limit=${limit}&offset=${offset}&userType=${_userType}&dateFrom=${dateFrom}&dateTo=${dateTo}&phone=${_phone}&nickname=${_nickname}`,
    {
      headers: {
        Authorization: "Bearer 222",
        "X-HEADER-SESSION": "234234234",
      },
    }
  );
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userFindAPI(data) {
  return await axios.post(`/admin/findMember`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* userFind(action) {
  try {
    const result = yield call(userFindAPI, action.data);
    yield put({
      type: USER_FIND_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userDetailAPI(data) {
  const { userId } = data;

  return await axios.get(`/admin/getMember?UserID=${userId}`, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* userDetail(action) {
  try {
    const result = yield call(userDetailAPI, action.data);
    yield put({
      type: USER_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userBlockAPI(data) {
  return await axios.post(`/auth/member/block`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* userBlock(action) {
  try {
    const result = yield call(userBlockAPI, action.data);
    yield put({
      type: USER_BLOCK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_BLOCK_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userUnBlockAPI(data) {
  return await axios.post(`/auth/member/unblock`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* userUnBlock(action) {
  try {
    const result = yield call(userUnBlockAPI, action.data);
    yield put({
      type: USER_UNBLOCK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_UNBLOCK_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userUpdateAPI(data) {
  return await axios.post(`/api/user/update`, data);
}

function* userUpdate(action) {
  try {
    const result = yield call(userUpdateAPI, action.data);
    yield put({
      type: USER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userDeleteAPI(data) {
  return await axios.post(`/api/user/delete`, data);
}

function* userDelete(action) {
  try {
    const result = yield call(userDeleteAPI, action.data);
    yield put({
      type: USER_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userPaymodelYAPI(data) {
  return await axios.post(
    `/admin/paymodel/payModelTurnOn/${data.userid}`,
    data,
    {
      headers: {
        Authorization: "Bearer 222",
        "X-HEADER-SESSION": "234234234",
      },
    }
  );
}

function* userPaymodelY(action) {
  try {
    const result = yield call(userPaymodelYAPI, action.data);
    yield put({
      type: USER_PAYMODELY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_PAYMODELY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userPaymodelNAPI(data) {
  return await axios.post(
    `/admin/paymodel/PayModelTurnOff/${data.userid}`,
    data,
    {
      headers: {
        Authorization: "Bearer 222",
        "X-HEADER-SESSION": "234234234",
      },
    }
  );
}

function* userPaymodelN(action) {
  try {
    const result = yield call(userPaymodelNAPI, action.data);
    yield put({
      type: USER_PAYMODELN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_PAYMODELN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchUserCreate() {
  yield takeLatest(USER_CREATE_REQUEST, userCreate);
}

function* watchUserList() {
  yield takeLatest(USER_LIST_REQUEST, userList);
}

function* watchUserFind() {
  yield takeLatest(USER_FIND_REQUEST, userFind);
}

function* watchUserDetail() {
  yield takeLatest(USER_DETAIL_REQUEST, userDetail);
}
function* watchUserBlock() {
  yield takeLatest(USER_BLOCK_REQUEST, userBlock);
}
function* watchUserUnBlock() {
  yield takeLatest(USER_UNBLOCK_REQUEST, userUnBlock);
}

function* watchUserUpdate() {
  yield takeLatest(USER_UPDATE_REQUEST, userUpdate);
}

function* watchUserDelete() {
  yield takeLatest(USER_DELETE_REQUEST, userDelete);
}

function* watchUserPaymodelY() {
  yield takeLatest(USER_PAYMODELY_REQUEST, userPaymodelY);
}

function* watchUserPaymodelN() {
  yield takeLatest(USER_PAYMODELN_REQUEST, userPaymodelN);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchUserCreate),
    fork(watchUserList),
    fork(watchUserFind),
    fork(watchUserDetail),
    fork(watchUserBlock),
    fork(watchUserUnBlock),
    fork(watchUserUpdate),
    fork(watchUserDelete),
    fork(watchUserPaymodelY),
    fork(watchUserPaymodelN),

    //
  ]);
}
