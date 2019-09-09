const OSS = require('ali-oss');
const fs = require('fs');
const join = require('path').join;

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function(item) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push([fPath, fPath.replace(join(__dirname, '../build/'), '')]);
      }
    });
  }
  findJsonFile(jsonPath);
  return jsonFiles;
}

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI4FvzCQgpVwngNgfSdJAX',
  accessKeySecret: 'VoJtInrJczKHt5vuwMPgKMqggpjC6g',
  bucket: 'yfyld'
});

async function put(item) {
  try {
    const result = await client.put('trycatch/' + item[1], item[0], {});
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

function start() {
  const files = getJsonFiles(join(__dirname, '../build/'));
  files.forEach(item => {
    client
      .put('trycatch/' + item[1], item[0], {
        headers: {
          'Cache-Control': 'max-age=31536000',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(data => {
        client
          .putACL('trycatch/' + item[1], 'public-read')
          .then(() => {
            console.log(data.name);
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  });
}

start();
