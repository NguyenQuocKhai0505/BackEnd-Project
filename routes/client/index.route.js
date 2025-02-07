const productRoutes= require("./product.route")
const homeRoutes= require("./home.route")
module.exports =(app)=>{
    // Route cho trang chủ
    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
}
