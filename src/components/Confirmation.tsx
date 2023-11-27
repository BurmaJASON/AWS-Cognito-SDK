import { confirmSignUp } from "@/services/cognito";
import { useRouter } from "next/router";
import { useState } from "react";

const Confirmation = () => {
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState("");

  const email = router.query.email as string;

  const handleConfirmation = async () => {
    try {
      await confirmSignUp(email, confirmationCode);
      console.log("Confirmation Successful");
      router.push('/signin')
    } catch (error) {
      console.error("Error confirming sign up:", error);
    }
  };

  return (
    <div>
      <h2>Confirm sign up</h2>
      <p>Enter the confirmation code sent to your email:</p>
      <input
        type="text"
        placeholder="Confirmation code"
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button onClick={handleConfirmation}>Confirm</button>
    </div>
  );
};

export default Confirmation;
