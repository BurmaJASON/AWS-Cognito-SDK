import { getCookie } from "@/services/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"


const withAuth = (WrappedComponent: React.FC) => {
    const WithAuth: React.FC<any> = (props) => {
        const router = useRouter()

        useEffect(() => {
          const CheckAccessToken = async () => {
            const accessToken = getCookie("accessToken");
            if (!accessToken) {
              router.push("/signin");
            }
          };
          CheckAccessToken();
        }, [router.asPath]);
        return <WrappedComponent {...props} />;
    }

    WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

    return WithAuth;
}

export default withAuth;