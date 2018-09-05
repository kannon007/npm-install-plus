#!/usr/bin/env node
async  function app() {
   let plus = require( "./../support/plusSuppport")
   let curPlus = new plus()
   if (curPlus.check()) {
    await curPlus.already_unzip()  
   }else {
    let data = await curPlus.first_install()
    console.log(data)
    await curPlus.first_package_gzip()
   } 
}

app()