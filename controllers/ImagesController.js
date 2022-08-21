import { unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';

export const remove = (req, res) => {
   try{
      const myImageName = req.params.imageName

      const path = `./uploads/` + myImageName.split(':').pop()
         
      if (myImageName !=='' && existsSync(path)){
          unlink(path)
      }
      
      res.json({
          success: true
      })

     


   }catch(err){
      console.log(err)
      res.status(500).json({
          message: 'Failed to retrieve articles',
      })
   }
  };