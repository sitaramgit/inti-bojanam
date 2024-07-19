import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app'
 
 function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId='905840306296-efb2tdlchip2jmcdq4s2jv1323tkh2ak.apps.googleusercontent.com'>
  <Component {...pageProps} />
  </GoogleOAuthProvider>
)
}

export default MyApp;