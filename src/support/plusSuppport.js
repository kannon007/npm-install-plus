let saveDir = "/app/package/"
let config = require(process.cwd()+"/package.json")
let plus = function () {    
    saveDir = saveDir+config.name
    return this;
}



plus.prototype.check =  function () {
    const fs = require("fs")
    if (fs.existsSync( saveDir+'.tgz')) {
        let curcfg = require(saveDir+".package.json")
               
        if (curcfg.dependencies.toString() == config.dependencies.toString()) {
            return true;
        }else {
            return false;
        }
    } else {
        return false;
    }
   
}
plus.prototype.first_install = async function () {
    console.log("first_install")
    const { spawn } = require('child_process');
    
    let spawnObj = spawn(process.platform === 'win32' ? 'npm.cmd' : "npm",['install']);
    var iconv = require('iconv-lite');
    return new Promise(function(r,e){
        spawnObj.stdout.on("data",(data) => {
            r(iconv.decode(data,'utf-8'));
         });
        
        spawnObj.stderr.on('err',(err) => {
            console.log(err);
        });
        
        spawnObj.on('exit',(code) => {
            console.log(`exit code is ${code}`);
        });
    })
 }
plus.prototype.first_package_gzip = async function () {
    const compressing = require('compressing');
    try {
        await compressing.tar.compressDir('node_modules',
        saveDir+'.tar');
       
        // await compressing.gzip.compressFile(saveDir+'.tar',
        // saveDir+'.tgz');     
        const fsPromises = require('fs').promises;
        fsPromises.copyFile('package.json', saveDir+'.package.json')  
       
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
        await compressing.tar.uncompress(saveDir+'.tar',
            '');
      
        console.log('already_unzip success');
    } catch (err) {
        console.error(err);
    }
}

module.exports = plus