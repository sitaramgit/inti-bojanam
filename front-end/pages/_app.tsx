import { EmotionCache } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextPageContext } from 'next';
import type { AppProps, AppType } from 'next/app'

type MyAppProps = AppProps & {
  Component: AppType & {
    getInitialProps?: (ctx: NextPageContext) => any;
  };
};

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <GoogleOAuthProvider clientId='905840306296-efb2tdlchip2jmcdq4s2jv1323tkh2ak.apps.googleusercontent.com'>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default MyApp;