import {login} from '@/api/user'

const actions = {
    async setUserInfoAndRole({commit}, loginInfo){
        const result = await login(loginInfo);
        commit('setUserInfoAndRole', result)
    }
}

export default actions