import Vue from "vue";
import VueRouter from "vue-router";
import Tweets from '@/views/Tweets.vue';
import Login from '@/views/Login.vue';
import Profiles from '@/views/Profiles.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
     {
        path: "/",
        name: "tweets",
        component: Tweets
    },
   {
        path: "/profiles",
        name: "profiles",
        component: Profiles
    },
];

const router = new VueRouter({
    routes
});

export default router;