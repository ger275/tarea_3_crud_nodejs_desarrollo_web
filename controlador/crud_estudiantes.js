import express from "express";
import { conectar } from "../modelo/db_conectar.js";
var crud_estudiantes=({});

crud_estudiantes.leer = (req,res) => {
    conectar.query( 'select e.id_estudiante, e.carne, e.nombres, e.apellidos, e.direccion, e.telefono, e.correo_electronico, t.sangre, date_format(e.fecha_nacimiento, "%d-%m-%Y") fecha_nac from estudiantes as e join tipos_sangre as t on e.id_tipo_sangre = t.id_tipo_sangre', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('index',{resultado:results});
        }
    })
};

crud_estudiantes.cud = (req,res) => {
    const btn_agregar = req.body.btn_agregar;
    const btn_modificar = req.body.btn_modificar;
    const btn_eliminar = req.body.btn_eliminar;
    const id_estudiante = req.body.txt_id;
    const carne = req.body.txt_carne;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const correo_electronico = req.body.txt_correo;
    const id_tipo_sangre = req.body.txt_sangre;
    const fecha_nacimiento = req.body.txt_fechanac;

    if(btn_agregar){
        conectar.query('insert into estudiantes set?',{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,correo_electronico:correo_electronico,id_tipo_sangre:id_tipo_sangre,fecha_nacimiento:fecha_nacimiento},(error,results) => {
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }
    if(btn_modificar){
        conectar.query('update estudiantes set? where id_estudiante = ?',[{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,correo_electronico:correo_electronico,id_tipo_sangre:id_tipo_sangre,fecha_nacimiento:fecha_nacimiento},id_estudiante],(error,results) => {
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }
    if(btn_eliminar){
        conectar.query('delete from estudiantes where id_estudiante = ?',[id_estudiante],(error,results) => {
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }
};

export{crud_estudiantes}
