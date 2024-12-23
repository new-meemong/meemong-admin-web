import AdminLayout from "@/components/AdminLayout";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Drawer,
  Input,
  Modal,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

const { RangePicker } = DatePicker;

const Push = () => {
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

  const showNowPushConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: (
        <Wrapper al="start">
          <Text>발송 유형 : 즉시 발송</Text>
          <Text>Push가 즉시 발송됩니다.</Text>
        </Wrapper>
      ),
      okText: "보내기",
      okType: "primary",
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
      message:
        "안녕하세여. 반갑습니다. 안녕히 가세요. 반갑습니다. 안녕히가세요. 안녕히가세요. 반갑습니다.",
      type: "APP Push",
      target: "디자이너",
      status: "예약전송",
      ctr: "6.64%",
      sendDate: "2023-12-13",
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
      title: "메세지",
      dataIndex: "message",
    },

    {
      title: "타입",
      dataIndex: "type",
    },
    {
      title: "타겟",
      dataIndex: "target",
    },
    {
      title: "상태",
      dataIndex: "status",
    },
    {
      title: "CTR",
      dataIndex: "ctr",
    },
    {
      title: "전송일",
      dataIndex: "sendDate",
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              푸쉬 관리
            </Text>
            <Button
              type="primary"
              style={{ width: "150px" }}
              size="large"
              onClick={drawerOpenHandler}
            >
              Push 보내기
            </Button>
          </Wrapper>
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
              <Text fontSize="12px">타입 설정</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">타겟 설정</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
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
          <CenteredPaginationTable
            rowKey="id"
            columns={columns}
            dataSource={data ? data : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 푸쉬 보내기 */}
          <Drawer
            title={
              <Text
                fontSize="20px"
                fontWeight="bold"
              >{`푸쉬 관리 > Push 보내기`}</Text>
            }
            onClose={drawerOpenHandler}
            open={drawerOpen}
            width={`500px`}
          >
            <Wrapper al="start" ju="start">
              <Text fontSize="18px" fontWeight="500">
                푸쉬 정보 입력
              </Text>
              <Text margin="20px 0 0" fontWeight="500">
                타입
              </Text>
              <Select
                defaultValue={"APP Push"}
                options={[
                  { label: "APP Push", value: "APP Push" },
                  { label: "SNS", value: "SNS" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Text margin="20px 0 0" fontWeight="500">
                타겟
              </Text>
              <Select
                defaultValue={"전체"}
                options={[
                  { label: "전체", value: "전체" },
                  { label: "디자이너", value: "디자이너" },
                  { label: "모델", value: "모델" },
                  { label: "유료 결제 회원", value: "유료 결제 회원" },
                  {
                    label: "결제 이력 있는 회원",
                    value: "결제 이력 있는 회원",
                  },
                  {
                    label: "결제 이력 없는 회원",
                    value: "결제 이력 없는 회원",
                  },
                  { label: "개인 지정", value: "개인 지정" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Wrapper dr="row" ju="space-between" al="end">
                <Wrapper width="49%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    타겟 유저 지정
                  </Text>
                  <Input
                    placeholder="이름"
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
                <Wrapper width="49%" al="start">
                  <Input
                    placeholder="휴대폰 번호"
                    type="number"
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
              </Wrapper>
              <Text margin="20px 0 0" fontWeight="500">
                발송 유형
              </Text>
              <Select
                defaultValue={"즉시 발송"}
                options={[
                  { label: "즉시 발송", value: "즉시 발송" },
                  { label: "예약 발송", value: "예약 발송" },
                ]}
                style={{ marginTop: "5px", width: "100%" }}
              />
              <Wrapper dr="row" ju="space-between" al="end">
                <Wrapper width="49%" al="start">
                  <Text margin="20px 0 0" fontWeight="500">
                    예약 발송일시 설정
                  </Text>
                  <DatePicker
                    placeholder="날짜를 선택해 주세요."
                    style={{ marginTop: "5px", width: "100%" }}
                  />
                </Wrapper>
                <Wrapper width="49%" al="start">
                  <TimePicker
                    defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                    style={{ marginTop: "5px", width: "100%" }}
                    placeholder="시간을 선택해 주세요."
                  />
                </Wrapper>
              </Wrapper>
              <Text margin="20px 0 0" fontWeight="500">
                메세지
              </Text>
              <Input.TextArea
                placeholder="메세지를 입력해 주세요."
                style={{ marginTop: "5px", width: "100%", height: "150px" }}
              />
              <Button
                type="primary"
                style={{ marginTop: "20px", width: "100%" }}
                size="large"
                onClick={showNowPushConfirm}
              >
                Push 보내기
              </Button>
            </Wrapper>
          </Drawer>
        </Wrapper>
      }
    />
  );
};

export default Push;
