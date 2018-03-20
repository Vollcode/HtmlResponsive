const EXPRESS = require('express')
const APP = EXPRESS()
const PATH = require('path')

APP.listen(3000, "0.0.0.0")

APP.get('/:city',(req,res)=> res.sendFile(PATH.join(__dirname+`/public/${req.params.city}.html`)))
