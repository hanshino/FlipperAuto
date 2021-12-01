// 這個檔案將會把自動精靈的相關設定打包成一個檔案
// 並且將檔案放在腳本的目錄中
// 並且將檔案的名稱設定為自動精靈的名稱
// 最後會將腳本製作成 .zip

const fs = require("fs");
const archiver = require("archiver");
const zipFileName = "FlipperAuto.zip";
const output = fs.createWriteStream(zipFileName);
const archive = archiver("zip");

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed."
  );
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

// 讀取 ./腳本內容 下的所有檔案
const scriptFiles = fs
  .readdirSync("./腳本內容")
  .filter((file) => file.endsWith(".json"));

// 讀取 ./變數宣告 下的所有檔案
const variableFiles = fs
  .readdirSync("./變數宣告")
  .filter((file) => file.endsWith(".json"));

function minify(fileName) {
  try {
    let content = fs.readFileSync(fileName, "utf8");
    console.log(`${fileName} 轉換成功`);
    return JSON.stringify(JSON.parse(content));
  } catch (err) {
    console.error(`${fileName} 轉換失敗`);
    throw err; // keep throwing
  }
}

// 逐筆讀取 variableFiles
variableFiles.forEach((variableFile) => {
  // 腳本內容必須要有相同檔名的檔案，才執行後續動作
  if (!scriptFiles.includes(variableFile)) return;

  const lines = [];
  // 將內容讀取出來 並且minify存進 lines
  let variableContent = minify(`./變數宣告/${variableFile}`);
  lines.push(variableContent);

  // 將 ./腳本內容 下的相關檔案內容讀取出來
  // 並且將內容存進 lines
  scriptFiles
    .filter((scriptFile) => scriptFile.startsWith(variableFile))
    .forEach((file) => {
      let scriptContent = minify(`./腳本內容/${file}`);
      lines.push(scriptContent);
    });

  // 將 lines 存進一個 ./腳本 內，副檔名為 .zjs
  fs.writeFileSync(
    `./腳本/${variableFile.replace(".json", "")}.zjs`,
    lines.join("\n"),
    "utf8"
  );
});

archive.glob("**/*.zjs", { cwd: "./腳本" });

archive.finalize();
