import Vue from "vue";
import VueRouter from "vue-router";
import Tweets from '@/views/Tweets.vue';
import Login from '@/views/Login.vue';
import Profiles from '@/views/Profiles.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",  //name of route
        component: Login
    },
     {
        path: "/",
        name: "tweets",
        component: Tweets
        // // route level code-splitting
        // // this generates a separate chunk (about.[hash].js) for this route
        // // which is lazy-loaded when the route is visited.
        // component: () =>
        //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
   {
        path: "/profiles",
        name: "profiles",
        component: Profiles
    },
    // {
    //     path: "/login",
    //     name: "login",
    //     component: Login
    // }
];

const router = new VueRouter({
    routes
});

export default router;