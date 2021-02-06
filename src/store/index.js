import Vue from "vue";
import Vuex from "vuex";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginToken: cookies.get('session'),
        userId: cookies.get('userId')
    },
    mutations: {
        signout(state) {
            cookies.remove('session');
            cookies.remove('userId');
            state.loginToken = null;
        },
        setloginToken(state, loginToken) {
            cookies.set('session', loginToken);
            state.loginToken = loginToken;
        }
    },
    actions: {
    },
    modules: {
    }
});