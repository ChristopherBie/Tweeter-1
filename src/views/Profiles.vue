<template>
    <div>
        <div class="navbar">
            <button class="button is-link" @click='displayTweetsPage'>View tweets</button>
            <signout-button></signout-button>
            <hr>
            <h1 class='title is-3'>Profiles</h1>
            <hr>
        </div>
        <div v-for="user in users" :key="user.userId">
            <profile-display @getProfile='getProfiles' :user="user"></profile-display>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    import SignoutButton from '@/components/SignoutButton.vue';
    import ProfileDisplay from '@/components/ProfileDisplay.vue';
    export default {
        name: "profiles",
        components: {
            SignoutButton,
            ProfileDisplay
        },
        data() {
            return {
                users: [],
            }
        },
        mounted: function() {
            this.getProfiles();
        },
        methods: {
            displayTweetsPage: function() {
                this.$router.push({
                    name: 'tweets'
                });
            },
            getProfiles: function() {
                axios.request({
                    method: 'get',
                    url: "https://tweeterest.ml/api/users",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.users = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        computed: {
            token() {
                return this.$store.state.loginToken;
            }
        },
        created() {
            console.log(this.$router);
            console.log(this.loginToken);
            if(!cookies.get('session')) {
                this.$router.push({
                    name: 'login'
                });
            }
        }
    };
</script>

<style>
    * {
        padding-left: 6px;
    }
    .navbar button {
        margin-right: 40px;
        margin-top: 22px;
        margin-bottom: 0px;
    }
    a button {
        margin-left: 24px;
        margin-top: 22px;
    }
</style>