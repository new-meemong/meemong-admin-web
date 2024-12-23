import AdminLayout from "@/components/AdminLayout";
import Theme from "@/components/Theme";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import useInput from "@/hooks/useInput";
import {
  BANNER_CREATE_REQUEST,
  BANNER_DELETE_REQUEST,
  BANNER_LIST_REQUEST,
  BANNER_UPDATE_REQUEST,
  IMAGE_ADD_REQUEST,
  IMAGE_DELETE_REQUEST,
  IMAGE_RESET,
} from "@/reducers/banner";
import wrapper from "@/store/store";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Image, Input, Modal, Select, message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

const Banner = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [userType, setUserType] = useState("디자이너");
  const [whereBanner, setWhereBanner] = useState("일반");
  const [detailData, setDetailData] = useState(null);
  const [detailImage, setDetailImage] = useState(null);

  const {
    banners,
    image,
    st_bannerListError,
    st_bannerListDone,
    st_bannerCreateDone,
    st_bannerUpdateDone,
    st_bannerDeleteDone,
  } = useSelector((state) => state.banner);

  const url = useInput("");
  const imageRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(banners);
  }, [banners]);

  useEffect(() => {
    console.log(image);
  }, [image]);

  useEffect(() => {
    if (st_bannerCreateDone) {
      message.success("배너가 등록되었습니다.");
      createOpenHandler();
      dispatch({
        type: BANNER_LIST_REQUEST,
      });
    }
  }, [st_bannerCreateDone]);

  useEffect(() => {
    if (st_bannerUpdateDone) {
      message.success("배너가 수정되었습니다.");
      dispatch({
        type: BANNER_LIST_REQUEST,
      });

      if (image) {
        dispatch({
          type: IMAGE_DELETE_REQUEST,
          data: {
            img_path: detailData.image_url,
          },
        });
      }

      detailOpenHandler(null);
    }
  }, [st_bannerUpdateDone]);

  useEffect(() => {
    if (st_bannerDeleteDone) {
      message.success("배너가 삭제되었습니다.");
      dispatch({
        type: BANNER_LIST_REQUEST,
      });

      if (detailData) {
        dispatch({
          type: IMAGE_DELETE_REQUEST,
          data: {
            img_path: detailData.image_url,
          },
        });

        detailOpenHandler(null);
      }
    }
  }, [st_bannerDeleteDone]);

  //////* HANDLER //////

  const detailOpenHandler = useCallback(
    (data) => {
      if (data) {
        if (data !== "close") {
          setDetailData(data);

          setUserType(data.user_type);
          setWhereBanner(data.banner_type);
          url.setValue(data.redirect_url);
          setDetailImage(data.image_url);

          setDetailOpen(true);
        } else {
          if (image) {
            dispatch({
              type: IMAGE_DELETE_REQUEST,
              data: {
                img_path: image,
              },
            });
            setUserType("전체");
            setWhereBanner("상단 배너");
            url.setValue("");
            setDetailImage(null);
            dispatch({
              type: IMAGE_RESET,
            });
            setDetailOpen(false);
          } else {
            setUserType("디자이너");
            setWhereBanner("일반");
            url.setValue("");
            setDetailImage(null);
            dispatch({
              type: IMAGE_RESET,
            });
            setDetailOpen(false);
          }
        }
      } else {
        setUserType("디자이너");
        setWhereBanner("일반");
        url.setValue("");
        setDetailImage(null);
        dispatch({
          type: IMAGE_RESET,
        });
        setDetailOpen(false);
      }
    },
    [detailOpen]
  );
  const createOpenHandler = useCallback(
    (close) => {
      setUserType("디자이너");
      setWhereBanner("일반");
      url.setValue("");

      if (close === "close" && image) {
        dispatch({
          type: IMAGE_DELETE_REQUEST,
          data: {
            img_path: image,
          },
        });
      }
      setCreateOpen((prev) => !prev);
      dispatch({
        type: IMAGE_RESET,
      });
    },
    [createOpen, image]
  );

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 배너를 삭제하시겠어요?",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        dispatch({
          type: BANNER_DELETE_REQUEST,
          data: {
            id,
          },
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const bannerCreateHandler = useCallback(() => {
    if (!image) {
      return message.info("썸네일을 등록해 주세요.");
    }
    if (url.value === "") {
      return message.info("이동경로는 필수 입력값입니다.");
    }

    dispatch({
      type: BANNER_CREATE_REQUEST,
      data: {
        user_type: userType,
        banner_type: whereBanner,
        display_type: ".",
        image_url: image,
        redirect_url: url.value,
      },
    });
  }, [userType, whereBanner, image, url.value]);

  const bannerUpdateHandler = useCallback(() => {
    if (url.value === "") {
      return message.info("이동경로는 필수 입력값입니다.");
    }
    console.log(userType);
    dispatch({
      type: BANNER_UPDATE_REQUEST,
      data: {
        id: detailData.id,
        user_type: userType,
        banner_type: whereBanner,
        display_type: ".",
        image_url: image ? image : detailImage,
        redirect_url: url.value,
      },
    });
  }, [userType, whereBanner, image, url.value, detailImage, detailData]);

  const userTypeChange = useCallback(
    (e) => {
      setUserType(e);
    },
    [userType]
  );

  const whereBannerChange = useCallback(
    (e) => {
      setWhereBanner(e);
    },
    [whereBanner]
  );

  const imageChangeHandler = useCallback(
    (e) => {
      const formData = new FormData();

      const currentFile = e.target.files[0];

      if (currentFile) {
        if (image) {
          dispatch({
            type: IMAGE_DELETE_REQUEST,
            data: {
              img_path: image,
            },
          });
        }

        [].forEach.call(e.target.files, (file) => {
          formData.append("file", file);
        });

        dispatch({
          type: IMAGE_ADD_REQUEST,
          data: formData,
        });
      } else {
        return message.error(`이미지가 등록되지 않았습니다.`);
      }
    },
    [image]
  );

  const imageUploadClick = useCallback((ref) => {
    ref.current.click();
  }, []);

  //////* DATAVIEW //////

  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
    },
    // {
    //   title: "배너명",
    //   dataIndex: "bannerName",
    //   render: (data) => {
    //     return (
    //       <Button
    //         style={{
    //           paddingLeft: "0",
    //           paddingRight: "0",
    //         }}
    //         type="link"
    //         onClick={detailOpenHandler}
    //       >
    //         {data}
    //       </Button>
    //     );
    //   },
    // },

    {
      title: "배너구분",
      dataIndex: "banner_type",
    },
    {
      title: "유저타입",
      dataIndex: "user_type",
    },

    {
      title: "썸네일",
      align: "center",
      render: (data) => {
        return (
          <Image
            src={data.image_url}
            alt={`thumbnail`}
            width={`50px`}
            height={`50px`}
          />
        );
      },
    },
    {
      title: "이동경로",
      dataIndex: "redirect_url",
      render: (data) => {
        return (
          <Button
            style={{ padding: "0" }}
            type="link"
            onClick={() => window.open(data, "_blank")}
          >
            {data}
          </Button>
        );
      },
    },
    {
      title: "등록일",
      dataIndex: "created_at",
      render: (data) => {
        const formattedDate = data.substring(0, 10);
        return <Text>{formattedDate}</Text>;
      },
    },
    {
      title: "최근 수정일",
      dataIndex: "updated_at",
      render: (data) => {
        const formattedDate = data.substring(0, 10);
        return <Text>{formattedDate}</Text>;
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
              onClick={() => detailOpenHandler(data)}
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
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              배너 관리
            </Text>
            <Wrapper dr="row" width="auto">
              <Button
                type="primary"
                style={{ width: "150px", margin: "0 10px 0 0" }}
                size="large"
                onClick={createOpenHandler}
              >
                배너 등록
              </Button>
              {/* <Button style={{ width: "150px" }} size="large">
                순서 변경
              </Button> */}
            </Wrapper>
          </Wrapper>
          <Wrapper dr="row" ju="start" margin="50px 0 0 0" al="end">
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">배너 구분</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">유저 타입</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">배너명</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="배너명 입력"
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
          {/* <Wrapper dr="row" ju="start" margin="5px 0 0">
            <Checkbox>노출중인 배너만 보기</Checkbox>
          </Wrapper> */}
          <CenteredPaginationTable
            rowKey="id"
            columns={columns}
            dataSource={banners ? banners : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 배너 상세 */}
          <Drawer
            title={
              <Wrapper dr="row" ju="space-between">
                <Text
                  fontSize="20px"
                  fontWeight="bold"
                >{`배너 관리 > 배너 상세`}</Text>
                <Wrapper width="auto" dr="row">
                  <Button
                    type="primary"
                    danger
                    style={{ marginLeft: "10px", width: "130px" }}
                    onClick={() => showDeleteConfirm(detailData.id)}
                  >
                    삭제
                  </Button>
                </Wrapper>
              </Wrapper>
            }
            onClose={() => detailOpenHandler("close")}
            open={detailOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                기본 정보
              </Text>

              <Text margin="20px 0 0" fontWeight="500">
                유저 타입
              </Text>
              <Select
                onChange={userTypeChange}
                value={userType}
                options={[
                  { label: "전체", value: "전체" },
                  { label: "디자이너", value: "디자이너" },
                  { label: "모델", value: "모델" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                배너 구분
              </Text>
              <Select
                onChange={whereBannerChange}
                value={whereBanner}
                options={[
                  { label: "일반", value: "일반" },
                  { label: "번개매칭", value: "번개매칭" },
                  { label: "구인구직", value: "구인구직" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Wrapper dr="row" margin="20px 0 0" ju="start" al="end">
                <Text fontWeight="500">썸네일</Text>
                <Text fontSize="12px" color={Theme.grey2_C} margin="0 0 0 10px">
                  {`상단배너 350*120px / 중단배너 350*120px`}
                </Text>
              </Wrapper>
              <input
                type="file"
                name="file"
                hidden
                ref={imageRef}
                accept={`.jpeg, .jpg, .png`}
                onChange={imageChangeHandler}
              />
              {image ? (
                <Wrapper
                  onClick={() => imageUploadClick(imageRef)}
                  cursor="pointer"
                  width={`350px`}
                  height={`120px`}
                  margin="5px 0 0"
                  color={Theme.white_C}
                  bgImg={`url(${image})`}
                >
                  <PlusOutlined style={{ fontSize: "40px" }} />
                  <Text margin="5px 0 0" fontWeight="500">
                    파일의 최대 크기는 10MB입니다.
                  </Text>
                </Wrapper>
              ) : detailImage ? (
                <Wrapper
                  onClick={() => imageUploadClick(imageRef)}
                  cursor="pointer"
                  width={`350px`}
                  height={`120px`}
                  margin="5px 0 0"
                  color={Theme.white_C}
                  bgImg={`url(${detailImage})`}
                >
                  <PlusOutlined style={{ fontSize: "40px" }} />
                  <Text margin="5px 0 0" fontWeight="500">
                    파일의 최대 크기는 10MB입니다.
                  </Text>
                </Wrapper>
              ) : (
                <Wrapper
                  onClick={() => imageUploadClick(imageRef)}
                  cursor="pointer"
                  width={`350px`}
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
              )}

              <Text margin="20px 0 0" fontWeight="500">
                이동 경로
              </Text>
              <Input
                placeholder="URL을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
                {...url}
              />
              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
                onClick={bannerUpdateHandler}
              >
                변경사항 저장
              </Button>
            </Wrapper>
          </Drawer>

          {/* 배너 등록 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`배너 관리 > 배너 등록`}</Text>
            }
            onClose={() => createOpenHandler("close")}
            open={createOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                기본 정보
              </Text>

              <Text margin="20px 0 0" fontWeight="500">
                유저 타입
              </Text>
              <Select
                onChange={userTypeChange}
                value={userType}
                options={[
                  { label: "디자이너", value: "디자이너" },
                  { label: "모델", value: "모델" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                배너 구분
              </Text>
              <Select
                onChange={whereBannerChange}
                value={whereBanner}
                options={[
                  { label: "일반", value: "일반" },
                  { label: "번개매칭", value: "번개매칭" },
                  { label: "구인구직", value: "구인구직" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              {/* <Wrapper dr="row" margin="20px 0 0" ju="start" al="end">
                <Text fontWeight="500">{`노출 여부`}</Text>
                <Text fontSize="12px" color={Theme.grey2_C} margin="0 0 0 10px">
                  {`on일때만 사용자 화면에 노출됩니다.`}
                </Text>
              </Wrapper> */}
              {/* <Switch style={{ marginTop: "5px" }} /> */}
              <Wrapper dr="row" margin="20px 0 0" ju="start" al="end">
                <Text fontWeight="500">썸네일</Text>
                <Text fontSize="12px" color={Theme.grey2_C} margin="0 0 0 10px">
                  {`상단배너 350*120px / 중단배너 350*120px`}
                </Text>
              </Wrapper>
              <input
                type="file"
                name="file"
                hidden
                ref={imageRef}
                accept={`.jpeg, .jpg, .png`}
                onChange={imageChangeHandler}
              />
              {image ? (
                <Wrapper
                  onClick={() => imageUploadClick(imageRef)}
                  cursor="pointer"
                  width={`350px`}
                  height={`120px`}
                  margin="5px 0 0"
                  color={Theme.white_C}
                  bgImg={`url(${image})`}
                >
                  <PlusOutlined style={{ fontSize: "40px" }} />
                  <Text margin="5px 0 0" fontWeight="500">
                    파일의 최대 크기는 10MB입니다.
                  </Text>
                </Wrapper>
              ) : (
                <Wrapper
                  onClick={() => imageUploadClick(imageRef)}
                  cursor="pointer"
                  width={`350px`}
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
              )}

              <Text margin="20px 0 0" fontWeight="500">
                이동 경로
              </Text>
              <Input
                placeholder="URL을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
                {...url}
              />
              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
                onClick={bannerCreateHandler}
              >
                배너 등록
              </Button>
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
      type: BANNER_LIST_REQUEST,
    });

    store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await store.sagaTask.toPromise();
  }
);
export default Banner;
