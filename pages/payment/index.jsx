import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

const { RangePicker } = DatePicker;

const Payment = () => {
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [refundModal, setRefundModal] = useState(false);

  const refundModalHandler = useCallback(
    (value) => {
      setRefundModal(value);
    },
    [refundModal]
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

  const showRefundConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 환불 처리 하시겠습니까?",
      okText: "환불",
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
      type: "모델",
      nickname: "미몽해미몽해",
      company: "미몽미용실",
      name: "김미몽",
      productType: "몽",
      productName: "Standard",
      price: "23,700",
      useCoupon: "Y",
      discount: "-11,900",
      sale: "107,100",
      purchaseDate: "2023-12-12",
      refundStatus: "N",
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
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
    },
    {
      title: "업체명",
      dataIndex: "company",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "상품타입",
      dataIndex: "productType",
    },
    {
      title: "상품명",
      dataIndex: "productName",
    },
    {
      title: "가격",
      dataIndex: "price",
    },
    {
      title: "쿠폰사용",
      align: "center",
      dataIndex: "useCoupon",
    },
    {
      title: "할인금액",
      dataIndex: "discount",
    },
    {
      title: "판매금액",
      dataIndex: "sale",
    },
    {
      title: "구매일",
      dataIndex: "purchaseDate",
    },
    {
      title: "환불여부",
      align: "center",
      dataIndex: "refundStatus",
    },
    {
      title: "환불",
      align: "center",
      render: (data) => {
        return (
          <Button
            type="primary"
            danger
            style={{ width: "90px" }}
            onClick={() => refundModalHandler(true)}
          >
            환불
          </Button>
        );
      },
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Text fontSize="25px" fontWeight="bold">
            결제 관리
          </Text>
          <Wrapper dr="row" ju="start" margin="50px 0 0 0" al="end">
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
              <Text fontSize="12px">환불 여부</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>

            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">구매자명</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="이름 입력"
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">상품명</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="상품 입력"
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
          <Wrapper dr="row" ju="start" margin="5px 0 0">
            <Checkbox>몽 구매 건만 보기</Checkbox>
          </Wrapper>
          <Wrapper
            height="1px"
            bgColor={Theme.grey2_C}
            margin="20px 0"
          ></Wrapper>
          <Wrapper dr="row" ju="space-between">
            <Wrapper dr="row" width="auto">
              <Text fontWeight="bold">결제 내역 리스트</Text>
              <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                1 개
              </Text>
            </Wrapper>
            <Button type="primary" style={{ width: "150px" }}>
              엑셀로 다운로드
            </Button>
          </Wrapper>
          <CenteredPaginationTable
            rowKey="id"
            columns={columns}
            dataSource={data ? data : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 별점 차단 모달 */}
          <Modal
            open={refundModal}
            onCancel={() => refundModalHandler(false)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                구독 환불
              </Text>
              <Wrapper al="start" margin="20px 0 0">
                <Checkbox>전액 환불하기</Checkbox>
                <Text margin="10px 0 0">
                  구매일: 2023-12-12 ($사용일 중 $일 사용함)
                </Text>
              </Wrapper>
              <Wrapper al="start" margin="10px 0 10px">
                <Text fontWeight="bold">환불 금액 입력</Text>
              </Wrapper>
              <Input
                type="number"
                placeholder="환불 금액 입력"
                style={{ width: "100%", marginTop: "0px" }}
                suffix="원"
              />
              <Button
                type="primary"
                danger
                style={{ width: "100%", marginTop: "20px" }}
                onClick={showRefundConfirm}
                size="large"
              >
                환불하기
              </Button>
            </Wrapper>
          </Modal>
        </Wrapper>
      }
    />
  );
};

export default Payment;
