import { getCredential } from "./credentialParser.js";
import { getRawSchedule as getSchedule } from "./pageWalker.js";

let credentialsPath = "../credentials.json";
let websiteUri = "https://dziekanat.ka.edu.pl/";

const credentials = getCredential(credentialsPath);
if (credentials === null) throw new Error("Credential parsed incorrectly!");

let schedule = getSchedule(credentials.login, credentials.password, websiteUri);
console.log(schedule);
