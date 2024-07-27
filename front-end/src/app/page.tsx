'use client';
import Image from "next/image";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app'

export default function Home({ Component, pageProps }: AppProps) {

  const responseMessage = (response: any) => {
    console.log(response);
};
const errorMessage = (error: any) => {
    console.log(error);
};

  return (
    <GoogleOAuthProvider clientId='905840306296-efb2tdlchip2jmcdq4s2jv1323tkh2ak.apps.googleusercontent.com'>
    <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
