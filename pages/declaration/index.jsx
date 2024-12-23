import AdminLayout from "@/components/AdminLayout";
import {
  CenteredPaginationTable,
  Text,
  Wrapper,
} from "@/components/commomComponents";
import { Button, Image, Input, Modal, Select } from "antd";
import { useCallback, useState } from "react";

const Declaration = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [declarationModal, setDeclarationModal] = useState(false);

  //////* HANDLER //////
  const detailModalHandler = useCallback(() => {
    setDetailModal((prev) => !prev);
  }, [detailModal]);
  const declarationModalHandler = useCallback(() => {
    setDeclarationModal((prev) => !prev);
  }, [declarationModal]);
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const data = [
    {
      id: 1,
      reporter: "김미몽",
      status: "대응완료",
      process: "노출차단",
      declarationAt: "2023-12-13",
      reactAt: "2023-12-13",
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
      title: "신고자",
      dataIndex: "reporter",
    },
    {
      title: "신고사유",
      render: (data) => {
        return (
          <Button
            style={{ width: "120px" }}
            onClick={() => detailModalHandler(data)}
          >
            상세보기
          </Button>
        );
      },
    },
    {
      title: "처리상태",
      dataIndex: "status",
    },
    {
      title: "신고일",
      dataIndex: "declarationAt",
    },
    {
      title: "대응일",
      dataIndex: "reactAt",
    },
    {
      title: "피신고자처리",
      dataIndex: "process",
    },
  ];

  return (
    <AdminLayout
      content={
        <Wrapper width="calc(100% - 60px)" padding="30px" al="start">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="25px" fontWeight="bold">
              신고 관리
            </Text>
            <Button
              type="primary"
              style={{ width: "150px", margin: "0 10px 0 0" }}
              size="large"
              onClick={() => declarationModalHandler()}
            >
              대응 완료
            </Button>
          </Wrapper>
          <Wrapper dr="row" ju="start" margin="50px 0 0 0" al="end">
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">처리 상태</Text>
              <Select
                defaultValue="전체"
                style={{ width: 130, margin: "5px 0 0 0" }}
                options={[{ value: "전체", label: "전체" }]}
              />
            </Wrapper>
            <Wrapper width="auto" al="start" margin="0 10px 10px 0">
              <Text fontSize="12px">신고자</Text>
              <Input
                style={{ width: 130, margin: "5px 0 0 0" }}
                placeholder="신고자명 입력"
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
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
          />

          {/* 신고 상세 모달 */}
          <Modal
            open={detailModal}
            onCancel={() => detailModalHandler(null)}
            footer={null}
            width={`400px`}
          >
            <Wrapper al="start">
              <Wrapper>
                <Text fontSize="25px" fontWeight="bold">
                  신고 상세
                </Text>
              </Wrapper>

              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">신고 이미지</Text>
              </Wrapper>
              <Wrapper dr="row" ju="start">
                <Image
                  src="https://source.unsplash.com/random/500x500/?human"
                  alt="신고 이미지"
                  width={`80px`}
                  height={`80px`}
                />
              </Wrapper>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">신고 내용</Text>
              </Wrapper>
              <Text>어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구</Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">피신고자</Text>
              </Wrapper>
              <Text>김미몽</Text>
              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">피신고자 처리</Text>
              </Wrapper>
              <Select
                defaultValue={"노출 차단"}
                options={[{ label: "노출 차단", value: "노출 차단" }]}
                style={{ width: "100%", marginTop: "0" }}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                대응 완료
              </Button>
            </Wrapper>
          </Modal>

          {/* 신고 대응 모달 */}
          <Modal
            open={declarationModal}
            onCancel={() => declarationModalHandler(null)}
            footer={null}
            width={`350px`}
          >
            <Wrapper al="start">
              <Wrapper>
                <Text fontSize="25px" fontWeight="bold">
                  신고 대응
                </Text>
              </Wrapper>

              <Wrapper al="start" margin="20px 0 10px">
                <Text fontWeight="bold">피신고자 처리</Text>
              </Wrapper>
              <Select
                defaultValue={"노출 차단"}
                options={[{ label: "노출 차단", value: "노출 차단" }]}
                style={{ width: "100%", marginTop: "0" }}
              />
              <Button
                type="primary"
                style={{ width: "100%", marginTop: "20px" }}
                onClick={null}
                size="large"
              >
                대응 완료
              </Button>
            </Wrapper>
          </Modal>
        </Wrapper>
      }
    />
  );
};

export default Declaration;
