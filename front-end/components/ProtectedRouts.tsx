import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRouts = ({Children}: any) => {
    const router = useRouter();
    const unProtectedRoutes = ['/login', 'sign-up'];
    const isAuthenticated = true;
    const pathIsProtected = true;

    useEffect(() => {
        if(!isAuthenticated){
            unProtectedRoutes.includes(router.pathname) ? router.push(router.pathname) : router.push('/login');
        }else{
            unProtectedRoutes.includes(router.pathname) ? router.push('/dashboard') : router.push(router.pathname);
        }

    }, [isAuthenticated, pathIsProtected])
    return Children;

}
export default ProtectedRouts;