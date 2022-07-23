const _ =require('lodash');
const {Op}=require('sequelize');
const {scooter,produced,brand}=require('../models');

exports.homepage = async(req,res) =>{
    let sql="Select * from indexpage";

    var results=await brand.findAll({
        attributes:['brand_name'],
        where:{
            brand_name:{
                [Op.or]:['Aeonmetor 宏佳騰','Gogoro','Kawasaki 川崎','Kymco 光陽','PGO','SYM 三陽','Vespa','Yamaha 山葉']
            }
        }
    });

    
    results=JSON.parse(JSON.stringify(results));
    

    console.log(results);
    res.render('index',{results});
    

     
}

exports.brandpage = async(req,res) =>
{
    console.log(req.body);
    var brand_name=req.query.brand_name;
    let sql="Select * from brandpage where brand_name = '" + brand_name + "'";

    var results=await scooter.findAll({
        attributes:['scooter_name','scooter_image','price'],
        include:[{
            model:produced,as:'produced',required:true,include:[{
                model:brand,as:'brand',required:true,attributes:['brand_name'],where:{
                    brand_name:brand_name
                }
            }]
        }]        
    })

    results=JSON.parse(JSON.stringify(results));

    console.log(results);

    _.map(results,(n)=>{
        n.scooter_image=Buffer.from(n.scooter_image,'binary').toString('base64');
        return n;
    });

    console.log(results);

    res.render('brand',{results,brand_name});
}

exports.scooterpage = async(req,res) =>
{
    console.log(req.body);
    var scootername=req.query.scooter_name;
    var brand_name=req.query.brand_name;
    let sql="Select * from scooterpage where scooter_name = '" + scootername + "'";
    let sql2="Select * from brandpage where brand_name = '" + brand_name + "' and scooter_name <> '" + 
                scootername + "' order by price ASC limit 3";

    var data=await scooter.findOne({
        attributes: ['scooter_name','scooter_image','scooter_type',
                    'price','engine_type','transmission','displacement','performance'],
        where: { scooter_name:scootername },  
        include:[{model:produced,as:'produced',required:true, include:[{
                    model:brand,as:'brand',required:true,attributes:['brand_name']}]
                }],
              
       
    })

    data=JSON.parse(JSON.stringify(data));

    data.scooter_image=Buffer.from(data.scooter_image,'binary').toString('base64');

    console.log(data);

    var results=await scooter.findAll({
        attributes:['scooter_name','scooter_image','price'],
        include:[{model:produced,as:'produced',required:true,include:[{
                        model:brand,as:'brand',required:true,attributes:['brand_name'],
                        where:{ brand_name:brand_name}
                    }]
                }],
        where:{scooter_name:{
                    [Op.ne]:scootername
                }
        },
        order:[['price','ASC']],
        limit:3
    })

    results=JSON.parse(JSON.stringify(results));

    _.map(results,(n)=>{
        n.scooter_image=Buffer.from(n.scooter_image,'binary').toString('base64');
        return n;
    });
    res.render('scooter',{data,results,brand_name});

    
} 




