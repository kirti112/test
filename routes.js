var Hour = require('./models/hours');

exports.index = function(req, res) {
	
    res.render('index', { debug: req.query.debug || false});

};


exports.Update =function(req,res,next)
{	
	var id =req.body._id;;
	console.log(id);
	Hour.findByIdAndUpdate(id,req.body, function(err, hour) {
                if (err){
                   return  next(err);
                }
                
            });
	

};

exports.Save =function(req,res,next)
{	

	var hour = new Hour(req.body);
	
                hour.save(function (err, post) {
					if (err){
                   return res.json({'id':null,'message':err.message});
                }
					
					return 	res.json({'id':post.id,'message':'success'});
                });
	

};

exports.All =function(req,res,next)
{	


var query = Hour.find();
      
				  
                query.exec(function (err, hours) {
					
                    if (err) {
                        return next(err);
                    }
                    if (!hours) {
                        return next(new Error('can\'t find any Hour'));
                    }
                   res.json(hours);
                   
                });

};