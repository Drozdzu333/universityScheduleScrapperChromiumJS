import * as fs from "fs";



const getCredential = (path) => {
  let rawFileContent;
  let parsedCredentials;

  try {
    rawFileContent = fs.readFileSync(path, { encoding: "utf8", flag: "r" });
    console.log(`File ${path} has been read without errors.`);
  } catch (err) {
    console.log(`Error with file reading ${err}`);
    return null;
  }
  try {
    parsedCredentials = JSON.parse(rawFileContent);
    console.log("Credential has been parsed without errors.");
  } catch (err) {
    console.log(`Error with parsing credentials to JSON ${err}`);
    return null;
  }
  if (
    !emailIsValid(parsedCredentials.login) &&
    !passwordIsValid(parsedCredentials)
  )
    return null;
  return parsedCredentials;
};

const passwordIsValid = (password) => {
  if (!password) {
    console.log("Password is empty");
    return false;
  }
  if (password.length < 3) {
    console.log("Password is too short");
    return false;
  }
  return true;
};
const emailIsValid = (email) => {
  if (!email) {
    console.log("Email is empty.");
    return false;
  }
  email.split("@");
  if (email.length !== 2) {
    console.log("Email doesn't contain @ symbol.");
    return false;
  }
  if (email[0] > 99999 || email[0] < 10000) {
    console.log("Index is invalid.");
    return false;
  }
  if (email[1] !== "student-afm.edu.pl") {
    console.log('Email doesn\'t contain domain: "student-afm.edu.pl".');
    return false;
  }

  return true;
};

export { getCredential };
