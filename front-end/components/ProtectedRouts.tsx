import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRouts = ( {children}: any ) => {
    const router = useRouter();
    const unProtectedRoutes = ['/login', 'sign-up'];
    const isAuthenticated = useSelector((state: any) => state.login.token);
    const pathIsProtected = unProtectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        if(!isAuthenticated){
            unProtectedRoutes.includes(router.pathname) ? router.push(router.pathname) : router.push('/login');
        }else{
            unProtectedRoutes.includes(router.pathname) ? router.push('/dashboard') : router.push(router.pathname);
        }

    }, [isAuthenticated, pathIsProtected])
    return children;

}
export default ProtectedRouts;