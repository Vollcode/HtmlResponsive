'use strict'
let db=require('../database/dbConnection');
let travel={};

travel.fetchAll=(cb)=>{
    if(!db) return cb("Error en la conexión");
    var sql="SELECT * FROM travel";
    db.query(sql, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
}

travel.fetchSingle=(city,cb)=>{
    if(!db) return cb("Error en la conexión");
    else {
      console.log('**********')
      console.log(city)
      db.query("SELECT * FROM travel WHERE city=?",[city], (error,result)=>{
        if(error) return cb(error);
        else return cb(null,result);
      })
    }
}

travel.fetchActive=(cb)=>{
    if(!db) return cb("Error en la conexión");
    var sql="SELECT * FROM travel WHERE active=1";
    db.query(sql, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
}

travel.updateActive=(id,cb)=>{
    if(!db) return cb("Error en la conexión");
    db.query("SELECT * FROM travel WHERE id=?",id,function (error,result) {
        if(error) return cb(error);
        else {
            let currentValue=result[0].active;
            if(currentValue==1){
              currentValue=0;
            }
            else{
              currentValue=1;
            }
            db.query("UPDATE travel SET active="+currentValue+" where id=?",id,function (error,result) {
              if(error) return cb(error);
              return cb(null,result);

            })
        }
    })
}

travel.deleteTravel=(id,cb)=>{
    if(!db) return cb("Error en la conexión");
    db.query("SELECT * FROM travel WHERE id=?",id,function (error,result) {
        if(error) return cb(error);
        else {
            db.query("DELETE FROM travel WHERE id=?",id,function () {
                if(error) return cb(error);
                return cb(null,result);
            })
        }
    })
}

travel.insertTravel=(destination,cb)=>{
    if(!db) return cb("Error en la conexión");
    else {
        db.query('INSERT INTO travel SET ?', destination, (error, result) => {
            if (error) return cb(error);
            return cb(null, result);
        })
    }
}
module.exports=travel;
