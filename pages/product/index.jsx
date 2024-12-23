import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input, Modal, Select, Switch, Tabs } from "antd";
import { useCallback, useState } from "react";
import styled from "styled-components";

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
  }
`;

const showDiscountDeleteConfirm = () => {
  Modal.confirm({
    title: "NOTICE",
    icon: <ExclamationCircleFilled />,
    content: (
      <Wrapper al="start">
        <Text>정말 할인을 삭제하시겠어요?</Text>
        <Text>할인이 즉시 삭제됩니다.</Text>
      </Wrapper>
    ),
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

const showProductDeleteConfirm = () => {
  Modal.confirm({
    title: "NOTICE",
    icon: <ExclamationCircleFilled />,
    content: (
      <Wrapper al="start">
        <Text>정말 상품을 삭제하시겠어요?</Text>
        <Text>상품이 즉시 삭제됩니다.</Text>
      </Wrapper>
    ),
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

const Product = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [discountModal, setDiscountModal] = useState(false);
  const [createdrawerOpen, setCreateDrawerOpen] = useState(false);
  const [updatedrawerOpen, setUpdateDrawerOpen] = useState(false);

  //////* HANDLER //////
  const onTabChange = useCallback(
    (key) => {
      setActiveTabKey(key);
    },
    [activeTabKey]
  );

  const subscriptionData = [
    {
      id: 1,
      productName: "Basic Plan / 1mo",
      price: "9,900",
      discount: "20%",
      paymentPrice: "9,900",
      dataType: "1개월",
    },
  ];
  const mongData = [
    {
      id: 1,
      productName: "4,000 Gem_no discount",
      price: "29,900",
      discount: "30%",
      paymentPrice: "29,900",
    },
  ];
  const historyData = [
    {
      id: 1,
      productName: "Basic Plan / 1mo",
      price: "59,900",
      discount: "10%",
      paymentPrice: "59,900",
      createdAt: "2023-12-12",
    },
  ];

  const discountModalHandler = useCallback(
    (value) => {
      setDiscountModal(value);
    },
    [discountModal]
  );

  const createDrawerOpenHandler = useCallback(() => {
    setCreateDrawerOpen((prev) => !prev);
  }, [createdrawerOpen]);

  const updateDrawerOpenHandler = useCallback(() => {
    setUpdateDrawerOpen((prev) => !prev);
  }, [updatedrawerOpen]);

  //////* DATAVIEW //////

  const subscriptionColumns = [
    {
      title: "상품명",
      dataIndex: "productName",
    },
    {
      title: "가격",
      dataIndex: "price",
    },
    {
      title: "할인",
      dataIndex: "discount",
    },
    {
      title: "결제가격",
      dataIndex: "paymentPrice",
    },
    {
      title: "기간유형",
      dataIndex: "dataType",
    },

    {
      title: "할인설정",
      align: "center",
      render: (data) => {
        return (
          <Wrapper dr="row">
            <PlusOutlined
              style={{
                color: Theme.basicTheme_C,
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => discountModalHandler(true)}
            />
            <MinusOutlined
              style={{
                color: Theme.red_C,
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={showDiscountDeleteConfirm}
            />
          </Wrapper>
        );
      },
    },
    {
      title: "상품숨김",
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
              onClick={() => updateDrawerOpenHandler(true)}
            />
            <DeleteOutlined
              style={{
                margin: "0 0 0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={showProductDeleteConfirm}
            />
          </Wrapper>
        );
      },
    },
  ];

  const mongColumns = [
    {
      title: "상품명",
      dataIndex: "productName",
    },
    {
      title: "가격",
      dataIndex: "price",
    },
    {
      title: "할인",
      dataIndex: "discount",
    },
    {
      title: "결제가격",
      dataIndex: "paymentPrice",
    },
    {
      title: "할인설정",
      align: "center",
      render: (data) => {
        return (
          <Wrapper dr="row">
            <PlusOutlined
              style={{
                color: Theme.basicTheme_C,
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => discountModalHandler(true)}
            />
            <MinusOutlined
              style={{
                color: Theme.red_C,
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={showDiscountDeleteConfirm}
            />
          </Wrapper>
        );
      },
    },
    {
      title: "상품숨김",
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
              onClick={() => updateDrawerOpenHandler(true)}
            />
            <DeleteOutlined
              style={{
                margin: "0 0 0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={showProductDeleteConfirm}
            />
          </Wrapper>
        );
      },
    },
  ];

  const historyColumns = [
    {
      title: "상품명",
      dataIndex: "productName",
    },
    {
      title: "가격",
      dataIndex: "price",
    },
    {
      title: "할인",
      dataIndex: "discount",
    },
    {
      title: "결제가격",
      dataIndex: "price",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              상품 관리
            </Text>
            <Button
              type="primary"
              style={{ width: "150px" }}
              onClick={() => createDrawerOpenHandler(true)}
              size="large"
            >
              상품 만들기
            </Button>
          </Wrapper>

          <TabsStyle
            style={{ width: "100%", margin: "40px 0 0 0" }}
            defaultActiveKey="1"
            centered
            items={[
              { label: "구독", key: "1" },
              { label: "몽", key: "2" },
              { label: "이력", key: "3" },
            ]}
            onChange={onTabChange}
          />

          <CenteredPaginationTable
            rowKey="id"
            columns={
              activeTabKey === "2"
                ? mongColumns
                : activeTabKey === "3"
                ? historyColumns
                : subscriptionColumns
            }
            dataSource={
              activeTabKey === "2"
                ? mongData
                  ? mongData
                  : []
                : activeTabKey === "3"
                ? historyData
                  ? historyData
                  : []
                : subscriptionData
                ? subscriptionData
                : []
            }
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 할인율 입력 모달 */}
          <Modal
            open={discountModal}
            onCancel={() => discountModalHandler(false)}
            footer={null}
            width={`350px`}
          >
            <Wrapper>
              <Text fontSize="25px" fontWeight="bold">
                할인 추가
              </Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">할인율 입력</Text>
              </Wrapper>
              <Input
                placeholder="할인율 입력"
                style={{ width: "100%", marginTop: "0" }}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                저장
              </Button>
            </Wrapper>
          </Modal>

          {/* 상품 만들기 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`상품 관리 > 상품 만들기`}</Text>
            }
            onClose={createDrawerOpenHandler}
            open={createdrawerOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                상품 정보 입력
              </Text>
              <Text margin="20px 0 0" fontWeight="500">
                플랫폼
              </Text>
              <Select
                defaultValue={"전체"}
                options={[
                  { label: "전체", value: "전체" },
                  { label: "ios", value: "ios" },
                  { label: "aos", value: "aos" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                상품 타입
              </Text>
              <Select
                defaultValue={"구독"}
                options={[
                  { label: "구독", value: "구독" },
                  { label: "몽", value: "몽" },
                  { label: "부가서비스", value: "부가서비스" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                기간 유형
              </Text>
              <Select
                defaultValue={"전체"}
                options={[
                  { label: "1 Month", value: "1 Month" },
                  { label: "6 Month", value: "6 Month" },
                  { label: "12 Month", value: "12 Month" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                상품명
              </Text>
              <Input
                placeholder="상품명을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Wrapper dr="row" ju="space-between">
                <Wrapper width="49%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    가격
                  </Text>
                  <Input
                    placeholder="가격을 입력해 주세요."
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
                <Wrapper width="49%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    단위
                  </Text>
                  <Select
                    defaultValue={"원"}
                    options={[
                      { label: "원", value: "원" },
                      { label: "몽", value: "몽" },
                    ]}
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
              </Wrapper>
              <Text margin="20px 0 0" fontWeight="500">
                할인율
              </Text>
              <Input
                placeholder="할인율을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
              >
                상품 등록하기
              </Button>
            </Wrapper>
          </Drawer>

          {/* 상품 수정 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`상품 관리 > 상품 수정`}</Text>
            }
            onClose={updateDrawerOpenHandler}
            open={updatedrawerOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                상품 정보 수정
              </Text>
              <Text margin="20px 0 0" fontWeight="500">
                플랫폼
              </Text>
              <Select
                defaultValue={"전체"}
                options={[
                  { label: "전체", value: "전체" },
                  { label: "ios", value: "ios" },
                  { label: "aos", value: "aos" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                상품 타입
              </Text>
              <Select
                defaultValue={"구독"}
                options={[
                  { label: "구독", value: "구독" },
                  { label: "몽", value: "몽" },
                  { label: "부가서비스", value: "부가서비스" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                기간 유형
              </Text>
              <Select
                defaultValue={"전체"}
                options={[
                  { label: "1 Month", value: "1 Month" },
                  { label: "6 Month", value: "6 Month" },
                  { label: "12 Month", value: "12 Month" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                상품명
              </Text>
              <Input
                placeholder="상품명을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Wrapper dr="row" ju="space-between">
                <Wrapper width="49%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    가격
                  </Text>
                  <Input
                    placeholder="가격을 입력해 주세요."
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
                <Wrapper width="49%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    단위
                  </Text>
                  <Select
                    defaultValue={"원"}
                    options={[
                      { label: "원", value: "원" },
                      { label: "몽", value: "몽" },
                    ]}
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
              </Wrapper>
              <Text margin="20px 0 0" fontWeight="500">
                할인율
              </Text>
              <Input
                placeholder="할인율을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
              >
                상품 수정하기
              </Button>
            </Wrapper>
          </Drawer>
        </Wrapper>
      }
    />
  );
};

export default Product;
