const mutations = {
    setUserInfoAndRole(state, userInfo){
        state.userInfo = userInfo
        state.role = userInfo.role
    },
    setRoutes(state, routes){
        state.routes = routes
    }
};

export default mutations
