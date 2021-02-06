<template>
    <div id='login'>
        <nav class="panel is-primary">
            <p class="panel-heading">Sign-in</p>
            <div class="panel-block">
                <form @submit.prevent="signin">
                    <div class="field">
                        <label class="label">Email address</label>
                        <div class="control">
                            <input
                                type="email"
                                placeholder="email address"
                                class="input"
                                v-model="email"
                            />  <!-- the input class is required By Bulma -->
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                type="password"
                                placeholder="password"
                                class="input"
                                v-model="password"
                            />
                        </div>
                    </div>
                    <div class="field" v-if="errorText">
                        <p class="notification is-danger">{{ errorText }}</p>
                    </div>
                    <div class="field has-text-right">
                        <button type="submit" class="button is-info">
                            Sign in
                            <i :class="[
                                'fas', 
                                [ loading ? 'fa-spinner fa-spin' : 'fa-sign-in-alt' ], 
                                'px-2'  //
                            ]"></i>
                        </button>
                    </div>
                </form>
            </div>
        </nav>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from 'vue-cookies';
    export default {
        name: "signin-form",
        data() {
            return {
                email: '',
                password: '',
                errorText: '',
                loading: false,
            }
        },
        created() {
            if(this.loginToken) {  //
                this.$router.push({
                    name: 'tweets'  //
                });
            }
        },
        methods: {
            signin() {
                this.loading = true;
                axios.request({  //
                    method: "post",
                    url: "https://tweeterest.ml/api/login",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        email: this.email,
                        password: this.password,
                    }
                })
                .then((response) => {
                    console.log(response);  //
                    if(response.status == 201) {  //200?
                        // this.$store.commit("setToken", response.data.loginToken);
                        cookies.set("session", response.data.loginToken);  //stash loginToken in a cookie //
                        cookies.set("userId", response.data.userId);
                        this.$router.push({  //display the tweets page
                            name: "tweets"  //
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.errorText = "The email address and/or password is incorrect.";
                    console.log(error);  //
                    this.loading = false;  //
                });
            },
        },
    }
</script>

<style>

</style>