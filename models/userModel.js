let db=require('../database/dbConnection');
let user={};

user.fetchAll=(cb)=>{
    if(!db) return cb("Error en la conexión");
    var sql="Select * FROM users";
    db.query(sql, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
};

user.getHash = function(user,cb) {
    if(!db) return cb("Error en la conexión");
    return db.query("SELECT hash FROM users WHERE email = ?",[user.email]);
};

user.activateUser = function(hash, cb){
    if(!db) return cb("Error en la conexión");
    db.query('UPDATE users SET active = 1 WHERE hash = ?', [hash], (error, result)=>{
        if(error) return cb(error);
        else return cb(null, result);
    })
};

user.signUp = function (user,cb) {
    if(!db) return cb("Error en la conexión");
    db.query('SELECT * FROM users WHERE username=?',[user.username],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            db.query('SELECT * FROM users WHERE email=?',[user.email],(error,result)=>{
                if(error) return cb(error);
                if (result != ''){
                    return cb(null,2);
                } else {
                    db.query('INSERT INTO users SET ?',[user],(error,result)=>{
                        if(error) return cb(error);
                        return cb(null,3);
                })}
        })}
})};

user.login=function (user,cb) {
    if(!db) return cb("Error en la conexión");
    db.query('SELECT * FROM users WHERE username=? AND password=?',[user.username,user.password],(error,result)=>{
        if(error) return cb(error);
        if (result != '') {
            if (result[0].active === 0) {
                return cb(null, 3);
            } else {
                return cb(null, 2);
            }
        }
        else {
            return cb(null, 1);
        }
    })
};


//Recoger un usuario por id
user.fetchSingleById = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM users WHERE id=?", [id], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
};

//Recoger un usuario por email
user.fetchSingleByEmail = (email, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM users WHERE email=?", [email], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
}

//Recoger los usuarios activos
user.fetchActive = (cb) => {
    if (!db) return cb("Error en la conexión");
    var sql = "SELECT * FROM users WHERE active=1";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
};

//Recoger un usuario activo por email
user.fetchActiveByEmail = (email,cb) => {
    if (!db) return cb("Error en la conexión");
    else {
      db.query("SELECT * FROM users WHERE active=1 AND email=?",[email], (error, result) => {
        if (error) return cb(error);
        else return cb(null, result);
      })
    }
}


//Actualiza un usuario
user.update = (user, cb) => {
    var active;
    user.active === 'on' ? active = 1 : active = 0;

    if (!db) return cb("Error en la conexión");

    let sql = "update users set username='"+user.username+"', email='"+user.email+"', password='"+user.password+"', hash='"+user.hash+"', isAdmin=0, active="+user.active+" where id="+user.id+";";
    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
};

//Actualiza un password de usuario
user.updatePassword = (user, cb) => {
    if (!db) return cb("Error en la conexión");

    let sql = "update users set password='"+user.password+"' where id="+user.id+";";
    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
}

//Borrar usuarios
user.deleteUser = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    db.query("SELECT * FROM users WHERE id=?", id, function (error, result) {
        if (error) return cb(error);
        else {
            db.query("DELETE FROM users WHERE id=?", id, function () {
                if (error) return cb(error);
                return cb(null, result);
            })
        }
    })
};

//Crear usuarios
user.insertUser = (user, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query('INSERT INTO users SET ?', user, (error, result) => {
            if (error) return cb(error);
            return cb(null, result);
        })
    }
};

user.paginate =(offset, limit, cb)=>{
  if(db) {
  db.query("SELECT * FROM users LIMIT ?, ?", [offset, limit],(error,rows)=>{
    if(error){
      return cb(error);
    }else{
        db.query("SELECT COUNT(*) as total FROM users",(error, count)=>{
          if(error) {
            return cb(error)
          }else{
            return cb(null,{count,rows});
          }
      })
    }
  })
  }
}

module.exports=user;
