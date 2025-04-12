
module.exports= (objectPagination,query,countProduct)=>{
    if(query.page)
        {
            objectPagination.currentPage = parseInt(query.page)
        }
    
        objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems

        //Tính tổng số trang cần thiết
        const totalPage = Math.ceil(countProduct / objectPagination.limitItems)
        objectPagination.totalPage=totalPage

        return objectPagination
}