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
import { Button, Input, Modal, Switch, Tabs } from "antd";
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
    width: 25%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 16px;
  }
`;

const Etc = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [tagModal, setTagModal] = useState(false);

  const tag = useInput("");

  //////* HANDLER //////
  const tagModalHandler = useCallback(
    (data) => {
      if (data) {
        tag.setValue(data);
        setTagModal((prev) => !prev);
      } else {
        tag.setValue("");
        setTagModal((prev) => !prev);
      }
    },
    [tagModal, tag.value]
  );

  const onTabChange = useCallback(
    (key) => {
      setActiveTabKey(key);
    },
    [activeTabKey]
  );

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "NOTICE",
      icon: <ExclamationCircleFilled />,
      content: "정말 태그를 삭제하시겠어요?",
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

  const etcData = [
    {
      id: 1,
      tagName: "염색했어요",
      count: "213",
      createdAt: "2023-12-13",
    },
  ];

  //////* DATAVIEW //////

  const etcColumns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: "center",
    },
    {
      title: "태그명",
      dataIndex: "tagName",
    },
    {
      title: "count",
      dataIndex: "count",
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
              onClick={() => tagModalHandler(data.tagName)}
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
          <Text fontSize="25px" fontWeight="bold">
            기타 관리
          </Text>

          <TabsStyle
            style={{ width: "100%", margin: "40px 0 0 0" }}
            defaultActiveKey="1"
            centered
            items={[
              { label: "모발 상태 태그", key: "1" },
              { label: "모델 스타일 태그", key: "2" },
              { label: "원하는 시술 태그", key: "3" },
              { label: "머리 길이 태그", key: "4" },
            ]}
            onChange={onTabChange}
          />
          <Wrapper dr="row" ju="space-between" margin="5px 0 0">
            <Wrapper dr="row" width="auto">
              <Text fontWeight="bold">모발 상태 태그</Text>
              <Text margin="0 0 0 20px" color={Theme.grey3_C}>
                1 개
              </Text>
            </Wrapper>
            <Button
              type="primary"
              style={{ width: "150px" }}
              onClick={() => tagModalHandler(null)}
            >
              태그 생성
            </Button>
          </Wrapper>

          <CenteredPaginationTable
            rowKey="id"
            columns={etcColumns}
            dataSource={etcData ? etcData : []}
            size="small"
            style={{ width: "100%", margin: "20px 0 0 0" }}
          />

          {/* 태그 모달 */}
          <Modal
            open={tagModal}
            onCancel={() => tagModalHandler(null)}
            footer={null}
            width={`350px`}
          >
            <Wrapper al="start">
              <Wrapper>
                <Text fontSize="25px" fontWeight="bold">
                  {tag.value ? `태그 수정` : `태그 생성`}
                </Text>
              </Wrapper>

              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">태그명</Text>
              </Wrapper>
              <Input
                placeholder="태그명을 입력해 주세요."
                style={{ width: "100%", marginTop: "0" }}
                {...tag}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                {tag.value ? `수정 완료` : `생성`}
              </Button>
            </Wrapper>
          </Modal>
        </Wrapper>
      }
    />
  );
};

export default Etc;
