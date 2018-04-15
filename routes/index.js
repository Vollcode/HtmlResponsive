var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');
var atob = require('atob')


router.get('/', (req,res,next)=>{
  travelModel.fetchActive((error,travels)=>{
    if(error) return res.status(500).json(error);
      res.render('index',{
        title:"Travels",
        isUserLogged : req.session.isUserLogged,
        isAdmin : req.session.isAdmin,
        user: req.session.username,
        travels
      })
  })
});

router.get('/destination/:city', (req,res,next)=>{
  travelModel.fetchSingle(req.params.city,(error,travels)=>{
    if(error) return res.status(500).json(error);
      if (req.session.isUserLogged == 1) {
        res.render('destination',{
          title:"City",
          isUserLogged : req.session.isUserLogged,
          user: req.session.username,
          travels
        })
      }
      else {
        res.redirect('/')
      }
  })
});



router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'User Login',
        })
})

router.get('/signup', function(req, res, next) {
    res.render('registro',
        {
            title: 'User SignUp',
        })
})

router.post('/signup', function (req, res) {
    let user={ username:req.body.username, email:req.body.email, password:req.body.password, hash:req.body.hash}
    userModel.signUp(user,function (error,result) {
        if(error) res.status(500).json(error);
        switch (result){
            case 1:
            res.render('registro',{
                title:"El nombre de usuario ya existe",
            })
                break;
            case 2:
            res.render('registro',{
                title:"El email  ya existe",
            })
                break;
            case 3:
            res.render('login',{
                title:"Registro correcto",
            })
                break;
        }
    })
})

router.post('/login', function (req,res) {
    let user={ username:req.body.username, password:req.body.password }

    userModel.login(user,function (error,result) {
        if(error) res.status(500).json(error);

        switch (result) {
            case 1:
                res.render('login', {
                    title: "Login incorrecto",
                })
                break;
            case 2:
                if(user.username=='admin'){
                    req.session.username="admin";
                    req.session.isUserLogged=1;
                    req.session.isAdmin=1;
                }
                else{
                    req.session.isAdmin=0;
                    req.session.username=user.username;
                    req.session.isUserLogged=1;
                }
                res.redirect('/');
                break;
        }
    })
})

router.get('/destroy',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get('/recuperarPassword/:id', (req,res,next)=>{
  let id = atob(req.params.id);
  userModel.fetchSingleById(id,(error, result)=>{
      if(result){
          res.render('recuperarPassword', {
              result: result[0]
          });
      }else {
          return res.status(500).json(err);
      }
  })
});

router.post('/recuperarPassword', (req,res,next)=>{

  let user = {}
  user.id = req.body.id
  user.password = req.body.password
  userModel.updatePassword(user, (error, result)=>{
      if(result){
          res.redirect('/login');
      } else {
          res.status(500).json('Error al editar usuario '+ error);
      }
  });
});

/*
router.get('*', function(req, res) {
    res.render('error404');
})
*/

module.exports = router;
