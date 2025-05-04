const express = require('express');
const multer  = require('multer')
const cloudinary = require("cloudinary").v2
const streamifier= require("streamifier")
const router = express.Router();
const handleUpload = require("../../middlewares/cloudinaryUpload")
//CLOUDINARY
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET,
});
//END CLOUNDINARY


const upload = multer()


const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi',controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem)

router.get('/create', controller.create)

router.post('/create',
    upload.single("thumbnail"),
    handleUpload,
    validate.checkTitle,
    controller.createPost
)
router.get("/edit/:id",controller.edit)
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.checkTitle,
    controller.editPatch
)
router.get(
    "/detail/:id",
    controller.detailPatch
)

//Phương thức get để vẽ ra giao diện
//Phương thức post dùng khi gửi data lên (tạo mới 1 sản phẩm)
module.exports=router;

