// [GET] /admin/products
const Product = require("../../models/product.model")
const systemConfig = require("../../config/system.js")
const filterStatusHealper= require("../../helpers/filterStatus")
const searchHelper=require("../../helpers/search")
const paginatonHelpers = require("../../helpers/pagination.js")
module.exports.index= async (req, res) => {
    // console.log(req.query.status)
    //Đoạn bộ lọc
    const filterStatus= filterStatusHealper(req.query)
    // console.log(filterStatus)

    // console.log(req.query.status)
    let find ={
        deleted:false,
       
    }
    if(req.query.status){
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    // console.log(objectSearch)
    let keyword=""

    if(objectSearch.regex){
        find.title = objectSearch.regex
    }
    //Phần phân trang
    //Đếm số sản phẩm trong mongodb

    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginatonHelpers({
        currentPage: 1,
        limitItems: 4
    },
    req.query,countProduct
    )
    //Kết thúc phần phân trang
    const products = await Product.find(find)
    .sort({position:"desc"})
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)

     //lấy giới hạn 4 sản phẩm
     //skip: bỏ qua bắt đầu từ vị trí
    // console.log(products)
    res.render("admin/pages/products/index",{
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
    message: req.flash()
    });
 }
 // [PATCH] /admin/change-status/:status/:id

 module.exports.changeStatus=async(req,res)=>{
    // console.log(req.params)
    const status= req.params.status
    const id = req.params.id

    //Thay đổi trạng thái trong database
    await Product.updateOne({_id:id},{status: status})

    req.flash("success","Cập nhật trạng thái thành công")

    //redirect: chuyển hướng về trang
    res.redirect(req.get("Referrer") || "/");

 }
  // [PATCH] /admin/change-multi
 module.exports.changeMulti=async(req,res)=>{
    const type= req.body.type
    const ids= req.body.ids.split(", ")
    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids }}, {status: "active"} )
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids }}, {status: "inactive"} )
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}},{
                deleted: true,
                deletedAt: new Date()
            })
            req.flash("success",`Đã xóa thành công ${ids.length} sản phẩm!`)
            break;
        case "change-position":
      
            for(const item of ids){
                let [id,position] = item.split("-")
                position = parseInt(position)
                await Product.updateOne({_id: id}, {
                    position: position
                })

            }
            req.flash("success",`Đã thay đổi vị trí thành công ${ids.length} sản phẩm!`)
            break;
        default:
            break;
    }
    res.redirect(req.get("Referrer") || "/");

 }
//  [DELETE /products/delete/id
module.exports.deleteItem=async(req,res)=>{
    const id = req.params.id

    await Product.updateOne({_id:id},
         {
            deleted:true,
            deletedAt: new Date()
         }
    )
    req.flash("success",`Cập nhật trạng thái thành công sản phẩm!`)
    res.redirect(req.get("Referrer") || "/");

 }

 //[GET] /products/create
 module.exports.create=async(req,res)=>{
   res.render("admin/pages/products/create",{
    pageTitle: "Thêm mới sản phẩm"
   })
 }
//[POST] /products/create
module.exports.createPost = async (req, res) => {
    try {
      // Convert numerical values
      req.body.price = parseInt(req.body.price) || 0;
      req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
      req.body.stock = parseInt(req.body.stock) || 0;
  
      // Handle position logic
      if (!req.body.position || req.body.position.trim() === "") {
        const lastProduct = await Product.findOne().sort({ position: -1 });
        req.body.position = lastProduct ? lastProduct.position + 1 : 1;
      } else {
        req.body.position = parseInt(req.body.position) || 1;
      }
  
      // Handle file upload
      if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
      }
  
      // Create and save product
      const product = new Product(req.body);
      await product.save();
  
      req.flash("success", "Sản phẩm đã được tạo thành công");
      res.redirect("/admin/products");
    } catch (err) {
      console.error("Error creating product:", err);
      req.flash("error", "Có lỗi xảy ra khi tạo sản phẩm");
      res.redirect("/admin/products/create");
    }
  };
//[GET] /products/edit/:id
module.exports.edit = async(req,res) =>{
    try{
        const find= {
            deleted: false,
            _id: req.params.id
        }
        //trả về một object
        const product= await Product.findOne(find)
        // console.log(product)
        res.render("admin/pages/products/edit",{
            pageTitle:"Chỉnh sửa sản phẩm",
            product: product,
            message: req.flash()
        })
    }catch(error){
        req.flash("error","Không tồn tại sản phẩm này")
        res.redirect("/admin/products")
    }
   
}

// [PATCH] /product/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
      const { price, discountPercentage, stock, position } = req.body;
  
      // Ép kiểu các giá trị số (sử dụng Number thay vì parseInt cũng ok)
      req.body.price = parseInt(price) || 0;
      req.body.discountPercentage = parseInt(discountPercentage) || 0;
      req.body.stock = parseInt(stock) || 0;
      req.body.position = parseInt(position) || 0;
  
      // Xử lý file upload nếu có
      if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
      }
  
      // Cập nhật sản phẩm
      await Product.updateOne(
        { _id: req.params.id },
        req.body
      );
  
      req.flash("success", "Sản phẩm đã được cập nhật thành công");
      return res.redirect("/admin/products");
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      req.flash("error", "Có lỗi xảy ra khi cập nhật sản phẩm");
      return res.redirect(`/admin/products/edit/${req.params.id}`);
    }
}
//[GET] /products/detail/:id
module.exports.detailPatch = async(req,res) =>{
    try{
      const find= {
          deleted: false,
          _id: req.params.id
      }
      //trả về một object
      const product= await Product.findOne(find)
      // console.log(product)
      res.render("admin/pages/products/detail",{
          pageTitle: product.title,
          product: product,
          message: req.flash()
      })
  }catch(error){
      req.flash("error","Không tồn tại sản phẩm này")
      res.redirect("/admin/products")
  }
}