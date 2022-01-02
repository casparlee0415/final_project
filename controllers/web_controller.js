import {pool} from '../app.js';
import fs from 'fs';
import { Blob } from 'buffer';

export const homepage = (req,res) =>{
    let sql="Select * from indexpage";
    pool.getConnection((err,db)=>{
        if(err){
            throw err;
        }
        var results;
        db.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            results=JSON.parse(JSON.stringify(result));
            console.log(results);
            res.render('index',{results});
        });
        db.release();
    });
     
}

export const brandpage = (req,res) =>
{
    console.log(req.body);
    var brand_name=req.body.brand_name;
    let sql="Select * from brandpage where brand_name = '" + brand_name + "'";
    pool.getConnection((err,db)=>{
        if(err){
            throw err;
        }
        var results;
        db.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            results=JSON.parse(JSON.stringify(result));
            console.log(results);
            res.render('brand',{results,brand_name});
        });
        db.release();
    });  
}

export const scooterpage = (req,res) =>
{
    console.log(req.body);
    var scooter_name=req.body.scooter_name;
    var brand_name=req.body.brand_name;
    let sql="Select * from scooterpage where scooter_name = '" + scooter_name + "'";
    let sql2="Select * from brandpage where brand_name = '" + brand_name + "' and scooter_name <> '" + 
                scooter_name + "' order by price ASC limit 3";
    pool.getConnection((err,db)=>{
        if(err){
            throw err;
        }
        var results;
        var data;
        db.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            data=JSON.parse(JSON.stringify(result[0]));
            db.query(sql2,(err,result)=>{
                if(err){
                    throw err;
                }
                results=JSON.parse(JSON.stringify(result));
                res.render('scooter',{data,results,brand_name});
            }); 
        });  
        db.release();
    });
} 




