import puppeteer from "puppeteer";

const getSchedule = (login, password, uri) => {
  return getQuotes(login, password, uri);
};
const getQuotes = async (login, password, uri) => {
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   defaultViewport: null,
  // });

  const page = await (
    await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    })
  ).newPage();

  await page.goto(uri, {
    waitUntil: "load",
  });
  var ele = await page.waitForSelector(
    'a.menu[title="Logowanie do serwisu studenta"]'
  );
  await ele.click();

  let userNameInput = await page.waitForSelector("input#username");
  await userNameInput.type(login);
  setTimeout(function () {}, 3000);
  let userPasswordInput = await page.waitForSelector("input#password");
  await userPasswordInput.type(password);
  let loginBtn = await page.waitForSelector("input#kc-login");
  await loginBtn.click();
  console.log("Login clicked and wait for idle.");
  try {
    await page.waitForNetworkIdle();
  } catch (e) {
    console.log("WaitForNetworkIdle failed.");
  }
  console.log("Logged and redirected.");

  await Promise.all([
    page.click('a.menu[title="Plany zajęć"]'),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
  console.log("Plan zajęć clicked.");

  let topRange = await page.waitForSelector("input#DataOd_I");
  topRange.click({ clickCount: 3 });
  await topRange.type("01.01.2022");

  let downRange = await page.waitForSelector("input#DataDo_I");
  downRange.click({ clickCount: 3 });
  await downRange.type("30.12.2025");
  let searchBtn = await page.waitForSelector(
    "#aspnetForm > table > tbody > tr:nth-child(2) > td:nth-child(3) > a"
  );
  await searchBtn.click("");

  try {
    await page.waitForNetworkIdle();
  } catch (e) {
    console.log("WaitForNetworkIdle failed.");
  }
  let scheduleTable = await page.waitForSelector(
    "#gridViewPlanyGrup_DXMainTable"
  );
  let tableHeader = "#gridViewPlanyGrup_DXHeadersRow0";
  console.log(scheduleTable);
  return scheduleTable;
};

export { getSchedule as getRawSchedule };
