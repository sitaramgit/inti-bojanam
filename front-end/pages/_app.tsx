import { EmotionCache } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextPageContext } from 'next';
import type { AppProps, AppType } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProtectedRouts from '../components/ProtectedRouts';

type MyAppProps = AppProps & {
  Component: AppType & {
    getInitialProps?: (ctx: NextPageContext) => any;
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleOAuthProvider clientId='905840306296-efb2tdlchip2jmcdq4s2jv1323tkh2ak.apps.googleusercontent.com'>
      <Provider store={store}>
        <ProtectedRouts>
          <Component {...pageProps} />
        </ProtectedRouts>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default MyApp;