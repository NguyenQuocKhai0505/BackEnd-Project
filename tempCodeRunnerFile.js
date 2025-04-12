const express = require("express");

const database = require("./config/database"); 

require("dotenv").config();
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

    route(app);

    // Lắng nghe trên cổng
    app.listen(port, () => {
        console.log(`🚀 Server chạy thành công trên cổng ${port}`);
    });
