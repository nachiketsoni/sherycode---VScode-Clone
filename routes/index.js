const express = require('express');
const router = express.Router();
const fs = require('fs')


router.get('/', function(req, res, next) {
  fs.readdir("./files", function(err,files){
    if (err) res.send(err)
    else res.render('index',{files,data:"",filename:""});
         
  })  
});

router.get('/createfile', function(req,res){

  fs.writeFile(`./files/${req.query.filesname}`, "", function(err){ 
    if (err) res.send(err)
    else res.redirect('/')
  })
})
router.get('/delete/:plc', function(req,res){
  fs.unlink(`./files/${req.params.plc}`, function(err){
    if (err) res.send(err)
    else res.redirect('/')
  })
})

router.get('/openfile/:plc', function(req,res){
  fs.readFile(`./files/${req.params.plc}`,'utf8', function(err,data){
    if (err) res.send(err)
    else {
      
      fs.readdir("./files", function(err,files){
        if (err) res.send(err)
        else {
          
          res.render('index',{files,data,filename: req.params.plc});}
             
      })
    }
  })
})

router.post('/textdata/:name', function(req,res){
  fs.writeFile(`./files/${req.params.name}`, `${req.body.txt}`, function(err){ 
    if (err) res.send(err)
    else res.redirect(`/openfile/${req.params.name}`)
  })
  
})

module.exports = router;
