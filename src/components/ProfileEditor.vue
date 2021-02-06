<template>
    <div class='editor'>
        <button class="editor button is-warning" @click='showProfileForm = !showProfileForm'>Edit</button>
        <div v-if='showProfileForm'>
            <form @submit.prevent="editProfile">
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
                    <label class="label">Email address</label>
                    <div class="control">
                        <input
                            type="email"
                            placeholder="email address"
                            class="input"
                            v-model="email"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input
                            type="password"
                            placeholder="write something about yourself if you like"
                            class="input"
                            v-model="password"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Bio</label>
                    <div class="control">
                        <input
                            type="bio"
                            placeholder="write something about yourself if you like"
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
                <div class="field has-text-right">
                    <button type="submit" class="button is-success">Update profile</button>
                </div>
            </form>
        </div>
   </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "profile-editor",
        data() {
            return {
                showProfileForm: false,
                username: '',
                email: '',
                password: '',
                bio: '',
                birthdate: ''
            }
        },
        // props: {  //need to use props to get userId
        //     userId: {  //should be object?
        //         type: Number,
        //         required: true
        //     }
        // },
        methods: {
            editProfile: function() {
                axios.request({
                    method: "patch",
                    url: "https://tweeterest.ml/api/users",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        bio: this.bio,
                        birthdate: this.birthdate
                    }
                }).then((response) => {
                    console.log(response);
                    this.$emit('update-profile', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        bio: this.bio,
                        birthdate: this.birthdate
                    });
                    this.showProfileForm = false;
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
    .editor, #editor button {
        display: inline;
        margin-top: 10px;
        /* margin-bottom: 10px; */
    }
    .editor button {
        display: inline;
        margin-right: 6px;
    }
</style>