import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import { Button, DatePicker, Drawer, Image, Input } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

const { RangePicker } = DatePicker;

const Contract = () => {
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  //////* HANDLER //////
  const drawerOpenHandler = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, [drawerOpen]);

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

  const data = [
    {
      id: 1,
      dName: "김미몽",
      image: "https://source.unsplash.com/random/500x500/?human",
      company: "미몽 헤어살롱",
      mName: "박미몽",
      ContractDate: "2023-12-12",
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
      title: "디자이너이름",
      dataIndex: "dName",

      render: (data) => {
        return (
          <Button
            style={{
              paddingLeft: "0",
              paddingRight: "0",
            }}
            type="link"
            onClick={drawerOpenHandler}
          >
            {data}
          </Button>
        );
      },
    },
    {
      title: "업체명",
      dataIndex: "company",
      render: (data) => {
        return (
          <Button
            style={{
              paddingLeft: "0",
              paddingRight: "0",
            }}
            type="link"
            onClick={drawerOpenHandler}
          >
            {data}
          </Button>
        );
      },
    },
    {
      title: "모델이름",
      dataIndex: "mName",
      render: (data) => {
        return (
          <Button
            style={{
              paddingLeft: "0",
              paddingRight: "0",
            }}
            type="link"
            onClick={drawerOpenHandler}
          >
            {data}
          </Button>
        );
      },
    },
    {
      title: "계약일시",
      dataIndex: "ContractDate",
    },
    {
      title: "초상권 이미지",
      render: (data) => {
        return (
          <Wrapper dr="row" ju="start">
            <Wrapper width="auto" margin="0 10px 0 0">
              <Image
                src={data.image}
                alt="초상권 이미지"
                width={`50px`}
                height={`50px`}
              />
            </Wrapper>
            <Wrapper width="auto" margin="0 10px 0 0">
              <Image
                src={data.image}
                alt="초상권 이미지"
                width={`50px`}
                height={`50px`}
              />
            </Wrapper>
            <Wrapper width="auto">
              <Image
                src={data.image}
                alt="초상권 이미지"
                width={`50px`}
                height={`50px`}
              />
            </Wrapper>
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
            계약 관리
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
          <Wrapper dr="row" ju="start">
            <Wrapper dr="row" width="auto">
              <Text fontWeight="bold">계약 리스트</Text>
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

          {/* 상세보기 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`계약 관리 > 계약 상세`}</Text>
            }
            onClose={drawerOpenHandler}
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
                초상권 이미지
              </Wrapper>
              <Wrapper width="85%" ju="start">
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    초상권 이미지
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
                계약 정보
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
                    디자이너 이름
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    육미몽
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
                    긴머리 짧은 머리
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    모델 이름
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    박미몽
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    계약 일시
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    2023-12-12 13:46:12
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr="row"
                  borderBottom={`1px solid ${Theme.grey5_C}`}
                  padding="10px 0"
                  al="start"
                >
                  <Wrapper width="15%" al="start" fontWeight="600">
                    서명
                  </Wrapper>
                  <Wrapper width="85%" al="start">
                    <Image
                      src="https://source.unsplash.com/random/500x500/?signature"
                      alt="서명"
                      width={`300px`}
                      height={`150px`}
                    />
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

export default Contract;
