import backURL from "@/config/config";
import { all, fork } from "redux-saga/effects";
import axios from "axios";
//
import pictureSaga from "./picture";
import userSaga from "./user";
import dashboardSaga from "./dashboard";
import bannerSaga from "./banner";
import noticeSaga from "./notice";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = false;

export default function* rootSaga() {
  yield all([
    fork(pictureSaga),
    fork(userSaga),
    fork(dashboardSaga),
    fork(bannerSaga),
    fork(noticeSaga),
  ]);
}
