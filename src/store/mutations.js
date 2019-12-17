const mutations = {
    setUserInfoAndRole(state, userInfo){
        state.userInfo = userInfo
        state.role = userInfo.role
    }
}

export default mutations