var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
  req.flash('error', 'error en la generacion')
  res.send(req.flash('info'));
})

router.get('/create',(req,res,next)=>{
  req.flash('info', 'Sesion flash creada')
  req.flash('error', 'error de cualquier tipo')
  res.redirect('/login')
})

module.exports = router;
