<template>
    <div class="remover">
        <button class="editor button is-danger" @click='showDeleteButton = !showDeleteButton'>Delete account</button>
        <div v-if='showDeleteButton'>
            <form @submit.prevent="deleteAccount">
                <div class="field">
                    <label class="label">Please enter your password.</label>
                    <div class="control">
                        <input
                            type="password"
                            class="input"
                            v-model="password"/>
                    </div>
                </div>
                <div class="field has-text-right">
                    <button type="submit" class="button is-danger">Enter</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "profile-delete-button",
        data() {
            return {
                showDeleteButton: false,
                password: ''
            }
        },
        methods: {
            deleteAccount: function() {
                axios.request({
                    method: "delete",
                    url: "https://tweeterest.ml/api/users",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        password: this.password,
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$store.commit('signout');
                    alert('Thank you for using Tweeter!');
                    this.$router.push({
                        name: 'login'
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
    #remover, #remover button {
        display: inline;
        margin-top: 10px;
        /* margin-bottom: 10px; */
    }
</style>