import { signUp } from "@/services/cognito"
import { useRouter } from "next/router"
import { useState } from "react"


const Signup = () => {

  const router = useRouter()
    const [user, setUser] = useState({
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        image: '',
        roleId: '',
        companyId: '',
        departmentId: '',
    })


    const handleSingUp = async () => {
        try {
            const data = await signUp(user);
            console.log('Signup successful:', data);
            router.push(`/confirmation?email=${user.email}`)
            router.push('/confirmation') 
        }catch (error) {
            console.error('Error signing up:', error)
        }
    }

    const handleChange = (field: string, value: string) => {
      setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    return (
      <div>
        <h2>Signup</h2>
        {/* <input
          type="text"
          placeholder="Username"
          onChange={(e) => handleChange("username", e.target.value)}
        /> */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => handleChange("firstname", e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => handleChange("lastname", e.target.value)}
        />
        <input
          type="text"
          placeholder="Image"
          onChange={(e) => handleChange("image", e.target.value)}
        />
        <input
          type="text"
          placeholder="Role ID"
          onChange={(e) => handleChange("roleId", e.target.value)}
        />
        <input
          type="text"
          placeholder="Company ID"
          onChange={(e) => handleChange("companyId", e.target.value)}
        />
        <input
          type="text"
          placeholder="Department ID"
          onChange={(e) => handleChange("departmentId", e.target.value)}
        />
        <button onClick={handleSingUp}>Sign Up</button>
      </div>
    );

}

export default Signup;