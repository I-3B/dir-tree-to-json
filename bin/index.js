#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function readDirectory(directoryPath) {
  const result = {};

  try {
    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          result[file] = readDirectory(filePath);
        } else {
          result[file] = humanFileSize(stats.size);
        }
      } catch {
        result[file] = "Couldn't Read!";
      }
    });
  } catch {
    result = "Couldn't Read!";
  }

  return result;
}
function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
}
function exportToJson(data, outputPath) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(outputPath, json, "utf8");
  console.log(`Data exported to ${outputPath}`);
}

const directoryPath = process.argv[2];
if (!directoryPath) {
  console.error("Please provide a directory path.");
  process.exit(1);
}

const data = readDirectory(directoryPath);
exportToJson(data, `${path.join(process.cwd(), path.parse(directoryPath).name)}.json`);
