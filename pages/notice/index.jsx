import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import useInput from "@/hooks/useInput";
import {
  NOTICE_LIST_REQUEST,
  NOTICE_PRE_LIST_REQUEST,
  NOTICE_PRE_TOGGLE_REQUEST,
} from "@/reducers/notice";
import wrapper from "@/store/store";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Drawer,
  Image,
  Input,
  Modal,
  Select,
  Switch,
  Tabs,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const TabsStyle = styled(Tabs)`
  .ant-tabs-nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .ant-tabs-nav-wrap {
    flex: 1;
  }

  .ant-tabs-nav-list {
    display: flex;
    width: 100%;
  }

  .ant-tabs-tab {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    width: 25%;
  }
`;

const Notice = () => {
  //////* USESTATE //////
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [noticeDetailOpen, setNoticeDetailOpen] = useState(false);
  const [noticeDetailData, setNoticeDetailData] = useState(null);
  const [noticePreDetailOpen, setNoticePreDetailOpen] = useState(false);
  const [noticePreDetailData, setNoticePreDetailData] = useState(null);

  const [jobDetailOpen, setJobDetailOpen] = useState(false);
  const [announcementDetailOpen, setAnnouncementDetailOpen] = useState(false);
  const [jobCategoryCreateModal, setJobCategoryCreateModal] = useState(false);
  const [noticeCurrentPage, setNoticeCurrentPage] = useState(1);
  const [noticePreCurrentPage, setNoticePreCurrentPage] = useState(1);

  const category = useInput("");

  const {
    notices,
    totalNotice,
    noticePre,
    totalNoticePre,
    st_noticePreToggleDone,
    st_noticePreToggleError,
  } = useSelector((state) => state.notice);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(noticePre);
  }, [noticePre]);

  useEffect(() => {
    console.log(st_noticePreToggleDone);

    dispatch({
      type: NOTICE_PRE_LIST_REQUEST,
      data: {
        page: noticePreCurrentPage,
      },
    });
  }, [st_noticePreToggleDone]);
  useEffect(() => {
    console.log(st_noticePreToggleError);
  }, [st_noticePreToggleError]);

  //////* HANDLER //////

  const jobDetailOpenHandler = useCallback(() => {
    setJobDetailOpen((prev) => !prev);
  }, [jobDetailOpen]);

  const announcementDetailOpenHandler = useCallback(() => {
    setAnnouncementDetailOpen((prev) => !prev);
  }, [announcementDetailOpen]);

  const noticeDetailHandler = useCallback(
    (value) => {
      if (value) {
        setNoticeDetailData(value);
      } else {
        setNoticeDetailData(null);
      }
      setNoticeDetailOpen(value);
    },
    [noticeDetailOpen]
  );

  const noticePreDetailHandler = useCallback(
    (value) => {
      if (value) {
        setNoticePreDetailData(value);
      } else {
        setNoticePreDetailData(null);
      }
      setNoticePreDetailOpen(value);
    },
    [noticePreDetailOpen]
  );

  const jobCategoryCreateModalHandler = useCallback(
    (data) => {
      if (data) {
        category.setValue(data);
        setJobCategoryCreateModal((prev) => !prev);
      } else {
        category.setValue("");
        setJobCategoryCreateModal((prev) => !prev);
      }
    },
    [jobCategoryCreateModal, category.value]
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

  const onTabChange = useCallback(
    (key) => {
      setActiveTabKey(key);
    },
    [activeTabKey]
  );

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 카테고리를 삭제하시겠어요?",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const noticePaginationHandler = useCallback(
    (page) => {
      setNoticeCurrentPage(page);

      dispatch({
        type: NOTICE_LIST_REQUEST,
        data: {
          page,
        },
      });
    },
    [noticeCurrentPage]
  );

  const noticePrePaginationHandler = useCallback(
    (page) => {
      setNoticePreCurrentPage(page);

      dispatch({
        type: NOTICE_PRE_LIST_REQUEST,
        data: {
          page,
        },
      });
    },
    [noticePreCurrentPage]
  );

  const noticePreSwitchHandler = useCallback((checked, id) => {
    if (id) {
      if (checked) {
        dispatch({
          type: NOTICE_PRE_TOGGLE_REQUEST,
          data: {
            id,
            action: "approve",
          },
        });
      } else {
        dispatch({
          type: NOTICE_PRE_TOGGLE_REQUEST,
          data: {
            id,
            action: "reject",
          },
        });
      }
    }
  }, []);

  const jobCategoryData = [
    {
      id: 1,
      categoryName: "긴급 인원 충원",
      contentAmount: "382",
      createdAt: "2023-12-13",
    },
  ];
  const jobData = [
    {
      id: 1,
      category: "구인",
      title:
        "2년 이상 경력 수석 디자이너 선생님 모집중입니다. 많은 관심 부탁드립니다.",
      content:
        "2년 이상 경력 수석 디자이너 선생님 모집중입니다. 많은 관심 부탁드립니다.2년 이상 경력 수석 디자이너 선생님 모집중입니다. 많은 관심 부탁드립니다.",
      name: "김미몽",
      createAt: "2023-12-13",
    },
  ];
  const announcementData = [
    {
      id: 1,
      explanation:
        "상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명",
      recruitment: "컷트",
      cost: "10,000",
      desiredTime: "오전 11시 30분",
      name: "박미몽",
      createAt: "2023-12-13",
    },
  ];

  //////* DATAVIEW //////

  const noticeColumns = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "위치",
      dataIndex: "address",
    },
    {
      title: "제목",
      dataIndex: "title",
    },

    {
      title: "상세보기",
      align: "center",

      render: (data) => {
        return (
          <Button
            style={{ width: "120px" }}
            onClick={() => noticeDetailHandler(data)}
          >
            상세보기
          </Button>
        );
      },
    },
  ];

  const noticePreColumns = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "위치",
      dataIndex: "address",
    },
    {
      title: "제목",
      dataIndex: "title",
    },

    {
      title: "프리미엄 ON/OFF",
      align: "center",

      render: (data) => {
        return (
          <Switch
            checkedChildren="프리미엄 ON"
            unCheckedChildren="프리미엄 OFF"
            checked={data.isPremium}
            style={{ width: "120px" }}
            onChange={(e) => noticePreSwitchHandler(e, data.id)}
          />
        );
      },
    },
    {
      title: "상세보기",
      align: "center",

      render: (data) => {
        return (
          <Button
            style={{ width: "120px" }}
            onClick={() => noticePreDetailHandler(data)}
          >
            상세보기
          </Button>
        );
      },
    },
  ];

  const jobCategoryColumns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
    },
    {
      title: "카테고리명",
      dataIndex: "categoryName",
    },
    {
      title: "컨텐츠수",
      dataIndex: "contentAmount",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
    },
    {
      title: "숨김",
      align: "center",
      render: (data) => {
        return (
          <Switch
            checkedChildren="공개"
            unCheckedChildren="숨김"
            defaultChecked
          />
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
              onClick={() => jobCategoryCreateModalHandler(data)}
            />
            <DeleteOutlined
              style={{
                margin: "0 0 0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={showDeleteConfirm}
            />
          </Wrapper>
        );
      },
    },
  ];

  const jobColumns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
      width: "7%",
    },
    {
      title: "게시글유형",
      dataIndex: "category",
      width: "7.5%",
    },
    {
      title: "제목",
      dataIndex: "title",
      width: "20%",
      ellipsis: true,
      render: (data) => {
        return (
          <Button
            type="link"
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              maxWidth: "100%",
              overflow: "hidden",
            }}
            onClick={jobDetailOpenHandler}
          >
            <span
              style={{
                display: "inline-block",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data}
            </span>
          </Button>
        );
      },
    },
    {
      title: "컨텐츠",
      dataIndex: "content",
      ellipsis: true,
      width: "40%",
    },
    {
      title: "작성자",
      dataIndex: "name",
      width: "7.5%",
    },
    {
      title: "작성일",
      dataIndex: "createAt",
      width: "10%",
    },
    {
      title: "숨김",
      align: "center",
      width: "8%",
      render: (data) => {
        return (
          <Switch
            checkedChildren="공개"
            unCheckedChildren="숨김"
            defaultChecked
          />
        );
      },
    },
  ];

  const announcementColumns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
      width: "7%",
    },
    {
      title: "상세설명",
      dataIndex: "explanation",
      width: "40%",
      ellipsis: true,
      render: (data) => {
        return (
          <Button
            type="link"
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              maxWidth: "100%",
              overflow: "hidden",
            }}
            onClick={announcementDetailOpenHandler}
          >
            <span
              style={{
                display: "inline-block",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data}
            </span>
          </Button>
        );
      },
    },
    {
      title: "모집분야",
      dataIndex: "recruitment",
      width: "7.5%",
    },

    {
      title: "재료비",
      dataIndex: "cost",
      width: "10%",
    },
    {
      title: "희망시간",
      dataIndex: "desiredTime",
      width: "10%",
    },
    {
      title: "작성자",
      dataIndex: "name",
      width: "7.5%",
    },

    {
      title: "공고일시",
      dataIndex: "createAt",
      width: "10%",
    },
    {
      title: "숨김",
      align: "center",
      width: "8%",
      render: (data) => {
        return (
          <Switch
            checkedChildren="공개"
            unCheckedChildren="숨김"
            defaultChecked
          />
        );
      },
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Text fontSize="25px" fontWeight="bold">
            게시판 관리
          </Text>

          <Wrapper>
            <TabsStyle
              style={{ width: "100%", margin: "40px 0 0 0" }}
              defaultActiveKey="1"
              centered
              items={[
                { label: "번개매칭 일반", key: "1" },
                { label: "번개매칭 프리미엄", key: "2" },
                { label: "구인구직", key: "3" },
                { label: "공고관리", key: "4" },
              ]}
              onChange={onTabChange}
            />
          </Wrapper>

          {activeTabKey === "1" && (
            <Wrapper>
              <Wrapper dr="row" ju="start" al="end" margin="10px 0 0">
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
                  >
                    검색
                  </Button>
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Button style={{ width: "90px", margin: "5px 0 0" }}>
                    초기화
                  </Button>
                </Wrapper>
              </Wrapper>
              <Wrapper
                height="1px"
                bgColor={Theme.grey2_C}
                margin="20px 0"
              ></Wrapper>
              <Wrapper dr="row" ju="space-between">
                <Wrapper dr="row" width="auto">
                  <Text fontWeight="bold">번개매칭 일반 리스트</Text>
                  <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                    {totalNotice || 0}개
                  </Text>
                </Wrapper>
              </Wrapper>

              <CenteredPaginationTable
                rowKey="id"
                columns={noticeColumns}
                dataSource={notices ? notices : []}
                size="small"
                style={{ width: "100%", margin: "20px 0 0 0" }}
                pagination={{
                  current: noticeCurrentPage,
                  pageSize: 10,
                  total: totalNotice,
                  onChange: noticePaginationHandler,
                }}
              />
            </Wrapper>
          )}

          {activeTabKey === "2" && (
            <Wrapper>
              <Wrapper dr="row" ju="start" al="end" margin="10px 0 0">
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
                  >
                    검색
                  </Button>
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Button style={{ width: "90px", margin: "5px 0 0" }}>
                    초기화
                  </Button>
                </Wrapper>
              </Wrapper>
              <Wrapper
                height="1px"
                bgColor={Theme.grey2_C}
                margin="20px 0"
              ></Wrapper>

              <Wrapper dr="row" ju="space-between">
                <Wrapper dr="row" width="auto">
                  <Text fontWeight="bold">번개매칭 프리미엄 리스트</Text>
                  <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                    {totalNoticePre || 0}개
                  </Text>
                </Wrapper>
              </Wrapper>

              <CenteredPaginationTable
                rowKey="id"
                columns={noticePreColumns}
                dataSource={noticePre ? noticePre : []}
                size="small"
                style={{ width: "100%", margin: "20px 0 0 0" }}
                pagination={{
                  current: noticePreCurrentPage,
                  pageSize: 10,
                  total: totalNoticePre,
                  onChange: noticePrePaginationHandler,
                }}
              />
            </Wrapper>
          )}

          {activeTabKey === "3" && (
            <Wrapper>
              <Wrapper dr="row" ju="start" al="end" margin="10px 0 0">
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
                  <Text fontSize="12px">게시글 유형</Text>
                  <Select
                    defaultValue="전체"
                    style={{ width: 130, margin: "5px 0 0 0" }}
                    options={[{ value: "전체", label: "전체" }]}
                  />
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Text fontSize="12px">작성자</Text>
                  <Input
                    style={{ width: 130, margin: "5px 0 0 0" }}
                    placeholder="작성자명 입력"
                  />
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Button
                    type="primary"
                    style={{ width: "90px", margin: "5px 0 0" }}
                  >
                    검색
                  </Button>
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Button style={{ width: "90px", margin: "5px 0 0" }}>
                    초기화
                  </Button>
                </Wrapper>
              </Wrapper>
              <Wrapper
                height="1px"
                bgColor={Theme.grey2_C}
                margin="20px 0"
              ></Wrapper>
              <Wrapper dr="row" ju="space-between">
                <Wrapper dr="row" width="auto">
                  <Text fontWeight="bold">카테고리</Text>
                  <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                    1 개
                  </Text>
                </Wrapper>
                <Button
                  type="primary"
                  style={{ width: "150px" }}
                  onClick={() => jobCategoryCreateModalHandler(null)}
                >
                  카테고리 생성
                </Button>
              </Wrapper>

              <CenteredPaginationTable
                rowKey="id"
                columns={jobCategoryColumns}
                dataSource={jobCategoryData ? jobCategoryData : []}
                size="small"
                style={{ width: "100%", margin: "20px 0 0 0" }}
              />
              <Wrapper dr="row" ju="space-between">
                <Wrapper dr="row" width="auto">
                  <Text fontWeight="bold">구인구직 리스트</Text>
                  <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                    1 개
                  </Text>
                </Wrapper>
              </Wrapper>

              <CenteredPaginationTable
                rowKey="id"
                columns={jobColumns}
                dataSource={jobData ? jobData : []}
                size="small"
                style={{ width: "100%", margin: "20px 0 0 0" }}
              />
            </Wrapper>
          )}

          {activeTabKey === "4" && (
            <Wrapper>
              <Wrapper dr="row" ju="start" al="end" margin="10px 0 0">
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
                  <Text fontSize="12px">작성자</Text>
                  <Input
                    style={{ width: 130, margin: "5px 0 0 0" }}
                    placeholder="작성자명 입력"
                  />
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Button
                    type="primary"
                    style={{ width: "90px", margin: "5px 0 0" }}
                  >
                    검색
                  </Button>
                </Wrapper>
                <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                  <Button style={{ width: "90px", margin: "5px 0 0" }}>
                    초기화
                  </Button>
                </Wrapper>
              </Wrapper>
              <Wrapper
                height="1px"
                bgColor={Theme.grey2_C}
                margin="20px 0"
              ></Wrapper>
              <Wrapper dr="row" ju="space-between" margin="5px 0 0">
                <Wrapper dr="row" width="auto">
                  <Text fontWeight="bold">공고관리 리스트</Text>
                  <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                    1 개
                  </Text>
                </Wrapper>
              </Wrapper>

              <CenteredPaginationTable
                rowKey="id"
                columns={announcementColumns}
                dataSource={announcementData ? announcementData : []}
                size="small"
                style={{ width: "100%", margin: "20px 0 0 0" }}
              />
            </Wrapper>
          )}

          {/* 번개매칭 일반 상세보기 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`게시판 관리 > 번개매칭 일반 상세`}</Text>
              </Wrapper>
            }
            onClose={() => noticeDetailHandler(null)}
            open={noticeDetailOpen}
            width={`1000px`}
          >
            <Wrapper dr="row" al="start">
              <Wrapper
                width="20%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                번개매칭 일반
              </Wrapper>
              <Wrapper width="80%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.id : "-"}
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
                    {noticeDetailData ? noticeDetailData.name : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    제목
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.title : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    위치
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.address : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    가격 유형
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.priceType : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    희망 가격
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.price : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    카테고리
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData && noticeDetailData.categories
                      ? noticeDetailData.categories.filter(Boolean).join(", ")
                      : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    희망 날짜
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.wantDatetime : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    댓글 활성화 여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData
                      ? noticeDetailData.is_comment_enabled
                        ? "활성화"
                        : "비활성화"
                      : "비활성화"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    댓글 수
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.commentCount : "0"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    조회 수
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? noticeDetailData.viewCount : "0"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  al="start"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    이미지
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticeDetailData ? (
                      <Image src={noticeDetailData.imgUrl} />
                    ) : (
                      <></>
                    )}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Drawer>

          {/* 번개매칭  프리미엄 상세보기 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`게시판 관리 > 번개매칭 프리미엄 상세`}</Text>
              </Wrapper>
            }
            onClose={() => noticePreDetailHandler(null)}
            open={noticePreDetailOpen}
            width={`1000px`}
          >
            <Wrapper dr="row" al="start">
              <Wrapper
                width="20%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="10px 0"
              >
                번개매칭 프리미엄
              </Wrapper>
              <Wrapper width="80%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? noticePreDetailData.id : "-"}
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
                    {noticePreDetailData ? noticePreDetailData.name : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    제목
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? noticePreDetailData.title : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    위치
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? noticePreDetailData.address : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    가격 유형
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? noticePreDetailData.priceType : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    희망 가격
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? noticePreDetailData.price : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    카테고리
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData
                      ? noticePreDetailData.categories
                          .filter(Boolean)
                          .join(", ")
                      : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    희망 날짜
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData
                      ? noticePreDetailData.wantDatetime
                      : "-"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    댓글 활성화 여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData
                      ? noticePreDetailData.is_comment_enabled
                        ? "활성화"
                        : "비활성화"
                      : "비활성화"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    댓글 수
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData
                      ? noticePreDetailData.commentCount
                      : "0"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    조회 수
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? noticePreDetailData.viewCount : "0"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    프리미엄
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData
                      ? noticePreDetailData.isPremium
                        ? "프리미엄 ON"
                        : "프리미엄 OFF"
                      : "프리미엄 OFF"}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  al="start"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    이미지
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    {noticePreDetailData ? (
                      <Image src={noticePreDetailData.imgUrl} />
                    ) : (
                      <></>
                    )}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Drawer>

          {/* 구인구직 카테고리 생성 모달 */}
          <Modal
            open={jobCategoryCreateModal}
            onCancel={() => jobCategoryCreateModalHandler(null)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                {category.value ? "카테고리 수정" : "카테고리 생성"}
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">카테고리 명</Text>
              </Wrapper>
              <Input
                placeholder="카테고리 명을 입력해 주세요."
                style={{ width: "100%", marginTop: "0" }}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                {category.value ? "수정" : "생성"}
              </Button>
            </Wrapper>
          </Modal>

          {/* 구인 구직 상세 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`게시판 관리 > 급구 게시판 상세`}</Text>

                <Wrapper width="auto" dr="row">
                  <Button style={{ width: "130px" }} onClick={() => {}}>
                    숨김 처리
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: "10px", width: "130px" }}
                    onClick={null}
                  >
                    수정하기
                  </Button>
                </Wrapper>
              </Wrapper>
            }
            onClose={jobDetailOpenHandler}
            open={jobDetailOpen}
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
                    번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    1
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    카테고리
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    수석 디자이너 모집 중
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    제목
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    3년 이상의 수석 디자이너 선생님 모집중ㅇ립니다! 많은 관심
                    부탁드립니다.
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    작성자
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    김미몽
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
                    미몽 미용실
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    작성일
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    2023-12-12 13:46:12
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    최종수정일
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    2023-12-12 13:46:12
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    모집만료일
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    2023-12-12 13:46:12
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
                공고 상세
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    근무지역
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    서울시 강남구 달포대구로 1125
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    경력여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    경력 3년 이상
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    연봉/급여
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    연봉 3,600만원
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    근무형태
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    정규직
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    수습기간
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    3개월
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    공고 기간
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    1개월 (2023-12-12 ~ 2024-01-11)
                  </Wrapper>
                </Wrapper>
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
                      src="https://source.unsplash.com/random/500x500/?human"
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
                    상세설명
                  </Wrapper>

                  <Wrapper width="85%" al="start">
                    3년 이상의 수석 디자이너 선생님 모집중입니다! 많은 관심
                    부탁드립니다.3년 이상의 수석 디자이너 선생님 모집중입니다!
                    많은 관심 부탁드립니다.3년 이상의 수석 디자이너 선생님
                    모집중입니다! 많은 관심 부탁드립니다.3년 이상의 수석
                    디자이너 선생님 모집중입니다! 많은 관심 부탁드립니다.3년
                    이상의 수석 디자이너 선생님 모집중입니다! 많은 관심
                    부탁드립니다.3년 이상의 수석 디자이너 선생님 모집중입니다!
                    많은 관심 부탁드립니다.3년 이상의 수석 디자이너 선생님
                    모집중입니다! 많은 관심 부탁드립니다.3년 이상의 수석
                    디자이너 선생님 모집중입니다! 많은 관심 부탁드립니다.
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    숨김 여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    N
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Drawer>

          {/* 공고 관리 상세 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`게시판 관리 > 공고 관리 상세`}</Text>

                <Wrapper width="auto" dr="row">
                  <Button
                    type="primary"
                    danger
                    style={{ width: "130px" }}
                    onClick={() => {}}
                  >
                    숨김 해제
                  </Button>
                </Wrapper>
              </Wrapper>
            }
            onClose={announcementDetailOpenHandler}
            open={announcementDetailOpen}
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
                게시글 상세
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    번호
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    1
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    상세설명
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    3년 이상의 수석 디자이너 선생님 모집중입니다! 많은 관심
                    부탁드립니다.3년 이상의 수석 디자이너 선생님 모집중입니다!
                    많은 관심 부탁드립니다.3년 이상의 수석 디자이너 선생님
                    모집중입니다! 많은 관심 부탁드립니다.3년 이상의 수석
                    디자이너 선생님 모집중입니다! 많은 관심 부탁드립니다.3년
                    이상의 수석 디자이너 선생님 모집중입니다! 많은 관심
                    부탁드립니다.3년 이상의 수석 디자이너 선생님 모집중입니다!
                    많은 관심 부탁드립니다.3년 이상의 수석 디자이너 선생님
                    모집중입니다! 많은 관심 부탁드립니다.3년 이상의 수석
                    디자이너 선생님 모집중입니다! 많은 관심 부탁드립니다.
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    모집분야
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    컷트
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    재료비
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    30,000원
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    희망 시간
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    오전 11시 30분
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    작성자
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    김미몽
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    업체명
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    미오미용실
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    공고일시
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    2023-12-12 13:46:12
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    숨김여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    N
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
      type: NOTICE_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    store.dispatch({
      type: NOTICE_PRE_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await store.sagaTask.toPromise();
  }
);

export default Notice;
