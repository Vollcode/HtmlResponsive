'use strict'
let db = require('../database/dbConnection');
let travel = {};

// REcoger todos los destinos
travel.fetchAll = (cb) => {
    if (!db) return cb("Error en la conexión");
    var sql = "SELECT * FROM travel";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
}

//Recoger un destino
travel.fetchSingle = (city, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM travel WHERE city=?", [city], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
}

//Recoger un destino por id
travel.fetchSingleById = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM travel WHERE id=?", [id], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
}

//Recoger los destinos activos
travel.fetchActive = (cb) => {
    if (!db) return cb("Error en la conexión");
    var sql = "SELECT * FROM travel WHERE active=1";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
}

//Activar/desactivar destinos
travel.updateActive = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    db.query("SELECT * FROM travel WHERE id=?", id, function (error, result) {
        if (error) return cb(error);
        else {
            let currentValue = result[0].active;
            if (currentValue == 1) {
                currentValue = 0;
            }
            else {
                currentValue = 1;
            }
            db.query("UPDATE travel SET active=" + currentValue + " where id=?", id, function (error, result) {
                if (error) return cb(error);
                return cb(null, result);

            })
        }
    })
}

//Actualiza un destino
travel.update = (travel, cb) => {
    var active;
    travel.active === 'on' ? active = 1 : active = 0;

    if (!db) return cb("Error en la conexión");

    let sql = "update travel set city='"+travel.city+"', description='"+travel.description+"', type='"+travel.type+"', active="+travel.active+", price='"+travel.price+"', image='"+travel.image+"' where id="+travel.id+";";

    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
}


//Borrar destinos
travel.deleteTravel = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    db.query("SELECT * FROM travel WHERE id=?", id, function (error, result) {
        if (error) return cb(error);
        else {
            db.query("DELETE FROM travel WHERE id=?", id, function () {
                if (error) return cb(error);
                return cb(null, result);
            })
        }
    })
}
//Crear destinos
travel.insertTravel = (travel, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query('INSERT INTO travel SET ?', travel, (error, result) => {
            if (error) return cb(error);
            return cb(null, result);
        })
    }
}
module.exports = travel;
