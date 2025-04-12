const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const systemConfig = require("./config/system");

require("dotenv").config();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// Kết nối cơ sở dữ liệu
database.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride("_method"));

// Thiết lập view engine
app.set("views", "./views");
app.set("view engine", "pug");

// Sử dụng cookie-parser
app.use(cookieParser("keyboard cat"));

// Cấu hình session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // 60 giây
  })
);

// Cấu hình flash messages
app.use(flash());

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Phân tích dữ liệu từ form (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Cấu hình thư mục chứa file tĩnh
app.use(express.static("public"));

// Khai báo route
route(app);
routeAdmin(app);

// Lắng nghe trên cổng
app.listen(port, () => {
  console.log(`🚀 Server chạy thành công trên cổng ${port}`);
});
