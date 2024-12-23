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
import { Button, Input, Modal, Switch } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

const Review = () => {
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [reviewModal, setReviewModal] = useState(false);

  const review = useInput("");

  //////* HANDLER //////
  const reviewModalHandler = useCallback(
    (data) => {
      if (data) {
        review.setValue(data);
        setReviewModal((prev) => !prev);
      } else {
        review.setValue("");
        setReviewModal((prev) => !prev);
      }
    },
    [reviewModal, review.value]
  );

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 평가항목을 삭제하시겠어요?",
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

  const data = [
    {
      id: 1,
      evaluationName: "한번 더 작업하고 싶어요",
      evaluationAmount: "543",
      createdAt: "2023-12-12",
    },
  ];

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
      title: "평가항목명",
      dataIndex: "evaluationName",
    },
    {
      title: "평가수",
      dataIndex: "evaluationAmount",
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
              onClick={() => reviewModalHandler(data.evaluationName)}
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

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              리뷰 관리
            </Text>
            <Button
              type="primary"
              style={{ width: "150px", margin: "0 10px 0 0" }}
              size="large"
              onClick={() => reviewModalHandler(null)}
            >
              카테고리 생성
            </Button>
          </Wrapper>

          <Wrapper
            height="1px"
            bgColor={Theme.grey2_C}
            margin="50px 0 20px"
          ></Wrapper>
          <Wrapper dr="row" ju="start">
            <Wrapper dr="row" width="auto">
              <Text fontWeight="bold">평가항목 리스트</Text>
              <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                1 개
              </Text>
            </Wrapper>
          </Wrapper>
          <CenteredPaginationTable
            rowKey="id"
            columns={columns}
            dataSource={data ? data : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 리뷰 모달 */}
          <Modal
            open={reviewModal}
            onCancel={() => reviewModalHandler(null)}
            footer={null}
            width={`350px`}
          >
            <Wrapper al="start">
              <Wrapper>
                <Text fontSize="25px" fontWeight="bold">
                  {review.value ? `평가항목 수정` : `평가항목 생성`}
                </Text>
              </Wrapper>

              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">평가항목명</Text>
              </Wrapper>
              <Input
                placeholder="평가항목을 입력해 주세요."
                style={{ width: "100%", marginTop: "0" }}
                {...review}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                {review.value ? `수정 완료` : `생성`}
              </Button>
            </Wrapper>
          </Modal>
        </Wrapper>
      }
    />
  );
};

export default Review;
