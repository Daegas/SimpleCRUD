const express = require("express");
const bodyparser =require ("body-parser");
const mysql = require("mysql")
const app=express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'salinas',
	database:'practica_crud'
});

//================ GET
app.get('/usuarios',function(req,res){
	var sql="SELECT * FROM usuarios";
	db.query(sql,function(_error,_rows,_cols){
		if(_error){
			res.write(JSON.stringify({
				error:true,
				error_object:_error
			}));
			res.end();
		}
		else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	});
});
 //By Id
app.get('/usuarios/:id',function(req,res){
	var sql = "SELECT nombre,apellido,edad,direccion FROM usuarios WHERE id=" + db.escape(req.params.id);
	db.query(sql,function(_error,_rows,_cols){
		if(_error){
			res.write(JSON.stringify({
				error:true,
				error_object:_error
			}));
			res.end();
		}
		else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	});
});

//================ DELETE
app.delete('/usuarios/:id',function(req,res){
	var sql = "DELETE FROM usuarios WHERE id=" + db.escape(req.params.id);
	db.query(sql,function(_error,_rows,_cols){
		if(_error){
			res.write(JSON.stringify({
				error:true,
				error_object:_error
			}));
			res.end();
		}
		else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	})
});

//================ DELETE body
app.delete('/usuarios/',function(req,res){
	var sql = "DELETE FROM usuarios WHERE id=" + db.escape(req.body.id);
	db.query(sql,function(_error,_rows,_cols){
		if(_error){
			res.write(JSON.stringify({
				error:true,
				error_object:_error
			}));
			res.end();
		}
		else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	})
});

//================ INSERT
app.post('/usuarios/',function(req,res){

	var params= req.body;
	var sql = 'INSERT INTO usuarios SET ?';

	db.query(sql,[params],function(_error,_rows,_cols){
		if(_error){
			res.write(JSON.stringify({
				error:true,
				error_object:_error
			}));
			res.end();
		}
		else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	})
});

//-==============UPDATE
app.put('/usuarios',function(req,res){
	var sql = 'UPDATE usuarios SET nombre=?,apellido=?,edad=?, direccion=? WHERE id=?';

	db.query(sql,[req.body.nombre,req.body.apellido,req.body.edad,req.body.direccion,req.body.id],function(_error,_rows,_cols){
		if(_error){
			res.write(JSON.stringify({
				error:true,
				error_object:_error
			}));
			res.end();
		}
		else{
			res.write(JSON.stringify(_rows));
			res.end();
		}
	})
});



app.listen(8080,()=>{
	console.log("Servidor, @localhost:8080");
});