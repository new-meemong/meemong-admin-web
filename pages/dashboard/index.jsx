import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import { Text, Wrapper } from "@/components/commomComponents";
import { USER_COUNT_REQUEST } from "@/reducers/dashboard";
import wrapper from "@/store/store";
import { AndroidFilled, AppleFilled, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

const Banner = () => {
  const { userCount } = useSelector((state) => state.dashboard);

  const [totalUCount, setTotalUCount] = useState(0);
  const [totalDCount, setTotalDCount] = useState(0);
  const [totalMCount, setTotalMCount] = useState(0);

  useEffect(() => {
    if (userCount) {
      setTotalUCount(userCount.designerCount + userCount.modelCount);
      setTotalDCount(userCount.designerCount);
      setTotalMCount(userCount.modelCount);
    }
  }, [userCount]);
  //////* DATAVIEW //////

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Text fontSize="25px" fontWeight="bold">
            대시보드
          </Text>
          <Wrapper margin="50px 0 0" dr="row" ju="start">
            <Wrapper
              width="200px"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="space-between">
                <Text>가입자 수</Text>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <Text>오늘</Text>,
                      },
                      {
                        key: "2",
                        label: <Text>이번주</Text>,
                      },
                      {
                        key: "3",
                        label: <Text>이번달</Text>,
                      },
                      {
                        key: "4",
                        label: <Text>기간 설정</Text>,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <MoreOutlined />
                </Dropdown>
              </Wrapper>
              <Wrapper margin="60px 0 0">
                <Text fontWeight="bold" color={Theme.basicTheme_C}>
                  {`${totalUCount} 명`}
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper
              margin="0 0 0 30px"
              width="800px"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="space-between">
                <Wrapper width="auto" dr="row">
                  <Text>가입자 통계</Text>
                  <Select
                    defaultValue="전체"
                    style={{ width: 130, margin: "0 0 0 15px" }}
                    options={[{ value: "전체", label: "전체" }]}
                    size="small"
                  />
                </Wrapper>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <Text>오늘</Text>,
                      },
                      {
                        key: "2",
                        label: <Text>이번주</Text>,
                      },
                      {
                        key: "3",
                        label: <Text>이번달</Text>,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <MoreOutlined />
                </Dropdown>
              </Wrapper>
              <Wrapper margin="50px 0 0" dr="row" ju="space-around">
                <Wrapper width="auto">
                  <Text>디자이너</Text>
                  <Text margin="5px 0 0" fontWeight="bold">
                    {`${((totalDCount / totalUCount) * 100).toFixed(2)}%`}
                  </Text>
                </Wrapper>
                <Wrapper width="auto">
                  <Text>모델</Text>
                  <Text margin="5px 0 0" fontWeight="bold">
                    {`${((totalMCount / totalUCount) * 100).toFixed(2)}%`}
                  </Text>
                </Wrapper>
                <Wrapper width="auto">
                  <Text>계약한 디자이너</Text>
                  <Text margin="5px 0 0" fontWeight="bold">
                    0.00%
                  </Text>
                </Wrapper>
                <Wrapper width="auto">
                  <Text>계약한 모델</Text>
                  <Text margin="5px 0 0" fontWeight="bold">
                    0.00%
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper margin="30px 0 0" dr="row" ju="start">
            <Wrapper
              margin="0 30px 0 0"
              width="800px"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="space-between">
                <Wrapper width="auto" dr="row">
                  <Text>가입자 통계</Text>
                  <Select
                    defaultValue="전체"
                    style={{ width: 130, margin: "0 0 0 15px" }}
                    options={[
                      { value: "전체", label: "전체" },
                      { value: "모델", label: "모델" },
                      { value: "디자이너", label: "디자이너" },
                    ]}
                    size="small"
                  />
                </Wrapper>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <Text>오늘</Text>,
                      },
                      {
                        key: "2",
                        label: <Text>이번주</Text>,
                      },
                      {
                        key: "3",
                        label: <Text>이번달</Text>,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <MoreOutlined />
                </Dropdown>
              </Wrapper>
              <Wrapper margin="20px 0 0" dr="row" ju="space-around">
                <Wrapper width="100px" al="start">
                  <Text>Basic 유저</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 명
                  </Text>
                </Wrapper>
                <Wrapper width="100px" al="start">
                  <Text>Standard 유저</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 명
                  </Text>
                </Wrapper>
                <Wrapper width="100px" al="start">
                  <Text>Best 유저</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 명
                  </Text>
                </Wrapper>
                <Wrapper width="100px" al="start">
                  <Text>몽 구매 유저</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 명
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper margin="20px 0 0" dr="row" ju="space-around">
                <Wrapper width="100px" al="start">
                  <Text>Basic</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 원
                  </Text>
                </Wrapper>
                <Wrapper width="100px" al="start">
                  <Text>Standard</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 원
                  </Text>
                </Wrapper>
                <Wrapper width="100px" al="start">
                  <Text>Best</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 원
                  </Text>
                </Wrapper>
                <Wrapper width="100px" al="start">
                  <Text>몽</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0 원
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width="200px"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="space-between">
                <Text>계약 수</Text>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <Text>오늘</Text>,
                      },
                      {
                        key: "2",
                        label: <Text>이번주</Text>,
                      },
                      {
                        key: "3",
                        label: <Text>이번달</Text>,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <MoreOutlined />
                </Dropdown>
              </Wrapper>
              <Wrapper margin="60px 0 0">
                <Text fontWeight="bold" color={Theme.basicTheme_C}>
                  0 건
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper margin="30px 0 0" dr="row" ju="start">
            <Wrapper
              margin="0 30px 0 0"
              width="calc(970px / 3)"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="space-between">
                <Wrapper width="auto" dr="row">
                  <Text>접속자 수</Text>
                  <Select
                    defaultValue="전체"
                    style={{ width: 130, margin: "0 0 0 15px" }}
                    options={[{ value: "전체", label: "전체" }]}
                    size="small"
                  />
                </Wrapper>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <Text>오늘</Text>,
                      },
                      {
                        key: "2",
                        label: <Text>이번주</Text>,
                      },
                      {
                        key: "3",
                        label: <Text>이번달</Text>,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <MoreOutlined />
                </Dropdown>
              </Wrapper>
              <Wrapper margin="60px 0 0">
                <Text fontWeight="bold" color={Theme.basicTheme_C}>
                  0 명
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper
              margin="0 30px 0 0"
              width="calc(970px / 3)"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="space-between">
                <Text>채팅</Text>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <Text>오늘</Text>,
                      },
                      {
                        key: "2",
                        label: <Text>이번주</Text>,
                      },
                      {
                        key: "3",
                        label: <Text>이번달</Text>,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <MoreOutlined />
                </Dropdown>
              </Wrapper>
              <Wrapper margin="50px 0 0" dr="row" ju="space-around">
                <Wrapper width="auto" al="start">
                  <Text>신규채팅방</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0
                  </Text>
                </Wrapper>

                <Wrapper width="auto" al="start">
                  <Text>활성채팅방</Text>
                  <Text
                    margin="5px 0 0"
                    fontWeight="bold"
                    color={Theme.basicTheme_C}
                  >
                    0
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width="calc(970px / 3)"
              height="200px"
              shadow="0px 4px 7px rgba(0, 0, 0, 0.2)"
              ju="start"
              padding="15px"
              boxSizing="border-box"
            >
              <Wrapper dr="row" ju="start">
                <Text>OS</Text>
              </Wrapper>
              <Wrapper margin="50px 0 0" dr="row" ju="space-around">
                <Wrapper width="auto" dr="row">
                  <AndroidFilled
                    style={{
                      fontSize: "50px",
                      marginRight: "10px",
                      color: Theme.basicTheme_C,
                    }}
                  />
                  <Wrapper width="auto" al="start">
                    <Text>AOS</Text>
                    <Text margin="5px 0 0" fontWeight="bold">
                      0 %
                    </Text>
                  </Wrapper>
                </Wrapper>

                <Wrapper width="auto" dr="row">
                  <AppleFilled
                    style={{
                      fontSize: "50px",
                      marginRight: "10px",
                      color: Theme.basicTheme_C,
                    }}
                  />
                  <Wrapper width="auto" al="start">
                    <Text>IOS</Text>
                    <Text margin="5px 0 0" fontWeight="bold">
                      0 %
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
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
      type: USER_COUNT_REQUEST,
    });

    store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await store.sagaTask.toPromise();
  }
);

export default Banner;
