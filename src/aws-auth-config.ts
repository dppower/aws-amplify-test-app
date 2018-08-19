import { AuthOptions } from "@aws-amplify/auth/lib/types";
import { StorageOptions } from "@aws-amplify/storage/lib/types";

export default {
    Auth: (<AuthOptions>{
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: "us-east-2:d02d0d16-cd87-41be-8c93-3c8902279f91",
        // REQUIRED - Amazon Cognito Region
        region: "us-east-2",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "us-east-2_MDfWojA59",
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: "2m9elbr476rtqnsiinmet951i7",
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true
    }),
    Storage: (<StorageOptions>{
        bucket: "qr-code-app",
        region: "us-east-2",
        level: "protected"
    })
}