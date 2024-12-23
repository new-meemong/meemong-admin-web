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
import { Button, DatePicker, Drawer, Input, Modal, Select, Switch } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

const { RangePicker } = DatePicker;

const SmallGathering = () => {
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [createdrawerOpen, setCreateDrawerOpen] = useState(false);

  const category = useInput("");

  //////* HANDLER //////
  const categoryModalHandler = useCallback(
    (data) => {
      if (data) {
        category.setValue(data);
        setCategoryModal((prev) => !prev);
      } else {
        category.setValue("");
        setCategoryModal((prev) => !prev);
      }
    },
    [categoryModal, category.value]
  );

  const createDrawerOpenHandler = useCallback(() => {
    setCreateDrawerOpen((prev) => !prev);
  }, [createdrawerOpen]);

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
      categoryName: "족구",
      contentAmount: "2",
      createdAt: "2023-12-13",
    },
  ];
  const data = [
    {
      id: 1,
      category: "족구",
      title: "신년 맞이 족구 모임 하입시더",
      cost: "30,000원",
      personnel: "22",
      views: "435",
      name: "김미몽",
      createAt: "2023-12-13",
      classAt: "2023-12-13",
    },
  ];

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
              onClick={() => categoryModalHandler(data.categoryName)}
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

  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
      width: "7%",
    },
    {
      title: "카테고리",
      dataIndex: "category",
      width: "7.5%",
    },
    {
      title: "제목",
      dataIndex: "title",
      width: "25%",
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
      title: "비용",
      dataIndex: "cost",
      ellipsis: true,
      width: "10%",
    },
    {
      title: "모집인원",
      dataIndex: "personnel",
      ellipsis: true,
      width: "7.5%",
    },
    {
      title: "조회수",
      dataIndex: "views",
      ellipsis: true,
      width: "7.5%",
    },
    {
      title: "작성자",
      dataIndex: "name",
      width: "7.5%",
    },
    {
      title: "모임일시",
      dataIndex: "classAt",
      width: "10%",
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

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              소모임 관리
            </Text>
            <Button
              type="primary"
              style={{ width: "150px", margin: "0 10px 0 0" }}
              size="large"
              onClick={createDrawerOpenHandler}
            >
              소모임 만들기
            </Button>
          </Wrapper>
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
                <Text fontSize="12px">카테고리</Text>
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
                onClick={() => categoryModalHandler(null)}
              >
                카테고리 생성
              </Button>
            </Wrapper>

            <CenteredPaginationTable
              rowKey="id"
              columns={categoryColumns}
              dataSource={categoryData ? categoryData : []}
              size="small"
              style={{ width: "100%", margin: "20px 0 0 0" }}
            />
            <Wrapper dr="row" ju="space-between">
              <Wrapper dr="row" width="auto">
                <Text fontWeight="bold">소모임 리스트</Text>
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
          </Wrapper>

          {/* 카테고리 생성 */}
          <Modal
            open={categoryModal}
            onCancel={() => categoryModalHandler(null)}
            footer={null}
            width={`350px`}
          >
            <Wrapper al="start">
              <Wrapper>
                <Text fontSize="25px" fontWeight="bold">
                  {category.value ? `카테고리 수정` : `카테고리 생성`}
                </Text>
              </Wrapper>

              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">카테고리명</Text>
              </Wrapper>
              <Input
                placeholder="카테고리을 입력해 주세요."
                style={{ width: "100%", marginTop: "0" }}
                {...category}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                {category.value ? `수정 완료` : `생성`}
              </Button>
            </Wrapper>
          </Modal>

          {/* 소모임 만들기 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`소모임 관리 > 소모임 만들기`}</Text>
            }
            onClose={createDrawerOpenHandler}
            open={createdrawerOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                소모임 정보 입력
              </Text>
              <Text margin="20px 0 0" fontWeight="500">
                소모임 게시글 제목
              </Text>
              <Input
                placeholder="제목을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                내용
              </Text>
              <Input.TextArea
                placeholder="내용을 입력해 주세요."
                style={{ marginTop: "5px", width: "100%", height: "150px" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                모임 일정
              </Text>
              <DatePicker
                placeholder="날짜를 선택해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />

              <Text margin="20px 0 0" fontWeight="500">
                모임비 설정
              </Text>
              <Input
                placeholder="모임비를 입력해 주세요. (숫자만 입력)"
                type="number"
                style={{ marginTop: "5px", width: "100%" }}
                suffix="원"
              />
              <Text margin="20px 0 0" fontWeight="500">
                모집 인원
              </Text>
              <Input
                placeholder="모집 인원을 입력해 주세요. (숫자만 입력)"
                type="number"
                style={{ marginTop: "5px", width: "100%" }}
                suffix="명"
              />

              <Text margin="20px 0 0" fontWeight="500">
                오픈 채팅방 링크
              </Text>
              <Input
                placeholder="오픈 채팅방 링크를 입력해 주세요."
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
              >
                소모임 만들기
              </Button>
            </Wrapper>
          </Drawer>
        </Wrapper>
      }
    />
  );
};

export default SmallGathering;
