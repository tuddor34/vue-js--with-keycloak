import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import {routes} from "./routes";
import Keycloak from "keycloak-js";
import VueJwtDecode from "vue-jwt-decode";
import {store} from "./store/store";

const router = new VueRouter({
    mode: 'history',
    routes: routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (router.app.$keycloak.authenticated) {
            next();
        } else {
            router.app.$keycloak.login({redirectUri: window.location.origin + to.path});
        }
    } else {
        next();
    }
});


Vue.config.productionTip = false;
Vue.use(VueRouter);


// keycloak configuration
let initOptions = {
    url: 'http://127.0.0.1:8080/auth', realm: 'vue-app', clientId: 'app-vue', onLoad: 'check-sso'
};

let keycloak = Keycloak(initOptions);
Vue.prototype.$keycloak = keycloak;


keycloak.init({
    onLoad: initOptions.onLoad,
}).then((auth) => {
    new Vue({
        vuetify, router, store,
        created() {
            this.$watch('$keycloak.authenticated', (authenticated) => {
                console.log("Keycloak authenticated changed to: ", authenticated);
            }, {immediate: true})
        },
        render: h => h(App, {props: {keycloak: keycloak}})
    }).$mount('#app');

    if (auth) {
        updateStoreBasedOnToken(keycloak.token);
    }
}).catch(() => {
    console.log("Keycloak init failed");
});


function updateStoreBasedOnToken(token) {
    const decoded_token = VueJwtDecode.decode(token);
    const roles = decoded_token.realm_access.roles;
    const firstname = decoded_token.given_name;
    const lastname = decoded_token.family_name;


    store.commit("store_isLoggedIn", true);
    store.commit("store_firstname", firstname);
    store.commit("store_lastname", lastname);
    store.commit("store_roles", roles);

    //Token Refresh
    setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.log('Token refreshed' + refreshed);
            } else {
                console.log('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(() => {
            console.log('Failed to refresh token');
        });
    }, 6000)

}