import Home from "./components/Home";
import Admin from "./components/Admin";
import Forbidden from "./components/Forbidden";
import {store} from "./store/store";


export const routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "/forbidden",
        component: Forbidden
    },
    {
        path: "/admin", component: Admin, beforeEnter(to, from, next) {
            if (store.state.userData.roles.includes("Admin")) {
                next();
            } else {
                next("/forbidden");
            }
        }
    }
];