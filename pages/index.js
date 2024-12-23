import Theme from "@/components/Theme";
import { CommonButton, Wrapper } from "@/components/commomComponents";
import useInput from "@/hooks/useInput";
import wrapper from "@/store/store";
import { Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { END } from "redux-saga";
import styled from "styled-components";

const InputStyle = styled(Input)`
  width: 250px;
  height: 50px;
  margin-top: 15px;
  font-size: 16px;

  &:hover {
    border-color: ${(props) => props.theme.basicTheme_C} !important;
  }

  &:focus {
    border-color: ${(props) => props.theme.basicTheme_C} !important;
    box-shadow: 0 0 0 2px rgba(19, 17, 17, 0.05) !important;
  }
`;

const Login = () => {
  //////? HOOK //////
  const router = useRouter();
  const id = useInput("");
  const password = useInput("");

  //////? USEEFFECT //////

  //////? HANDLER //////
  const loginHandler = useCallback(() => {
    if (id.value === "admin" && password.value === "admin123") {
      localStorage.setItem("meemong_admin_login", "true");
      moveLinkHandler("/dashboard");
    } else {
      message.error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  }, [id.value, password.value]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <Wrapper width="100vw" height="100vh" bgColor={Theme.white_C}>
      <Wrapper fontSize="60px" fontWeight="bold" color={Theme.basicTheme_C}>
        미몽
      </Wrapper>
      <Wrapper color={Theme.grey2_C} fontSize="20px" margin="5px 0 20px 0">
        미몽 관리자 페이지입니다.
      </Wrapper>
      <InputStyle placeholder="아이디" {...id} />
      <InputStyle placeholder="비밀번호" type="password" {...password} />
      <CommonButton
        margin="15px 0 0 0"
        width="250px"
        height="50px"
        type="primary"
        fontSize="16px"
        onClick={loginHandler}
      >
        로그인
      </CommonButton>
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await store.sagaTask.toPromise();
  }
);

export default Login;
