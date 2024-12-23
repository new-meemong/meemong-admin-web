import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import useInput from "@/hooks/useInput";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, DatePicker, Input, Modal, Switch } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const ChatWrapper = styled(Wrapper)`
  max-width: 45%;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;
const ChatWrapper2 = styled(Wrapper)`
  max-width: 45%;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Chatting = () => {
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keywordModal, setKeywordModal] = useState(false);

  const keyword = useInput("");

  //////* HANDLER //////
  const data = [
    {
      id: 1,
      receive: "김미몽",
      send: "이미몽",
      chatStartAt: "2023-12-13",
    },
  ];

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedRowKeys([data[0].id]);
    }
  }, []);

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

  const categoryData = [
    {
      id: 1,
      prohibitedKeywords: "따로 연락드릴께요",
      keywordCount: "234",
      createdAt: "2023-12-13",
    },
  ];

  const keywordModalHandler = useCallback(
    (data) => {
      if (data) {
        keyword.setValue(data);
        setKeywordModal((prev) => !prev);
      } else {
        keyword.setValue("");
        setKeywordModal((prev) => !prev);
      }
    },
    [keywordModal, keyword.value]
  );

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: useCallback(
      (newSelectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${newSelectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        setSelectedRowKeys(newSelectedRowKeys); // 선택된 키 업데이트
      },
      [selectedRowKeys]
    ),
  };

  const showDiscountDeleteConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 금지 키워드를 삭제하시겠어요?",
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

  //////* DATAVIEW //////

  const categoryColumns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
    },
    {
      title: "금지키워드",
      dataIndex: "prohibitedKeywords",
    },
    {
      title: "키워드카운트",
      dataIndex: "keywordCount",
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
              onClick={() => keywordModalHandler(data.prohibitedKeywords)}
            />
            <DeleteOutlined
              style={{
                margin: "0 0 0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={showDiscountDeleteConfirm}
            />
          </Wrapper>
        );
      },
    },
  ];

  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
    },
    {
      title: "받은 사람",
      dataIndex: "receive",
    },
    {
      title: "보낸 사람",
      dataIndex: "send",
    },
    {
      title: "채팅 시작일",
      dataIndex: "chatStartAt",
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Text fontSize="25px" fontWeight="bold">
            채팅 관리
          </Text>
          <Wrapper>
            <Wrapper dr="row" ju="start" al="end" margin="50px 0 0">
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
                />
              </Wrapper>
              <Wrapper width="auto" al="start" margin="0 10px 10px 0">
                <Text fontSize="12px">키워드</Text>
                <Input
                  style={{ width: 130, margin: "5px 0 0 0" }}
                  placeholder="키워드 입력"
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
                <Text fontWeight="bold">금지 키워드</Text>
                <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                  5 개
                </Text>
              </Wrapper>
              <Button
                type="primary"
                style={{ width: "150px" }}
                onClick={() => keywordModalHandler(null)}
              >
                키워드 생성
              </Button>
            </Wrapper>

            <CenteredPaginationTable
              rowKey="id"
              columns={categoryColumns}
              dataSource={categoryData ? categoryData : []}
              size="small"
              style={{ width: "100%", margin: "20px 0 0 0" }}
            />

            <Wrapper dr="row" ju="space-between" al="start">
              <Wrapper width="48.5%">
                <Wrapper dr="row" width="100%" ju="start">
                  <Text fontWeight="bold">소모임 리스트</Text>
                  <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                    1 개
                  </Text>
                </Wrapper>
                <CenteredPaginationTable
                  rowKey="id"
                  columns={columns}
                  dataSource={data ? data : []}
                  size="small"
                  style={{ width: "100%", margin: "20px 0 0 0" }}
                  rowSelection={rowSelection}
                />
              </Wrapper>
              <Wrapper width="48.5%">
                <Wrapper dr="row" width="100%" ju="start">
                  <Text fontWeight="bold">채팅 로그</Text>
                </Wrapper>
                <Wrapper
                  margin="20px 0 0 0"
                  minHeight="480px"
                  border={`1px solid ${Theme.adminLightGrey_C}`}
                  radius="10px"
                  ju="start"
                >
                  <Wrapper
                    dr="row"
                    height="38px"
                    borderBottom={`1px solid ${Theme.adminLightGrey_C}`}
                    bgColor={Theme.lightGrey2_C}
                  >
                    <Wrapper width="50%">김미몽</Wrapper>
                    <Wrapper width="50%">이미몽</Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr="row"
                    ju="end"
                    al="end"
                    boxSizing="border-box"
                    padding="20px 20px 0 20px"
                  >
                    <Text
                      fontSize="14px"
                      color={Theme.grey2_C}
                      margin="0 5px 0 0"
                    >
                      2023.12.13 17:50
                    </Text>

                    <ChatWrapper
                      width="auto"
                      max
                      padding="15px"
                      boxSizing="border-box"
                      bgColor={Theme.subTheme_C}
                      color={Theme.white_C}
                    >
                      안녕하세요. 전지현 모델님 원하시는 헤어커트가 있으실까요?
                    </ChatWrapper>
                  </Wrapper>
                  <Wrapper
                    dr="row"
                    ju="start"
                    al="end"
                    boxSizing="border-box"
                    padding="20px 20px 0 20px"
                  >
                    <ChatWrapper2
                      width="auto"
                      max
                      padding="15px"
                      boxSizing="border-box"
                      bgColor={Theme.subTheme2_C}
                    >
                      네, 레이어드 컷으로 시술 가능할까요?
                    </ChatWrapper2>
                    <Text
                      fontSize="14px"
                      color={Theme.grey2_C}
                      margin="0 0 0 5px"
                    >
                      2023.12.13 17:57
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          {/* 금지 키워드 모달 */}
          <Modal
            open={keywordModal}
            onCancel={() => keywordModalHandler(null)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                {keyword.value ? `금지 키워드 수정` : `금지 키워드 생성`}
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">금지 키워드 명</Text>
              </Wrapper>
              <Input
                placeholder="금지 키워드 명을 입력해 주세요."
                style={{ width: "100%", marginTop: "0" }}
                {...keyword}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                {keyword.value ? `수정` : `생성`}
              </Button>
            </Wrapper>
          </Modal>
        </Wrapper>
      }
    />
  );
};

export default Chatting;
