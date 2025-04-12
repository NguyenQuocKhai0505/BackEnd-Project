module.exports.checkTitle = (req, res, next) => {
  try {
      // Kiểm tra xem body và title có tồn tại hay không
      if (!req.body || !req.body.title || req.body.title.trim() === "") {
          req.flash("error", "Vui lòng nhập tiêu đề sản phẩm!"); // Flash error message
          
          // Lấy referrer hoặc sử dụng giá trị mặc định
          const referrer = req.get("Referrer") || "/";
          return res.redirect(referrer); // Redirect về trang trước hoặc trang chủ
      }

      // Nếu title hợp lệ, chuyển sang middleware tiếp theo
      next();
  } catch (error) {
      // Bắt lỗi không mong muốn và chuyển về trang lỗi
      console.error("Đã xảy ra lỗi trong middleware checkTitle:", error);
      req.flash("error", "Đã xảy ra lỗi hệ thống. Vui lòng thử lại!");
      res.redirect("/error"); // Redirect đến trang lỗi
  }
};
