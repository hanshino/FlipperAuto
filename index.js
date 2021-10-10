// 這個檔案將會把自動精靈的相關設定打包成一個檔案
// 並且將檔案放在自動精靈的目錄中
// 並且將檔案的名稱設定為自動精靈的名稱

const fs = require("fs");

// 讀取 ./介面宣告 下的所有檔案
const UIfiles = fs.readdirSync("./介面宣告");

// 讀取 ./腳本內容 下的所有檔案
const scriptFiles = fs.readdirSync("./腳本內容");

// 讀取 ./變數宣告 下的所有檔案
const variableFiles = fs.readdirSync("./變數宣告");

// 逐筆讀取 variableFiles
variableFiles.forEach((variableFile) => {
  // 腳本內容必須要有相同檔名的檔案，才執行後續動作
  if (!scriptFiles.includes(variableFile)) return;

  const lines = [];
  // 將內容讀取出來 並且minify存進 lines
  let variableContent = fs.readFileSync(`./變數宣告/${variableFile}`, "utf8");
  lines.push(JSON.stringify(JSON.parse(variableContent)));

  // 如果在介面宣告下有相同的檔案名稱
  // 也將內容存進 lines
  if (UIfiles.includes(variableFile)) {
    let UIcontent = fs.readFileSync(`./介面宣告/${variableFile}`, "utf8");
    lines.push(JSON.stringify(JSON.parse(UIcontent)));
  }

  // 將 ./腳本內容 下的檔案內容讀取出來
  // 並且將內容存進 lines
  let scriptContent = fs.readFileSync(`./腳本內容/${variableFile}`, "utf8");
  lines.push(JSON.stringify(JSON.parse(scriptContent)));

  // 將 lines 存進一個 ./腳本 內，副檔名為 .zjs
  fs.writeFileSync(
    `./腳本/${variableFile.replace(".json", "")}.zjs`,
    lines.join("\n"),
    "utf8"
  );
});
