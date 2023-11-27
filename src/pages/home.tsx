import withAuth from "@/components/auth/withAuth"
import { Logout } from "@/components/Logout"

const HomePage: React.FC = () => {
    return (
        <main>
            Hello this is home Page.
            <Logout />
        </main>
    )
}

export default withAuth(HomePage)