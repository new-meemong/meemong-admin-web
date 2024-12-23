import React from "react";
import wrapper from "@/store/store";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import Theme from "@/components/Theme";
import Head from "next/head";
import GlobalStyles from "@/components/GlobalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Head>
        <title>Meemong</title>

        <link rel="icon" href="/favicon.ico" />
        {/* font */}
        <link
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
