import { signIn, confirmSignIn } from "@/services/cognito";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [accessToken, setAccessToken] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [isMfaSetup, setIsMfaSetup] = useState(false);

  // Function to set a cookie
// function setCookie(name: string, value: string, days: number): void {
//   const expires = new Date(
//     Date.now() + days * 24 * 60 * 60 * 1000
//   ).toUTCString();
//   document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; HttpOnly;`;
// }


  // Function to handle the sign-in process
  const handleSignIn = async () => {
    try {
      const data = await signIn(email, password);

      if (data.ChallengeName === "MFA_SETUP") {
        console.log("here is MFA setup");
        
        // MFA setup is required
        setIsMfaSetup(true);
      } else {
        console.log("no mfa needed");

        // No MFA setup required, proceed with regular sign-in
        const authToken = data.AuthenticationResult?.AccessToken;
        console.log("authToken:", authToken);

        if (authToken) {

          // setCookie("accessToken", authToken, 1);
          Cookies.set('accessToken', authToken, { expires: 7 })

          console.log("accessToken cookies :", Cookies.get('accessToken'));
        }
        router.push("/home");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Function to handle MFA code submission
  const handleMfaSubmit = async () => {
    try {
      const data = await confirmSignIn(email, mfaCode);
      const authToken = data.AuthenticationResult?.AccessToken;
      if (authToken) {
        // setAccessToken(authToken);
        // setCookie("accessToken", authToken, 1);
        Cookies.set("accessToken", authToken, { expires: 7 });

      }

      router.push("/home");
    } catch (error) {
      console.error("Error confirming sign in:", error);
    }
  };

  // useEffect to handle MFA setup completion
  useEffect(() => {
    const handleMfaSetup = async () => {
      try {
        const data = await confirmSignIn(email,mfaCode);
        console.log('data from useEffect confirmSignIn: ',data);
        
        setIsMfaSetup(false);
      } catch (error) {
        console.error("Error setting up MFA:", error);
      }
    };

    if (isMfaSetup) {
      handleMfaSetup();
    }
  }, [mfaCode, isMfaSetup, email]);

  return (
    <div>
      <h2>Sign In</h2>
      {isMfaSetup ? (
        <>
          {/* MFA setup form */}
          <p>Enter the MFA code from your authenticator app:</p>
          <input
            type="text"
            placeholder="MFA Code"
            onChange={(e) => setMfaCode(e.target.value)}
          />
          <button onClick={handleMfaSubmit}>Submit MFA Code</button>
        </>
      ) : (
        <>
          {/* Regular sign-in form */}
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </>
      )}
    </div>
  );
};

export default Signin;
