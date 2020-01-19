const actions = {
    async setUserInfoAndRole({commit}, loginInfo){
        commit('setUserInfoAndRole', loginInfo)
    },
    async setAvator({commit} , avator){
        commit('setAvator',avator)
    },
    setRole({commit}, role){
        commit('setRole', role);
    }
}

export default actions
