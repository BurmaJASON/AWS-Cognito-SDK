import { CognitoIdentityServiceProvider } from "aws-sdk";

const region = process.env.NEXT_PUBLIC_AWS_REGION || '';
const userPoolId  = process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || '';
const clientId = process.env.NEXT_PUBLIC_AWS_APP_CLIENT_ID || '';


const cognito = new CognitoIdentityServiceProvider({region});

export const signUp = async (user: any) => {
      console.log('Signing up with user data:', user);
    const { password, email, firstname, lastname, image, roleId, companyId, departmentId } = user;


    const params = {
        ClientId : clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            {Name: 'email', Value: email},
            {Name: 'custom:first_name', Value: firstname},
            {Name: 'custom:last_name', Value: lastname},
            {Name: 'custom:image', Value: image || ''},
            {Name: 'custom:role_id', Value: roleId || ''},
            {Name: 'custom:company_id', Value: 
            companyId || ''},
            {Name: 'custom:department_id', Value: departmentId || ''},
        ],
    };

    try {
        const data  = await cognito.signUp(params).promise();
        return data;
    } catch (error) {
      console.error('Error signing up:', error);
      console.error('Full error object:', error);
      throw error;
    }
};

export const signIn = async (email: string , password: string) => {
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    }
    try {
        const data = await cognito.initiateAuth(params).promise();
        return data;
    }catch (error) {
        console.error('Error signing in:', error)
        throw error;
    }
}

export const confirmSignUp = async (email : string, confirmationCode : string) => {
    const params ={
        ClientId : clientId,
        Username: email,
        ConfirmationCode: confirmationCode
    }

    try{
        const data = await cognito.confirmSignUp(params).promise();
        return data;
    }catch(error) {
        console.error("Error confirming sign up:", error);
        throw error;
    } 
}

export const confirmSignIn = async (email : string, mfaCode : string) => {
  const params = {
    AuthFlow: "CUSTOM_AUTH", // Use CUSTOM_AUTH for MFA confirmation
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      SECRET_HASH: "your-secret-hash", // If you're using a secret hash
      ANSWER: mfaCode, // Use ANSWER for MFA code
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    return data;
  } catch (error) {
    console.error("Error confirming sign-in:", error);
    throw error;
  }
};