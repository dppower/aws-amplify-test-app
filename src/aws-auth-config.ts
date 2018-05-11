import { AuthOptions } from "aws-amplify/lib/Auth/types";
import { StorageOptions } from "aws-amplify/lib/Storage/types";

export default {
    Auth: (<AuthOptions>{
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: "us-east-2:49be39be-102b-454d-828d-6a33c077a90e",
        // REQUIRED - Amazon Cognito Region
        region: "us-east-2",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "us-east-2_FVBtBPEDZ",
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: "4ll81btv44f1fuprjd65p3rg0q",
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true
    }),
    Storage: (<StorageOptions>{
        bucket: "qr-code-app",
        region: "us-east-2",
        level: "protected"
    })
}