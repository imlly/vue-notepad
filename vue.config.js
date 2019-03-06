const fs = require("fs");
const path = require("path");

const { join, resolve } = path;

function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (e) {
    return false;
  }
}

function getAlias(root) {
  const src = join(root, "src");
  const moduleAlias = {};
  fs.readdirSync(src)
    .filter(dir => isDirectory(resolve(src, dir)))
    .forEach(dir => (moduleAlias[`@${dir}`] = resolve(src, dir)));
  return moduleAlias;
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue"],
      alias: getAlias("./")
    }
  }
};
