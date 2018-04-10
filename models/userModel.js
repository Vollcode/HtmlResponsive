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


//Recoger un usuario por id
user.fetchSingleById = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM user WHERE id=?", [id], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
}

//Recoger los usuarios activos
user.fetchActive = (cb) => {
    if (!db) return cb("Error en la conexión");
    var sql = "SELECT * FROM user WHERE active=1";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
}


//Actualiza un destino
user.update = (user, cb) => {
    var active;
    user.active === 'on' ? active = 1 : active = 0;

    if (!db) return cb("Error en la conexión");

    let sql = "update user set username='"+user.username+"', email='"+user.email+"', password='"+user.password+"', active="+user.active+", hash='"+user.hash+"' where id="+user.id+";";

    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
}

//Borrar usuarios
user.deleteUser = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    db.query("SELECT * FROM user WHERE id=?", id, function (error, result) {
        if (error) return cb(error);
        else {
            db.query("DELETE FROM user WHERE id=?", id, function () {
                if (error) return cb(error);
                return cb(null, result);
            })
        }
    })
}
//Crear usuarios
user.insertUser = (user, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query('INSERT INTO user SET ?', user, (error, result) => {
            if (error) return cb(error);
            return cb(null, result);
        })
    }
}

module.exports=user;
