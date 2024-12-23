import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import { Button, Drawer, Input, Select, Switch } from "antd";

import { useCallback, useState } from "react";

const Coupon = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  //////* HANDLER //////
  const detailOpenHandler = useCallback(() => {
    setDetailOpen((prev) => !prev);
  }, [detailOpen]);

  const drawerOpenHandler = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, [drawerOpen]);

  const data = [
    {
      id: 1,
      couponName: "크리스마스 헤어 대전 쿠폰",
      type: "회원가입 즉시",
      expirationPeriod: "발급일로부터 2일",
      expiration: "N",
      SuspensionIssuance: "N",
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
      title: "쿠폰명",
      dataIndex: "couponName",
      render: (data) => {
        return (
          <Button
            style={{
              paddingLeft: "0",
              paddingRight: "0",
            }}
            type="link"
            onClick={detailOpenHandler}
          >
            {data}
          </Button>
        );
      },
    },
    {
      title: "발급유형",
      dataIndex: "type",
    },
    {
      title: "유효기간",
      dataIndex: "expirationPeriod",
    },
    {
      title: "만료여부",
      dataIndex: "expiration",
      align: "center",
    },
    {
      title: "발급중지",
      dataIndex: "SuspensionIssuance",
      align: "center",
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              쿠폰 관리
            </Text>
            <Button
              onClick={drawerOpenHandler}
              type="primary"
              style={{ width: "150px" }}
              size="large"
            >
              쿠폰 만들기
            </Button>
          </Wrapper>
          <Wrapper dr="row" ju="start" margin="50px 0 0 0" al="end">
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">쿠폰명</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="쿠폰명 입력"
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
          <CenteredPaginationTable
            rowKey="id"
            columns={columns}
            dataSource={data ? data : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 쿠폰 상세보기 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`쿠폰 관리 > 쿠폰 상세`}</Text>
                <Wrapper width="auto" dr="row">
                  <Button
                    type="primary"
                    style={{ marginLeft: "10px", width: "130px" }}
                    onClick={null}
                  >
                    변경사항 저장
                  </Button>
                </Wrapper>
              </Wrapper>
            }
            onClose={detailOpenHandler}
            open={detailOpen}
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
                쿠폰 정보
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
                    사용된 갯수
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    0개
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    총 할인 금액
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    0원
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    만료여부
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    N
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    발급 중지
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    <Switch />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="20px 0"
              >
                기본 정보
              </Wrapper>
              <Wrapper width="85%" ju="start" al="start">
                <Text margin="20px 0 0" fontWeight="500">
                  쿠폰명
                </Text>
                <Input
                  placeholder="쿠폰명을 입력해 주세요."
                  style={{ marginTop: "5px", width: "50%" }}
                />
                <Wrapper dr="row" ju="space-between" al="end" width="50%">
                  <Wrapper width="69%" al="start">
                    <Text margin="20px 0 0" fontWeight="500">
                      쿠폰 혜택
                    </Text>
                    <Input
                      placeholder="쿠폰 혜택을 입력해 주세요. (숫자만 입력)"
                      style={{ marginTop: "5px", width: "100%" }}
                      type="number"
                    />
                  </Wrapper>
                  <Wrapper width="29%" al="start">
                    <Select
                      defaultValue={"%"}
                      options={[
                        { label: "%", value: "%" },
                        { label: "원", value: "원" },
                      ]}
                      style={{ marginTop: "5px", width: "100%" }}
                    />
                  </Wrapper>
                </Wrapper>
                <Text margin="20px 0 0" fontWeight="500">
                  발급 유형
                </Text>
                <Select
                  defaultValue={"직접 발급"}
                  options={[
                    { label: "직접 발급", value: "직접 발급" },
                    { label: "회원가입 즉시", value: "회원가입 즉시" },
                    { label: "첫 결제 회원", value: "첫 결제 회원" },
                    { label: "첫 구독 회원", value: "첫 구독 회원" },
                  ]}
                  style={{ marginTop: "5px", width: "50%" }}
                />
                <Text margin="20px 0 0" fontWeight="500">
                  {`유효기간 (발급 후 -일간 유효한지 설정)`}
                </Text>
                <Input
                  placeholder="유효기간을 입력해 주세요. (숫자만 입력)"
                  type="number"
                  style={{ marginTop: "5px", width: "50%" }}
                  suffix="원"
                />
              </Wrapper>
              <Wrapper
                width="15%"
                al="start"
                ju="start"
                fontSize="18px"
                fontWeight="500"
                padding="20px 0"
              >
                사용 조건
              </Wrapper>
              <Wrapper width="85%" ju="start" al="start">
                <Text margin="20px 0 0" fontWeight="500">
                  최소 결제 금액
                </Text>
                <Input
                  placeholder="최소 결제 금액을 입력해 주세요. (숫자만 입력)"
                  type="number"
                  style={{ marginTop: "5px", width: "50%" }}
                  suffix="원"
                />
                <Text margin="20px 0 0" fontWeight="500">
                  최대 할인 금액
                </Text>
                <Input
                  placeholder="최대 할인 금액을 입력해 주세요. (숫자만 입력)"
                  type="number"
                  style={{ marginTop: "5px", width: "50%" }}
                  suffix="원"
                />
              </Wrapper>
            </Wrapper>
          </Drawer>

          {/* 쿠폰 만들기 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`쿠폰 관리 > 쿠폰 만들기`}</Text>
            }
            onClose={drawerOpenHandler}
            open={drawerOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                기본 정보
              </Text>
              <Text margin="20px 0 0" fontWeight="500">
                쿠폰명
              </Text>
              <Input
                placeholder="쿠폰명을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Wrapper dr="row" ju="space-between" al="end" width="100%">
                <Wrapper width="69%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    쿠폰 혜택
                  </Text>
                  <Input
                    placeholder="쿠폰 혜택을 입력해 주세요. (숫자만 입력)"
                    style={{ marginTop: "5px", width: "100%" }}
                    type="number"
                  />
                </Wrapper>
                <Wrapper width="30%" al="start">
                  <Select
                    defaultValue={"%"}
                    options={[
                      { label: "%", value: "%" },
                      { label: "원", value: "원" },
                    ]}
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
              </Wrapper>
              <Text margin="20px 0 0" fontWeight="500">
                발급 유형
              </Text>
              <Select
                defaultValue={"직접 발급"}
                options={[
                  { label: "직접 발급", value: "직접 발급" },
                  { label: "회원가입 즉시", value: "회원가입 즉시" },
                  { label: "첫 결제 회원", value: "첫 결제 회원" },
                  { label: "첫 구독 회원", value: "첫 구독 회원" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                {`유효기간 (발급 후 -일간 유효한지 설정)`}
              </Text>
              <Input
                placeholder="유효기간을 입력해 주세요. (숫자만 입력)"
                type="number"
                style={{ marginTop: "5px", width: "100%" }}
                suffix="원"
              />
              <Text fontSize="18px" fontWeight="500" margin="40px 0 0">
                사용 조건
              </Text>
              <Text margin="20px 0 0" fontWeight="500">
                최소 결제 금액
              </Text>
              <Input
                placeholder="최소 결제 금액을 입력해 주세요. (숫자만 입력)"
                type="number"
                style={{ marginTop: "5px", width: "100%" }}
                suffix="원"
              />
              <Text margin="20px 0 0" fontWeight="500">
                최대 할인 금액
              </Text>
              <Input
                placeholder="최대 할인 금액을 입력해 주세요. (숫자만 입력)"
                type="number"
                style={{ marginTop: "5px", width: "100%" }}
                suffix="원"
              />

              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
                onClick={null}
              >
                쿠폰 만들기
              </Button>
            </Wrapper>
          </Drawer>
        </Wrapper>
      }
    />
  );
};

export default Coupon;
