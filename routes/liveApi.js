/* Live-APP Api List */
"use strict";
let ConstantMethod = require('../util/ConstantMethod');
let constant = require('../util/MongoCollections/liveCollections');// Mongo Connection Object
var mongo = require('mongodb');

var router = require('express').Router();
router.get('/', function(req, res) {
    res.send('Live -Index Page');
});

router.post('/api', function (request, response) {
           
        let Data = request.body;
        if (Data.length > 1e6) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            response.end(ConstantMethod.Error("FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST."));
            request.connection.destroy();
        } 
		else 
		{
			ConstantMethod.CheckHeader(request, constant, function (isValideHeader) 
			{
                if (isValideHeader) 
				{
                    switch (Data.eventName)
					{
                        case "create_collection":
										
								constant.MongoDb.collection.insert(
								{
									"name":Data.name,
									"data_details":Data.details,
									"enable":1,
									"date": Date.now()
								},
								function(err){
									if(!err){
										response.end(ConstantMethod.sucess(JSON.stringify('"collection added."')));	
									}else{
										response.status(500).send(ConstantMethod.Error(err));
									}
								});

                            break;
							
						case "read_all_collection":
										
								constant.MongoDb.collection.find().sort({_id:1}).toArray(function (err, res) {
                                    if (!err && res != null) {
                                        response.end(ConstantMethod.sucess(JSON.stringify(res)));
                                    } else {
                                        response.status(500).send(ConstantMethod.Error(err));
                                    }
                                });	
						
						case "singular_collection":
										
								constant.MongoDb.collection.findOne(
								{_id:new mongo.ObjectID(Data.case_id)}
                                , function (err, res) {
                                    if (!err && res != null) {
                                        response.end(ConstantMethod.sucess(JSON.stringify(res)));
                                    } else {
                                        response.status(500).send(ConstantMethod.Error(err));
                                    }

                                });
								
						case "update_collection":
									
								constant.MongoDb.collection.updateOne({_id:new mongo.ObjectID(Data.case_id)},
								{$set:{
									"name":Data.name,
									"data_details":Data.details,
									"enable":Data.enable
								}},function(err){
										if(!err){
											response.end(ConstantMethod.sucess('"Versip."'));
										}else{
											response.status(500).send(ConstantMethod.Error(err));
										}
								});	
									
								
                            break;
							
						case "update_collection_status":
									
								constant.MongoDb.collection.updateOne({_id:new mongo.ObjectID(Data.case_id)},
								{$set:{
									"enable":Data.enable
								}},function(err){
										if(!err){
											response.end(ConstantMethod.sucess('"Versip."'));
										}else{
											response.status(500).send(ConstantMethod.Error(err));
										}
								});	
									
								
                            break;	

						case "delete_collection":
						
								constant.MongoDb.collection.deleteOne({_id:new mongo.ObjectID(Data.case_id)},
								function (err, result) {
									if (!err && result.deletedCount > 0) {
										response.end(ConstantMethod.success("collection deleted successfully."));
									} else if (!err && result.deletedCount === 0) {
										response.end(ConstantMethod.success("collection not found."));
									} else {
										response.status(500).send(ConstantMethod.Error(err));
									}
								});
							

                            break;	
						
							
						case "create_order":
								
								try 
								{
									const amount = request.body.amount*100
									const options = {
														amount: amount,
														currency: 'INR',
														receipt: 'razorUser@gmail.com'
													}

									razorpayInstance.orders.create(options, 
										(err, order)=>{
											if(!err){
												
												constant.MongoDb.order.insert(
												{
													success:true,
													msg:'Order Created',
													order_id:order.id,
													collection_id:order.collection_id,
													amount:amount,
													key_id:RAZORPAY_ID_KEY,
													product_name:Data.name,
													description:Data.description,
													contact:"8567345632",
													name: "Sandeep Sharma",
													email: "sandeep@gmail.com"
												},
												function(err){
													if(!err){
														var data={
															success:true,
															msg:'Order Created',
															order_id:order.id,
															amount:amount,
															key_id:RAZORPAY_ID_KEY,
															product_name:Data.name,
															description:Data.description,
															contact:"8567345632",
															name: "Sandeep Sharma",
															email: "sandeep@gmail.com"
														}
														response.end(ConstantMethod.sucess(JSON.stringify(data)));	
													}else{
														response.status(500).send(ConstantMethod.Error(err));
													}
												});
												
											}
											else{
												response.status(500).send(ConstantMethod.Error(err));
											}
										}
									);

								} 
								catch (error) 
								{
										console.log(error.message);
										response.status(500).send(ConstantMethod.Error(error));
								}
								

                            break;
							
						
                        default:
                            response.status(500).send(ConstantMethod.Invalid());
                            break;
                    }
                } 
				else 
				{
                    response.end(ConstantMethod.Error("Header is missing!!"));
                }


            })

        }


});

module.exports = router;