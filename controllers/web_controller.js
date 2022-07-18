import {pool} from '../app.js';
import _ from 'lodash';

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
    var brand_name=req.query.brand_name;
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

            _.map(results,(n)=>{
                n.scooter_image=Buffer.from(n.scooter_image,'binary').toString('base64');
                return n;
            });

            console.log(results);
            res.render('brand',{results,brand_name});
        });
        db.release();
    });  
}

export const scooterpage = (req,res) =>
{
    console.log(req.body);
    var scooter_name=req.query.scooter_name;
    var brand_name=req.query.brand_name;
    let sql="Select * from scooterpage where scooter_name = '" + scooter_name + "'";
    let sql2="Select * from brandpage where brand_name = '" + brand_name + "' and scooter_name <> '" + 
                scooter_name + "' order by price ASC limit 3";
    pool.getConnection((err,db)=>{
        if(err){
            throw err;
        }


        db.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            let data=JSON.parse(JSON.stringify(result[0]));
            data.scooter_image=Buffer.from(data.scooter_image,'binary').toString('base64');
            db.query(sql2,(err,result)=>{
                if(err){
                    throw err;
                }
                var results=JSON.parse(JSON.stringify(result));

                _.map(results,(n)=>{
                    n.scooter_image=Buffer.from(n.scooter_image,'binary').toString('base64');
                    return n;
                });
                res.render('scooter',{data,results,brand_name});
            }); 
        });
        db.release();
    });
} 




