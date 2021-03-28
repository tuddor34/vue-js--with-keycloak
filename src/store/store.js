import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userData: {
            isLoggedIn: undefined,
            firstName: "",
            lastName: "",
            roles: []
        }
    },

    mutations: {
        store_firstname(state, data) {
            state.userData.firstName = data;
        },
        store_lastname(state, data) {
            state.userData.lastName = data;
        },
        store_roles(state, data) {
            state.userData.roles = data;
        },
        store_isLoggedIn(state, data) {
            state.userData.isLoggedIn = data;
        }
    }
});