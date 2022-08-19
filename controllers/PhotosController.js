// export const create = async (req, res) => {
//     try {

export const deletePhoto = (req, res) => {
    Photos.remove({_id: req.params.id}, function(err, photo) {
      if(err) { 
         return res.send({status: "200", response: "fail"});
      }
      fs.unlink(photo.path, function() {
        res.send ({
          status: "200",
          responseType: "string",
          response: "success"
        });     
      });
   }); 
  };