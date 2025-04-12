module.exports =(query)=>{
    let filterStatus=[
        {
            name: "Tất cả",
            status:"",
            class: "active"
            
        },
        {
            name:"Hoạt động",
            status: "active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status: "inactive",
            class:""
            
        }
    ]
    if(query.status){
        filterStatus.forEach(item => item.class = "");  // Reset tất cả class
        const index = filterStatus.findIndex(item => item.status == query.status);
        if (index !== -1) {
            filterStatus[index].class = "active";  // Chỉ đặt active cho trạng thái được chọn
        }
    } else {
        filterStatus.forEach(item => item.class = "");
        filterStatus[0].class = "active";  // Mặc định chọn "Tất cả"
    }
    return filterStatus
}