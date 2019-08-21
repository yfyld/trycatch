import * as fs from 'fs';
import * as path from 'path';
function getStat(path: string): Promise<fs.Stats | false> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

function mkdir(dir: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function dirExists(dir: string) {
  let isExists = await getStat(dir);
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {
    return false;
  }

  let tempDir = path.parse(dir).dir;
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

export { dirExists, getStat, mkdir };
