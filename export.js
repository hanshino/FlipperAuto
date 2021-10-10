// 將 .zjs 腳本檔案解析成 .json 檔案

// 讀取 ./腳本 下的 .zjs 檔案
const fs = require("fs");
const path = require("path");
const zjsFiles = fs
  .readdirSync("./腳本")
  .filter((file) => file.endsWith(".zjs"));

// 逐筆檔案讀取
zjsFiles.forEach((file) => {
  // 讀取檔案
  const zjsFile = fs.readFileSync(path.join("./腳本", file), "utf8");
  // 用換行來逐行分析
  const lines = zjsFile.split("\n");
  // 將第一行內容寫入 ./變數宣告 下
  writeScriptFile(
    path.join("./變數宣告", file.replace(".zjs", ".json")),
    lines[0]
  );
  // 如果有三行以上，第二行為介面宣告，第三行為腳本內容
  if (lines.length > 3) {
    // 將第二行內容寫入 ./介面宣告 下
    writeScriptFile(
      path.join("./介面宣告", file.replace(".zjs", ".json")),
      lines[1]
    );
    // 將第三行內容寫入 ./腳本內容 下
    writeScriptFile(
      path.join("./腳本內容", file.replace(".zjs", ".json")),
      lines[2]
    );
  } else {
    // 如果只有兩行，第二行必為腳本內容
    // 將第二行內容寫入 ./腳本內容 下
    writeScriptFile(
      path.join("./腳本內容", file.replace(".zjs", ".json")),
      lines[1]
    );
  }
});

/**
 * @param {string} fileName
 * @param {string} content
 * @returns {Boolean}
 */
function writeScriptFile(fileName, content) {
  try {
    // 將內容轉為`json`
    const json = JSON.parse(content);
    // 將內容寫入檔案
    fs.writeFileSync(fileName, JSON.stringify(json, null, 2) + "\n", "utf8");
    console.log(`${fileName} 寫入成功`);
    return true;
  } catch (err) {
    console.error(`${fileName} 寫入失敗`);
    return false;
  }
}
