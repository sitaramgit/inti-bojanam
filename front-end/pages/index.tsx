
import { useRouter } from "next/router";
import { useEffect } from "react";


const DefaultPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  },[]);
  
    return (
        <h1>hello</h1>
      );
};

export default DefaultPage;