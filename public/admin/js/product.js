    //CHANGE STATUS
    const buttonChangeStatus= document.querySelectorAll("[button-change-status]")
    if(buttonChangeStatus.length>0){
        const formChangeStatus = document.querySelector("#form-change-status")
        const path = formChangeStatus.getAttribute("data-path")
        
        buttonChangeStatus.forEach(button=>{
            button.addEventListener("click",()=>{
                const statusCurrent = button.getAttribute("data-status")
                const id = button.getAttribute("data-id")
                
                let statusChange = statusCurrent=="active" ? "inactive" :"active"

                const action = path + `${statusChange}/${id}?_method=PATCH`
                //Gửi lên là phương thức PATH, để k cho người dùng làm ảnh tưởng tới code
                formChangeStatus.action= action

                formChangeStatus.submit()
                
            }) 
        })
    }


    //END CHANGE STATUS

    //START DELETE 
    document.addEventListener("DOMContentLoaded", function () {
        const buttonDelete = document.querySelectorAll("[button-delete]");
        if (buttonDelete.length > 0) {
            const formDeleteItem = document.querySelector("#form-delete-item");
            const path = formDeleteItem.getAttribute("data-path");
    
            buttonDelete.forEach(button => {
                button.addEventListener("click", () => {
                    const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
                    if (isConfirm) {
                        const id = button.getAttribute("data-id");
                        const action = `${path}${id}?_method=DELETE`;
                        console.log("🛑 Đang xóa sản phẩm:", action);
    
                        formDeleteItem.action = action;
                        formDeleteItem.submit();
                    }
                });
            });
        } 
        
    });    
          //END DELETE