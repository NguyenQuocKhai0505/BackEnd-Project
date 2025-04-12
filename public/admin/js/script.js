//Button status
const buttonStatus= document.querySelectorAll("[button-status]")
// console.log(buttonStatus)
if(buttonStatus.length >0){
    let url= new URL(window.location.href)
    // console.log(url)
    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status= button.getAttribute("button-status")
           if(status){
            url.searchParams.set("status",status)
           }else{
            url.searchParams.delete("status")
           }
        //    console.log(url.href)
           window.location.href= url.href
        })
    })
}
    //End button status


    //Form Search 
    const formSearch = document.querySelector("#form-search")
    if(formSearch)
    {
        let url= new URL(window.location.href)
        formSearch.addEventListener("submit",(e)=>{
            
            e.preventDefault()//ngăn chặn đổi sự kiện (ngăn load lại trang)
            const keyword= e.target.elements.keyword.value

        if(keyword){
            url.searchParams.set("keyword",keyword)
           }else{
            url.searchParams.delete("keyword")
           }
          
           window.location.href= url.href
        })
    }
    //End Form Search

    // Pagination
    const url = new URL(window.location.href);
    const buttonsPagination = document.querySelectorAll("[button-pagination]");
    if (buttonsPagination) {
        buttonsPagination.forEach(button => {
            button.addEventListener("click", () => {
                const page = button.getAttribute("button-pagination");
                url.searchParams.set("page", page);
                window.location.href = url.href;
            });
        });
    }
    //END Pagigation

      //START CHECK BOX MULTI
      const checkboxMulti= document.querySelector("[checkbox-multi]")
      if(checkboxMulti){
          const inputCheckAll= checkboxMulti.querySelector("input[name='checkall']")
          // console.log(inputCheckAll)
          const inputsID= document.querySelectorAll("input[name='id']")
          // console.log(inputsID)
          
          //Viết sự kiện cho phần checkAll
          inputCheckAll.addEventListener("click",()=>{
              if(inputCheckAll.checked){
                  inputsID.forEach(input=>{
                      input.checked=true
                  })
              }else{
                  inputsID.forEach(input=>{
                      input.checked=false
                  })
              }
          })
          inputsID.forEach(input=>{
              input.addEventListener("click",()=>{
                  //Tìm tất cả các ô input đã check vào
                  const countChecked= checkboxMulti.querySelectorAll("input[name='id']:checked").length
                  // console.log(inputsID.length)
                  // console.log(countChecked)
                  if(inputsID.length==countChecked){
                      inputCheckAll.checked =true
                  }else{
                      inputCheckAll.checked=false
                  }
              })
          })
      }
      //END CHECK BOX MULTI
  
  
      //FORM CHANGE MULTI
      const formChangeMulti= document.querySelector("[form-change-multi]")
      if(formChangeMulti){
          formChangeMulti.addEventListener("submit",(e)=>{
              //Tránh load lại trang khi submit
              e.preventDefault()
              const checkboxMulti= document.querySelector("[checkbox-multi]")
              const inputChecked= checkboxMulti.querySelectorAll("input[name='id']:checked")
              
              const typeChange = e.target.elements.type.value
               
              if(typeChange=="delete-all"){
                const isConfirm = confirm("Bạn có chắc những sản phẩm này không?")
                if(!isConfirm){
                    return;
                }
              }
            //   console.log(typeChange)

              //kiểm tra 
              if(inputChecked.length>0){
                  let ids=[]
                  const inputIds = formChangeMulti.querySelector("input[name='ids']")
  
                  inputChecked.forEach(input=>{
                      const id =input.value
                    if(typeChange=="change-position")
                    {
                        const position= input.closest("tr").querySelector("input[name='position']").value
                        
                        // console.log(`${id}-${position}`)
                        ids.push(`${id}-${position}`)


                    }
                    else{          
                      ids.push(id)
                    }
                  })
                  inputIds.value= ids.join(", ")
                  //Submit form
                  formChangeMulti.submit()
              }else{
                  alert("Vui lòng chọn ít nhất một bảng ghi")
              }
          })
      }
    
      //END FORM CHANGE MULTI

      //Start Show-alert
      const showAlert = document.querySelector("[show-alert]")
      if(showAlert){
        const time= parseInt(showAlert.getAttribute("data-time"))
        const closeAlert= showAlert.querySelector("[close-alert]")

        setTimeout(() => {
            showAlert.classList.add("alert-hidden")
        },time);

        closeAlert.addEventListener("click",()=>{
            showAlert.classList.add("alert-hidden")
        })

      }
      //End Show-alert
    

    //UPLOAD IMAGE 
    const uploadImage= document.querySelector("[upload-image]")
    if(uploadImage){
        const uploadImageInput = document.querySelector("[upload-image-input]")
        const uploadImagePreview = document.querySelector("[upload-image-preview]")

        uploadImageInput.addEventListener("change", (e)=>{
            // console.log(e)
            const file= e.target.files[0]
            if(file){
                uploadImagePreview.src = URL.createObjectURL(file)
            }
        })
    }
    //END UPLOAD IMAGE