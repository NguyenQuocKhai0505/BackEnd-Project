const Product = require("../../models/product.model")
// [GET] /products
module.exports.index= async(req, res) => {
    const products = await Product.find({
        status:"active",
        deleted:false
    }).sort({position:"desc"})

    const newProducts=products.map(item => {
        item.priceNew = ((item.price*(100-item.discountPercentage))/100).toFixed(0);
        return item;
    });

    // console.log(products)
    res.render("clients/pages/product/index.pug",{
        pageTitle: "Trang danh sách sản phẩm",
        products:newProducts
    })
}
//[GET] /products/:slug
module.exports.details = async(req, res) =>{
    try{
        const find= {
            deleted: false,
            slug: req.params.slug,
            status:"active"
        }
        //trả về một object
        const product= await Product.findOne(find)
        // console.log(product)
        res.render("clients/pages/product/details.pug",{
            pageTitle: product.title,
            product: product,
            message: req.flash()
        })
    }catch(error){
        req.flash("error","Không tồn tại sản phẩm này")
        res.redirect("/products")
    }
}