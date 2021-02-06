<template>
    <div id='login'>
        <nav class="panel is-link">
            <p class="panel-heading">Sign-up</p>
            <div class="panel-block">
                <form @submit.prevent="signup">
                    <div class="field">
                        <label class="label">Email address</label>
                        <div class="control">
                            <input
                                type="email"
                                placeholder="email address"
                                class="input"
                                v-model="email"/>  <!-- the input class is required By Bulma -->
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control">
                            <input
                                type="username"
                                placeholder="username"
                                class="input"
                                v-model="username"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                type="password"
                                placeholder="select a password that's hard to guess"
                                class="input"
                                v-model="password"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Bio</label>
                        <div class="control">
                            <input
                                type="bio"
                                placeholder="write something about yourself"
                                class="input"
                                v-model="bio"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Birthdate</label>
                        <div class="control">
                            <input
                                type="birthdate"
                                placeholder="enter your date of birth"
                                class="input"
                                v-model="birthdate"/>
                        </div>
                    </div>
                    <div class="field" v-if="errorText">
                        <p class="notification is-danger">{{ errorText }}</p>
                    </div>
                    <div class="field has-text-right">
                        <button type="submit" class="button is-info">
                            Sign up
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
        name: "signup-form",
        data() {
            return {
                email: '',
                username: '',
                password: '',
                bio: '',
                birthdate: '',
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
            signup() {
                this.loading = true;
                axios.request({  //
                    method: "post",
                    url: "https://tweeterest.ml/api/users",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        email: this.email,
                        username: this.username,
                        password: this.password,
                        bio: this.bio,
                        birthdate: this.birthdate
                    }
                })
                .then((response) => {
                    console.log(response);  //
                    if(response.status == 201) {
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
                    this.errorText = "There was an error.";
                    console.log(error);  //
                    this.loading = false;  //
                });
            },
        },
    }
</script>

<style>
    #login {
        margin-bottom: 4rem;
    }
</style>