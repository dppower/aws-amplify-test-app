import { AuthOptions } from "aws-amplify/lib/Auth/types";

export default {
    Auth: (<AuthOptions>{
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: "us-east-2:eff92815-2871-4d81-89f7-0f7931077425",
        // REQUIRED - Amazon Cognito Region
        region: "us-east-2",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "us-east-2_kN6x1gbf2",
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: "129llepsshnsdgvl5fstctvra0",
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
        // OPTIONAL - Configuration for cookie storage
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: ".yourdomain.com",
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 1,
        //     // OPTIONAL - Cookie secure flag
        //     secure: true
        // }
    })
}