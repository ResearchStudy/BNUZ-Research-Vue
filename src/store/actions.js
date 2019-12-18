const actions = {
    async setUserInfoAndRole({commit}, loginInfo){
        commit('setUserInfoAndRole', loginInfo)
    },
    setRole({commit}, role){
        commit('setRole', role);
    }
}

export default actions
