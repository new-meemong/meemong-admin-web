import React, { useEffect } from "react";
import {
  AlertOutlined,
  BellOutlined,
  CommentOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  FolderOutlined,
  FormOutlined,
  PicLeftOutlined,
  PictureOutlined,
  ProductOutlined,
  ProfileOutlined,
  SolutionOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { useRouter } from "next/router";
import { Wrapper } from "./commomComponents";

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}
const items = [
  getItem("대시보드", "/dashboard", <DashboardOutlined />),
  getItem("회원 관리", "/user", <UserOutlined />),
  getItem("결제 관리", "/payment", <CreditCardOutlined />),
  getItem("상품 관리", "/product", <ProductOutlined />),
  getItem("계약 관리", "/contract", <FormOutlined />),
  getItem("푸쉬 관리", "/push", <BellOutlined />),
  getItem("게시판 관리", "/notice", <ProfileOutlined />),
  getItem("채팅 관리", "/chatting", <CommentOutlined />),
  getItem("쿠폰 관리", "/coupon", <TagsOutlined />),
  getItem("배너 관리", "/banner", <PicLeftOutlined />),
  getItem("신고 관리", "/declaration", <AlertOutlined />),
  getItem("사진 관리", "/picture", <PictureOutlined />),
  getItem("리뷰 관리", "/review", <SolutionOutlined />),
  getItem("소모임 관리", "/smallGathering", <TeamOutlined />),
  getItem("기타 관리", "/etc", <FolderOutlined />),
];

const AdminLayout = ({ content }) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("meemong_admin_login");
    if (!isLoggedIn) {
      router.push("/");
      message.info("로그인이 필요합니다.");
    }
  }, []);

  const onMenuClick = (item) => {
    router.push(item.key);
  };

  const selectedKey =
    items.find((item) => item.key === router.pathname)?.key || "/admin";

  return (
    <Wrapper dr="row" ju="start" height="100vh">
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        onClick={onMenuClick}
        style={{
          width: "180px",
          height: "100vh",
        }}
      />
      <Wrapper width="calc(100vw - 195px)" height="100vh" ju="start" al="start">
        {content}
      </Wrapper>
    </Wrapper>
  );
};
export default AdminLayout;
