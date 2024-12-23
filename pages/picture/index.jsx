import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import useInput from "@/hooks/useInput";
import {
  PICTURE_DELETE_REQUEST,
  PICTURE_LIST_REQUEST,
} from "@/reducers/picture";
import {
  USER_BLOCK_REQUEST,
  USER_DETAIL_REQUEST,
  USER_PAYMODELN_REQUEST,
  USER_PAYMODELY_REQUEST,
  USER_UNBLOCK_REQUEST,
} from "@/reducers/user";
import wrapper from "@/store/store";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Switch,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  width: 100%;
  margin-top: 20px;
`;

const SquareImage = styled.div`
  padding-top: 100%;
  position: relative;
  width: 100%;
`;

const Images = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Picture = () => {
  //////* HOOK //////
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [checked, setChecked] = useState(false);
  const [emergencyDetailOpen, setEmergencyDetailOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detailData, setDetailData] = useState([]);
  const [paymodelCheck, setPaymodelCheck] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [unblockModal, setUnblockModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [userType, setUserType] = useState(0);

  const userId = useInput("");

  const router = useRouter();

  const { pictures, totalFiles, st_pictureDeleteDone, st_pictureDeleteError } =
    useSelector((state) => state.picture);
  const {
    userDetail,
    st_userDetailDone,
    st_userBlockDone,
    st_userUnBlockDone,
    st_userPaymodelYDone,
    st_userPaymodelNDone,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  //////* USEEFFECT //////
  useEffect(() => {
    console.log(pictures);
  }, []);

  useEffect(() => {
    if (st_userBlockDone) {
      drawerOpenHandler(userDetail.userID);
      blockModalHandler(false);
    }
  }, [st_userBlockDone]);

  useEffect(() => {
    if (st_userUnBlockDone) {
      drawerOpenHandler(userDetail.userID);
      unblockModalHandler(false);
    }
  }, [st_userUnBlockDone]);

  useEffect(() => {
    if (st_pictureDeleteDone) {
      message.success("삭제되었습니다.");
      dispatch({
        type: PICTURE_LIST_REQUEST,
        data: {
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          userId: userId.value,
        },
      });
    }
  }, [st_pictureDeleteDone]);

  useEffect(() => {
    if (userDetail) {
      setPaymodelCheck(userDetail.paidModel === "Y");
    }
  }, [st_userDetailDone]);

  //////* HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const updateModalHandler = useCallback(() => {
    setUpdateModal((prev) => !prev);
  }, [updateModal]);

  const emergencyDetailOpenHandler = useCallback(
    (data) => {
      setDetailData(data);
      setEmergencyDetailOpen((prev) => !prev);
    },
    [emergencyDetailOpen, detailData]
  );

  const paymentModalHandler = useCallback(
    (value) => {
      setPaymentModal(value);
    },
    [paymentModal]
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

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 이 사진을 삭제하시겠습니까?",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        dispatch({
          type: PICTURE_DELETE_REQUEST,
          data: {
            id,
          },
        });
      },
    });
  };

  const showDeleteConfirmModal = useCallback(() => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 이 사진을 삭제하시겠습니까?",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        dispatch({
          type: PICTURE_DELETE_REQUEST,
          data: {
            id: detailData.id,
          },
        });
      },
    });
  }, [detailData]);

  const paginationHandler = useCallback(
    (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize);
      dispatch({
        type: PICTURE_LIST_REQUEST,
        data: {
          limit: pageSize,
          offset: (page - 1) * pageSize,
          userId: userId.value,
          userType,
        },
      });
    },
    [currentPage, pageSize, userId.value, userType]
  );

  const checkBoxHandler = useCallback(
    (e) => {
      setChecked(e.target.checked);
    },
    [checked]
  );

  const searchHandler = useCallback(() => {
    setCurrentPage(1);
    console.log(userType);
    dispatch({
      type: PICTURE_LIST_REQUEST,
      data: {
        limit: pageSize,
        offset: 0,
        userId: userId.value,
        userType,
      },
    });
  }, [userId.value, currentPage, userType]);

  const allSearchHandler = useCallback(() => {
    setCurrentPage(1);
    userId.setValue("");
    setUserType(0);
    dispatch({
      type: PICTURE_LIST_REQUEST,
      data: {
        limit: pageSize,
        offset: 0,
      },
    });
  }, [userId.value, currentPage, userType]);

  const selectHandler = useCallback(
    (e) => {
      setUserType(e);
    },
    [userType]
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

  //////* DATAVIEW //////

  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "role",
      render: (data) => {
        return <Text>{data}</Text>;
      },
    },
    {
      title: "이미지",
      align: "center",
      render: (data) => {
        return (
          <Image
            src={data.s3path}
            alt={`image`}
            width={`50px`}
            height={`50px`}
          />
        );
      },
    },
    {
      title: "닉네임",
      render: (data) => {
        return <Text>-</Text>;
      },
    },
    {
      title: "업체명",
      render: (data) => {
        return <Text>-</Text>;
      },
    },
    {
      title: "이름",
      render: (data) => {
        return <Text>-</Text>;
      },
    },
    {
      title: "등록위치",
      dataIndex: "filetype",
    },

    {
      title: "이미지등록일",
      dataIndex: "createdtime",
    },
    {
      title: "상세보기",
      align: "center",
      render: (data) => {
        return (
          <Button onClick={() => emergencyDetailOpenHandler(data)}>
            상세보기
          </Button>
        );
      },
    },
    {
      title: "행동",
      align: "center",
      render: (data) => {
        return (
          <Wrapper width="auto" dr="row">
            <EditOutlined
              style={{
                margin: "0 10px 0 0",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={updateModalHandler}
            />
            <DeleteOutlined
              style={{
                margin: "0 0 0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => showDeleteConfirm(data.id)}
            />
          </Wrapper>
        );
      },
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Text fontSize="25px" fontWeight="bold">
            사진 관리
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
              <Text fontSize="12px">등록 위치</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">회원 번호</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="회원 번호 입력"
                {...userId}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">이름</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="이름 입력"
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">핸드폰 번호</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="01012345678"
                type="number"
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
            <Checkbox checked={checked} onChange={checkBoxHandler}>
              사진만 보기
            </Checkbox>
          </Wrapper>
          <Wrapper
            height="1px"
            bgColor={Theme.grey2_C}
            margin="20px 0"
          ></Wrapper>
          <Wrapper dr="row" ju="space-between">
            <Wrapper dr="row" width="auto">
              <Text fontWeight="bold">사진 리스트</Text>
              <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                1 개
              </Text>
            </Wrapper>
            <Button type="primary" style={{ width: "150px" }}>
              엑셀로 다운로드
            </Button>
          </Wrapper>
          {checked ? (
            <Wrapper>
              <ImageGrid>
                {pictures ? (
                  pictures.map((item) => (
                    <SquareImage key={item.id}>
                      <Images
                        onClick={() => emergencyDetailOpenHandler(item)}
                        src={item.s3path}
                        alt="image"
                      />
                    </SquareImage>
                  ))
                ) : (
                  <></>
                )}
              </ImageGrid>
              <Pagination
                current={currentPage}
                total={totalFiles}
                pageSize={pageSize}
                onChange={paginationHandler}
                size="small"
                style={{ marginTop: "16px" }}
              />
            </Wrapper>
          ) : (
            <CenteredPaginationTable
              rowKey="id"
              columns={columns}
              dataSource={pictures ? pictures : []}
              size="small"
              style={{ width: "100%", margin: "20px 0 0 0" }}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalFiles,
                onChange: paginationHandler,
              }}
            />
          )}

          {/* 사진 상세 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`사진 관리 > 사진 상세`}</Text>

                <Wrapper width="auto" dr="row">
                  <Button
                    style={{ width: "130px" }}
                    danger
                    onClick={updateModalHandler}
                  >
                    사진 수정
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: "10px", width: "130px" }}
                    onClick={showDeleteConfirmModal}
                    danger
                  >
                    사진 삭제
                  </Button>
                </Wrapper>
              </Wrapper>
            }
            onClose={emergencyDetailOpenHandler}
            open={emergencyDetailOpen}
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
                이미지 정보
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    이미지
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    <Image
                      src={detailData.s3path}
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
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    등록 위치
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {detailData.filetype}
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    등록일자
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {detailData.createdtime}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
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
                    회원 번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    <Button
                      type="link"
                      style={{ padding: "0" }}
                      onClick={() => {
                        drawerOpenHandler(detailData.userid);
                      }}
                    >
                      {detailData.userid}
                    </Button>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    유형
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {detailData.role}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    닉네임
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
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    업체명
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
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    가입일
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
                    최근 로그인
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
                    탈퇴여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    N
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Drawer>

          {/* 사진 수정 모달 */}
          <Modal
            open={updateModal}
            onCancel={updateModalHandler}
            footer={null}
            width={`350px`}
          >
            <Wrapper al="start">
              <Wrapper>
                <Text fontSize="25px" fontWeight="bold">
                  사진 수정
                </Text>
              </Wrapper>

              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">수정할 사진 업로드</Text>
              </Wrapper>
              <Wrapper
                height={`120px`}
                margin="5px 0 0"
                bgColor={Theme.lightGrey4_C}
                color={Theme.white_C}
              >
                <PlusOutlined style={{ fontSize: "40px" }} />
                <Text margin="5px 0 0" fontWeight="500">
                  파일의 최대 크기는 10MB입니다.
                </Text>
              </Wrapper>
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                변경사항 저장
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
      type: PICTURE_LIST_REQUEST,
      data: {
        offset: 0,
        limit: 10,
      },
    });

    store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await store.sagaTask.toPromise();
  }
);

export default Picture;
