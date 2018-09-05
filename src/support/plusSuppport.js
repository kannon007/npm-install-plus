let taskConfig = {
    saveDir: "/app/package/",    
    packageFile: "",
    tarName: ""
}

let config = require(process.cwd() + "/package.json")
let plus = function () {
    taskConfig.saveDir = taskConfig.saveDir + config.name+"/";
    taskConfig.packageFile = taskConfig.saveDir + config.name +".package.json";
    taskConfig.tarName =  taskConfig.saveDir + config.name +'.tar';
    return this;
}
const fs = require("fs")
const path = require("path")
mkdirs =  function (dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirs(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}

plus.prototype.check = function () {    
    mkdirs(taskConfig.saveDir)
    if (fs.existsSync(taskConfig.packageFile)) {
        let curcfg = require(taskConfig.packageFile)

        if (curcfg.dependencies.toString() == config.dependencies.toString()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}
plus.prototype.first_install =  function () {
    console.log("first_install")    
    let execSync = require('child_process').execSync
    execSync("npm install", {stdio: [0,2,2]})    
}
plus.prototype.first_package_gzip = async function () {
    const compressing = require('compressing');
    try {
        await compressing.tar.compressDir('node_modules',taskConfig.tarName);

        // await compressing.gzip.compressFile(saveDir+'.tar',
        // saveDir+'.tgz');     
       
        fs.copyFileSync('package.json', taskConfig.packageFile)

        console.log('first_package_gzip success');
    } catch (err) {
        console.error(err);
    }
}

plus.prototype.already_unzip = async function () {
    const compressing = require('compressing');
    // 解压缩
    try {
        // await compressing.gzip.uncompress(saveDir+'.tgz',
        // saveDir+'.tar');
        await compressing.tar.uncompress(taskConfig.tarName,'');

        console.log('already_unzip success');
    } catch (err) {
        console.error(err);
    }
}

module.exports = plus