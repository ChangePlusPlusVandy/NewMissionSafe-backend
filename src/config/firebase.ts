//firebase-config.ts
// Description: Imports the Firebase configurations and uses it to initialize the Firebase SDK.
// Exports auth to be used in other files.

import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json";

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const auth = getAuth(app);

export { auth };
