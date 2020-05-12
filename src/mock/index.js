import Mock from 'mockjs'

//系统管理员课程列表审核
Mock.mock('/api/courses/examine','post',function(options){
    const o = JSON.parse(options.body)
    return o.id
})


var { LogList } = Mock.mock({
    'LogList|50-80' : [
      {
        "log_id":"@increment(1)",
        "log_type|1" : ['0','1','2'],
        "log_desc" : "@cword(5-8)",
        "log_title|1" : ['用户登录','用户登出','添加用户','编辑用户','冻结用户','机构审核','课程审核','资讯审核'],
        "log_source|1" : ['普通用户','机构管理员','系统管理员'],
        "handle_name" : "@first()",
        "handle_time" : '@date(yyyy-MM-dd hh:mm:ss)',
        "ip" : "@ip()",
        "role|1" : ['1' , '16' , '99']
      }
    ]
})
const getQuery = (url , name)=>{
    const index = url.indexOf('?')
    if(index !== -1){
        const queryStrArr = url.substr(index + 1).split('&')
        for(var i=0;i<queryStrArr.length;i++){
            const itemArr = queryStrArr[i].split('=')
            if(itemArr[0] === name){
                return itemArr[1]
            }
        }
    }
    return null
}

Mock.mock(/\/api\/log\/delete/,'post',(options)=>{
    const index = options.url.lastIndexOf('/');
    const id = options.url.substr(index+1);
    // const i = LogList.findIndex(item=>{
    //     if(item.log_id === id){
    //         console.log(1)
    //         return true
    //     }
    // })
    LogList.splice(id,1)
    return {
        status : 200, 
        log_id : id,
        LogList : LogList,
        total : LogList.length,
    }   
})

Mock.mock(/\/api\/log\/list/,'get',(options)=>{
    const type = getQuery(options.url,'type')
    const name = getQuery(options.url,'name')
    const limit = getQuery(options.url,'limit')
    const page = getQuery(options.url,'page')
    let mockList = LogList.filter(item => {
        if (type && item.log_type !==  type) {return false}
        if (name && item.handle_name.indexOf(name) < 0) {return false}
        else{return true}
    })

    console.log(mockList)
    const start = (page - 1) * limit
    const end = page * limit
    const totalPage = Math.ceil(mockList.length / limit)
    const list = page > totalPage?[]:mockList.slice(start,end)
    return {
        status : 200,
        message : "获取系统日志成功",
        LogList : list,
        total : mockList.length,
    }
})