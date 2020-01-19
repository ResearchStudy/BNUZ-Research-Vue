const mutations = {
    setUserInfoAndRole(state, userInfo){
        state.userInfo = userInfo
        state.role = userInfo.role
    },
    setRoutes(state, routes){
        state.routes = routes
    },
    setRole(state, role){
        state.role = role
    },
    setAvator(state, avator){
        if(avator !== ""){
            state.avator = "/api/resources/" + avator
        }
        else{
            state.avator = "/api/resources/eyJleHBpcmVfYXQiOi0xLCJhY2NvdW50X2lkIjotMSwicGF0aCI6InN0b3JhZ2U6Ly9hY2NvdW50X2F2YXRvckAyLzE1NzkwMTE5MDItYXZhdG9yLmpwZyIsInB1YmxpYyI6dHJ1ZSwiZmlsZV9uYW1lIjoiIn0="
        }
        
    }
};

export default mutations
