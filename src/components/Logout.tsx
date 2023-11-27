import { useRouter } from "next/router"
import Cookies from "js-cookie";

export const Logout: React.FC = () => {
    const router = useRouter()

    const handleLogout = () => {
       Cookies.remove("accessToken")

        router.push('/signin')
    }

    return (
        <button className="bg-black text-white" onClick={handleLogout}>
            Logout
        </button>
    )
}