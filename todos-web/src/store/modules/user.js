import userApi from '../../api/user'
import _ from 'lodash'

const state = {
  userInfo: {},
  loginInfo: {
    username: '',
    password: ''
  },
  registerInfo: {
    username: '',
    password: '',
    email: ''
  }
}

const getters = {
}

const actions = {
  login: async ({ commit, state, dispatch }) => {
    const saveResult = await userApi.login(state.loginInfo)
    if (saveResult.data.success) {
      commit('updateUserInfo', saveResult.data.data)
    }
  },
  logout: async ({commit, state, dispatch}) => {
    const saveResult = await userApi.logout()
    if (saveResult.data.success) {
      commit('removeUserInfo')
    }
  }
}

const mutations = {
  updateUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
