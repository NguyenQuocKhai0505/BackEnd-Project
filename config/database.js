const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connect Success");
    } catch (error) {
        console.log("Connect Error");
        console.error(error); // Thêm phần in ra lỗi để dễ dàng theo dõi
    }
}
