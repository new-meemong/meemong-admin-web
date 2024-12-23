import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import useInput from "@/hooks/useInput";
import {
  USER_BLOCK_REQUEST,
  USER_DETAIL_REQUEST,
  USER_LIST_REQUEST,
  USER_PAYMODELN_REQUEST,
  USER_PAYMODELY_REQUEST,
  USER_UNBLOCK_REQUEST,
} from "@/reducers/user";
import wrapper from "@/store/store";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Image,
  Input,
  message,
  Modal,
  Select,
  Slider,
  Switch,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

const { RangePicker } = DatePicker;

const User = () => {
  const [dataSource, setDataSource] = useState([]);

  const [dates, setDates] = useState([]);
  const [scoreModal, setScoreModal] = useState(false);
  const [score, setScore] = useState([4, 5]);
  const [scoreChange, setScoreChange] = useState([4, 5]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [unblockModal, setUnblockModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [noBlocUser, setNoBlocUser] = useState(true);
  const [isPayModel, setIsPayModel] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paymodelCheck, setPaymodelCheck] = useState(false);
  const [userType, setUserType] = useState(0);

  const nickname = useInput("");
  const phone = useInput("");

  const {
    users,
    totalUsers,
    userDetail,
    st_userDetailDone,
    st_userBlockDone,
    st_userUnBlockDone,
    st_userPaymodelYDone,
    st_userPaymodelNDone,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (users) {
      const sortedData = [...users].sort((a, b) => a.no - b.no);
      setDataSource(sortedData);
    } else {
      setDataSource([]);
    }
  }, [users]);

  useEffect(() => {
    if (st_userBlockDone) {
      dispatch({
        type: USER_LIST_REQUEST,
        data: {
          nickname: nickname.value,
          phone: phone.value,
          userType,
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          dateFrom:
            dates && dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
          dateTo: dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
        },
      });
      drawerOpenHandler(userDetail.userID);
      blockModalHandler(false);
    }
  }, [st_userBlockDone]);

  useEffect(() => {
    if (st_userUnBlockDone) {
      dispatch({
        type: USER_LIST_REQUEST,
        data: {
          nickname: nickname.value,
          phone: phone.value,
          userType,
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          dateFrom:
            dates && dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
          dateTo: dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
        },
      });

      drawerOpenHandler(userDetail.userID);
      unblockModalHandler(false);
    }
  }, [st_userUnBlockDone]);

  useEffect(() => {
    if (st_userPaymodelYDone) {
      message.success("성공적으로 변경되었습니다.");
      if (nickname.value || phone.value) {
        dispatch({
          type: USER_LIST_REQUEST,
          data: {
            nickname: nickname.value,
            phone: phone.value,
            userType,
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            dateFrom:
              dates && dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
            dateTo:
              dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
          },
        });
      } else {
        dispatch({
          type: USER_LIST_REQUEST,
          data: {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
          },
        });
      }
    }
  }, [st_userPaymodelYDone]);

  useEffect(() => {
    if (st_userPaymodelNDone) {
      message.success("성공적으로 변경되었습니다.");
      if (nickname.value !== "" || phone.value !== "") {
        dispatch({
          type: USER_LIST_REQUEST,
          data: {
            nickname: nickname.value,
            phone: phone.value,
            userType,
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            dateFrom:
              dates && dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
            dateTo:
              dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
          },
        });
      } else {
        dispatch({
          type: USER_LIST_REQUEST,
          data: {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
          },
        });
      }
      if (drawerOpen) {
        drawerOpenHandler(userDetail.userID);
      }
    }
  }, [st_userPaymodelNDone]);

  useEffect(() => {
    if (userDetail) {
      console.log(userDetail);
    }
  }, [userDetail]);
  useEffect(() => {
    if (users) {
      console.log(users);
    }
  }, [users]);

  //////* HANDLER //////

  const noBlocUserHandler = useCallback(
    (e) => {
      setNoBlocUser(e.target.checked);
    },
    [noBlocUser]
  );

  const isPayModelHandler = useCallback(
    (e) => {
      setIsPayModel(e.target.checked);
    },
    [isPayModel]
  );

  const dateHandler = useCallback(
    (selectedDates) => {
      if (selectedDates) {
        const [start, end] = selectedDates;
        setDates([start, end]);
      } else {
        setDates([null, null]);
      }
    },
    [dates]
  );

  const scoreModalHandler = useCallback(
    (value) => {
      setScoreModal(value);
    },
    [scoreModal]
  );

  const blockModalHandler = useCallback(
    (value) => {
      setBlockModal(value);
    },
    [blockModal]
  );
  const unblockModalHandler = useCallback(
    (value) => {
      setUnblockModal(value);
    },
    [unblockModal]
  );

  const paymentModalHandler = useCallback(
    (value) => {
      setPaymentModal(value);
    },
    [paymentModal]
  );

  const scoreChangeHalder = useCallback(
    (e) => {
      setScoreChange(e);
    },
    [scoreChange]
  );

  const scoreClickHandler = useCallback(() => {
    setScore(scoreChange);
    scoreModalHandler(false);
  }, [score, scoreChange]);

  const drawerOpenHandler = useCallback(
    (userId) => {
      if (userId !== null) {
        dispatch({
          type: USER_DETAIL_REQUEST,
          data: {
            userId,
          },
        });

        setDrawerOpen(true);
      } else {
        setDrawerOpen(false);
      }
    },
    [drawerOpen]
  );

  const showBlockConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 이 유저를 차단하시겠습니까?",
      okText: "차단",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        if (userDetail)
          dispatch({
            type: USER_BLOCK_REQUEST,
            data: {
              userId: userDetail.userID,
            },
          });
      },
    });
  };
  const showUnblockConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "이 유저를 차단 해제하시겠습니까?",
      okText: "차단 해제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        if (userDetail)
          dispatch({
            type: USER_UNBLOCK_REQUEST,
            data: {
              userId: userDetail.userID,
            },
          });
      },
    });
  };

  const paginationHandler = useCallback(
    (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize);
      dispatch({
        type: USER_LIST_REQUEST,
        data: {
          nickname: nickname.value,
          phone: phone.value,
          userType,
          limit: pageSize,
          offset: (page - 1) * pageSize,
          dateFrom:
            dates && dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
          dateTo: dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
        },
      });
    },
    [currentPage, pageSize, nickname.value, phone.value, userType, dates]
  );

  const convertDateFormat = (dateString) => {
    // 날짜 문자열을 Date 객체로 변환합니다.
    const dateObj = new Date(dateString);

    // Date 객체를 "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 변환합니다.
    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const hours = ("0" + dateObj.getHours()).slice(-2);
    const minutes = ("0" + dateObj.getMinutes()).slice(-2);
    const seconds = ("0" + dateObj.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const searchHandler = useCallback(() => {
    setCurrentPage(1);
    setPageSize(10);

    dispatch({
      type: USER_LIST_REQUEST,
      data: {
        nickname: nickname.value,
        phone: phone.value,
        userType,
        limit: 10,
        offset: 0,
        dateFrom: dates && dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : "",
        dateTo: dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : "",
      },
    });
  }, [nickname.value, phone.value, userType, dates]);

  const allSearchHandler = useCallback(() => {
    setCurrentPage(1);
    setPageSize(10);
    nickname.setValue("");
    phone.setValue("");
    setUserType(0);
    setDates([]);
    dispatch({
      type: USER_LIST_REQUEST,
      data: {
        offset: 0,
        limit: 10,
        dateFrom: "",
        dateTo: "",
      },
    });
  }, []);

  const handleSwitchChange = useCallback((checked, userid) => {
    if (checked) {
      dispatch({
        type: USER_PAYMODELY_REQUEST,
        data: {
          userid,
        },
      });
    } else {
      dispatch({
        type: USER_PAYMODELN_REQUEST,
        data: {
          userid,
        },
      });
    }
  }, []);

  const selectHandler = useCallback(
    (e) => {
      setUserType(e);
    },
    [userType]
  );

  //////* DATAVIEW //////

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "프로필",
      align: "center",
      render: (data) => {
        return (
          <Image
            src={data.profilePicture}
            alt={data.nickname}
            width={`50px`}
            height={`50px`}
          />
        );
      },
    },
    {
      title: "닉네임",

      render: (data) => {
        return (
          <Button
            style={{
              paddingLeft: "0",
              paddingRight: "0",
            }}
            type="link"
            onClick={() => {
              setPaymodelCheck(data.paidModel === "Y");
              drawerOpenHandler(data.userID);
            }}
          >
            {data.nickname}
          </Button>
        );
      },
    },
    {
      title: "업체명",
      dataIndex: "companyName",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "모델등급",
      dataIndex: "modelRating",
    },
    {
      title: "가입형태",
      dataIndex: "subscriptionType",
    },
    {
      title: "구독",
      dataIndex: "subscribe",
    },
    {
      title: "보유 몽",
      dataIndex: "amount",
    },
    {
      title: "가입일",
      dataIndex: "registrationDate",
      render: (data) => {
        const date = data.slice(0, 10);
        return <Text>{date}</Text>;
      },
    },
    {
      title: "최근로그인",
      dataIndex: "lastLogin",
      render: (data) => {
        const date = data.slice(0, 10);
        return <Text>{date}</Text>;
      },
    },
    {
      title: "페이모델",
      align: "center",
      render: (data) => {
        if (data.type === "Model") {
          return (
            <Switch
              checked={data.paidModel === "Y"}
              onChange={(checked) => handleSwitchChange(checked, data.userID)}
            />
          );
        } else {
          return <></>;
        }
      },
    },
    {
      title: "탈퇴여부",
      dataIndex: "withdrawalStatus",
      align: "center",
    },
    {
      title: "차단여부",
      dataIndex: "blockStatus",
      align: "center",
    },
    {
      title: "활동여부",
      dataIndex: "activityStatus",
      align: "center",
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Text fontSize="25px" fontWeight="bold">
            회원 관리
          </Text>
          <Wrapper dr="row" ju="start" margin="50px 0 0 0" al="end">
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">유저 타입</Text>
              <Select
                value={userType}
                style={{ width: 130, margin: "5px 0 0 0" }}
                onChange={selectHandler}
              >
                <Select.Option value={0}>전체</Select.Option>
                <Select.Option value={1}>모델</Select.Option>
                <Select.Option value={2}>디자이너</Select.Option>
              </Select>
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">결제 이력 유무</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">닉네임</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="닉네임 입력"
                {...nickname}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">핸드폰 번호</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="01012345678"
                {...phone}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">기간 설정</Text>
              <RangePicker
                style={{ width: 240, margin: "5px 0 0 0" }}
                placeholder={["시작일", "종료일"]}
                onChange={dateHandler}
                value={dates}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">별점 설정</Text>

              <Button
                style={{
                  width: 130,
                  margin: "5px 0 0 0",
                  paddingLeft: "0px",
                  textAlign: "left",
                  paddingLeft: "10px",
                }}
                onClick={() => scoreModalHandler(true)}
              >
                {`${score[0]}.0 ~ ${score[1]}.0`}
              </Button>
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">지역</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="지역 입력"
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Button
                type="primary"
                style={{ width: "90px", margin: "5px 0 0" }}
                onClick={searchHandler}
              >
                검색
              </Button>
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Button
                onClick={allSearchHandler}
                style={{ width: "90px", margin: "5px 0 0" }}
              >
                초기화
              </Button>
            </Wrapper>
          </Wrapper>
          <Wrapper dr="row" ju="start" margin="5px 0 0">
            <Checkbox
              checked={noBlocUser}
              onChange={noBlocUserHandler}
              style={{ margin: "0 10px 0 0" }}
            >
              탈퇴하지 않은 회원만 보기
            </Checkbox>
            <Checkbox checked={isPayModel} onChange={isPayModelHandler}>
              페이 모델만 보기
            </Checkbox>
          </Wrapper>
          <Wrapper
            height="1px"
            bgColor={Theme.grey2_C}
            margin="20px 0"
          ></Wrapper>
          <Wrapper dr="row" ju="space-between">
            <Wrapper dr="row" width="auto">
              <Text fontWeight="bold">회원 리스트</Text>
              <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                1 개
              </Text>
            </Wrapper>
            <Button type="primary" style={{ width: "150px" }}>
              엑셀로 다운로드
            </Button>
          </Wrapper>
          <CenteredPaginationTable
            rowKey="userID"
            columns={columns}
            dataSource={dataSource ? dataSource : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalUsers,
              onChange: paginationHandler,
            }}
          />

          {/* 별점 구간 선택 모달 */}
          <Modal
            open={scoreModal}
            onCancel={() => scoreModalHandler(false)}
            footer={null}
            width={`400px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                구간 선택
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">별점 구간 설정</Text>
              </Wrapper>
              <Slider
                marks={{ 1: "1", 2: "2", 3: "3", 4: "4", 5: "5" }}
                min={1}
                max={5}
                defaultValue={scoreChange}
                step={1}
                range
                style={{ width: "85%" }}
                onChange={scoreChangeHalder}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={scoreClickHandler}
                size="large"
              >
                저장
              </Button>
            </Wrapper>
          </Modal>

          {/* 유저 차단 모달 */}
          <Modal
            open={blockModal}
            onCancel={() => blockModalHandler(false)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                유저 차단
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">차단 유형</Text>
              </Wrapper>
              <Select
                defaultValue={`노출 차단`}
                options={[{ value: "노출 차단", label: "노출 차단" }]}
                style={{ width: "100%", marginTop: "0px" }}
              />
              <Button
                type="primary"
                danger
                style={{ width: "100%", marginTop: "20px" }}
                onClick={showBlockConfirm}
                size="large"
              >
                차단하기
              </Button>
            </Wrapper>
          </Modal>
          {/* 유저 차단해제 모달 */}
          <Modal
            open={unblockModal}
            onCancel={() => unblockModalHandler(false)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                유저 차단 해제
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">차단 유형</Text>
              </Wrapper>
              <Select
                defaultValue={`노출 차단 해제`}
                options={[{ value: "노출 차단 해제", label: "노출 차단 해제" }]}
                style={{ width: "100%", marginTop: "0px" }}
              />
              <Button
                type="primary"
                danger
                style={{ width: "100%", marginTop: "20px" }}
                onClick={showUnblockConfirm}
                size="large"
              >
                차단해제하기
              </Button>
            </Wrapper>
          </Modal>

          {/* 몽 지급 모달 */}
          <Modal
            open={paymentModal}
            onCancel={() => paymentModalHandler(false)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                몽 지급하기
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">지급할 몽</Text>
              </Wrapper>
              <Input
                placeholder="지급할 몽을 숫자만 입력해 주세요"
                style={{ width: "100%", marginTop: "0px" }}
                type="number"
              />

              <Wrapper al="start" margin="10px 0 10px">
                <Text fontWeight="bold">만료일</Text>
              </Wrapper>
              <Select
                defaultValue={`없음`}
                options={[{ value: "없음", label: "없음" }]}
                style={{ width: "100%", marginTop: "0px" }}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={() => {}}
                size="large"
              >
                몽 지급하기
              </Button>
            </Wrapper>
          </Modal>

          {/* 상세보기 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`회원 관리 > 상세`}</Text>
                <Wrapper width="auto" dr="row">
                  <Switch
                    style={{ marginRight: "10px" }}
                    checked={paymodelCheck}
                    checkedChildren="페이모델"
                    unCheckedChildren="모델"
                    onChange={(checked) => {
                      setPaymodelCheck(checked);
                      handleSwitchChange(checked, userDetail.userID);
                    }}
                  />
                  <Button
                    style={{ width: "100px" }}
                    type="primary"
                    onClick={() => paymentModalHandler(true)}
                  >
                    몽 지급하기
                  </Button>
                  <Button
                    style={{ marginLeft: "10px", width: "100px" }}
                    onClick={() => {
                      if (userDetail && userDetail.blockStatus === "Y") {
                        unblockModalHandler(true);
                      } else {
                        blockModalHandler(true);
                      }
                    }}
                  >
                    {userDetail && userDetail.blockStatus === "Y"
                      ? `차단 해제`
                      : `차단`}
                  </Button>
                </Wrapper>
              </Wrapper>
            }
            onClose={() => drawerOpenHandler(null)}
            open={drawerOpen}
            width={`1000px`}
          >
            <Wrapper dr="row" al="start">
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                기본 정보
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    회원번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {userDetail && userDetail.userID}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    유형
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {userDetail && userDetail.type}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    닉네임
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {userDetail && userDetail.nickname}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    이름
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    -
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    가입형태
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    -
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    가입일
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {userDetail &&
                      convertDateFormat(userDetail.registrationDate)}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    최근로그인
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {userDetail && convertDateFormat(userDetail.lastLogin)}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    탈퇴여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    -
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr="row" al="start">
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                프로필 정보
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    프로필 이미지
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    <Image
                      src={userDetail && userDetail.profilePicture}
                      alt="profile-image"
                      width={`100px`}
                      height={`100px`}
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    휴대폰 번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    -
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    이메일
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    -
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    소개글
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    -
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr="row" al="start">
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                사진 정보
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    사진
                  </Wrapper>
                  <Wrapper width="85%" dr="row" ju="start">
                    {userDetail && userDetail.userPhotos
                      ? userDetail.userPhotos.map((data, index) => (
                          <Wrapper
                            key={index}
                            width="auto"
                            margin="0 10px 10px 0"
                          >
                            <Image
                              src={data.s3path}
                              alt="profile-image"
                              width={`100px`}
                              height={`100px`}
                              key={data.id}
                            />
                            <Text>{data.filetype}</Text>
                          </Wrapper>
                        ))
                      : "-"}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr="row" al="start">
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                결제 기록
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    현재 구독 여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    Y
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    현재 구독 상품
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    Basic Plan
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    이전 구독 여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    Basic Plan (2022.11.11)
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr="row" al="start">
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                포인트 이력
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    보유 몽
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    1,130 몽
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                  margin="0 0 20px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    몽 히스토리
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    <Wrapper
                      dr="row"
                      borderBottom={`1px solid ${Theme.grey5_C}`}
                      padding="0 0 10px 0"
                      margin="0 0 10px 0"
                    >
                      <Wrapper
                        width="calc(100% / 3)"
                        al="start"
                        fontWeight="bold"
                      >
                        몽
                      </Wrapper>
                      <Wrapper
                        width="calc(100% / 3)"
                        al="start"
                        fontWeight="bold"
                      >
                        사용처
                      </Wrapper>
                      <Wrapper
                        width="calc(100% / 3)"
                        al="start"
                        fontWeight="bold"
                      >
                        일시
                      </Wrapper>
                    </Wrapper>
                    <Wrapper dr="row" margin="0 0 10px 0">
                      <Wrapper
                        width="calc(100% / 3)"
                        al="start"
                        color={Theme.red_C}
                      >
                        -10 몽
                      </Wrapper>
                      <Wrapper width="calc(100% / 3)" al="start">
                        급구게시판
                      </Wrapper>
                      <Wrapper width="calc(100% / 3)" al="start">
                        2023-12-19 17:23:34
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Drawer>
        </Wrapper>
      }
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch({
      type: USER_LIST_REQUEST,
      data: {
        offset: 0,
        limit: 10,
        dateFrom: "",
        dateTo: "",
      },
    });

    store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await store.sagaTask.toPromise();
  }
);

export default User;
