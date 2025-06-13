import multer from "multer";

// ! major function
const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./public/temp')
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now() + '_'+Math.round(Math.random*999);
        cb(null,uniqueSuffix+'-'+file.originalname);
        console.log("Processing file : "+file.fieldname)
    }
});
export const upload=multer({
    storage
})