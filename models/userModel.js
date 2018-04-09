'use strict'
let db=require('../database/dbConnection');
let user={};

user.fetchAll=(cb)=>{
    if(!db) return cb("Error en la conexión");
    var sql="Select * FROM user";
    db.query(sql, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
}

user.signUp=function (user,cb) {
    if(!db) return cb("Error en la conexión");
    db.query('SELECT * FROM user WHERE username=?',[user.username],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            db.query('SELECT * FROM user WHERE email=?',[user.email],(error,result)=>{
                if(error) return cb(error);
                if (result != ''){
                    return cb(null,2);
                } else {
                    db.query('INSERT INTO user SET ?',[user],(error,result)=>{
                        if(error) return cb(error);
                        return cb(null,3);
                })}
        })}
})}

user.login=function (user,cb) {
    if(!db) return cb("Error en la conexión");
    db.query('SELECT * FROM user WHERE username=? AND password=?',[user.username,user.password],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,2);
        } else {
            return cb(null,1);
        }
    })
}

module.exports=user;
