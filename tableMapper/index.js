import * as fs from "node:fs";
import config from "./planZajecOuter.html";

console.log(config);

console.log("tableMapper");

let table = fs.readFile("./planZajecOuter.html", "utf8", (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

console.log(table);
