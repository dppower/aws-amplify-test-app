import { AuthOptions } from "aws-amplify/lib/Auth/types";

export default {
    Auth: (<AuthOptions>{
        // REQUIRED - Amazon Cognito Identity Pool ID
        //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_9Eav2mU8U',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: "76tabht1fo5efncngffsur99nj",
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
        // OPTIONAL - Configuration for cookie storage
        cookieStorage: {
            // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: "localhost",
            // OPTIONAL - Cookie path
            path: '/',
            // OPTIONAL - Cookie expiration in days
            expires: 7,
            // OPTIONAL - Cookie secure flag
            secure: true
        }
    })
}