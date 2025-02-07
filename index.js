const express = require('express')
const route = require("./routes/client/index.route")

const app =express()
const port =3000

app.set("views","./views")
app.set("view engine","pug")

//Routes 
route(app)

// Lắng nghe trên cổng
app.listen(port, () => {
    console.log("Server chạy thành công trên cổng " + port);
});
