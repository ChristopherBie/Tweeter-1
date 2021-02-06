


//copied from TweetDisplay
<template>
    <div class='profile-container'>
        <h3 class='is-size-4'>user: {{ user.username }}</h3>
        <h3 class='is-size-5' v-if='ownership'>email address: {{ user.email }}</h3>
        <h4 class='is-size-5'>bio: {{ user.bio }}</h4>
        <h4 class='is-size-5'>birthdate: {{ user.birthdate }}</h4>
        <profile-editor @update-profile='updateProfile' v-if='ownership'></profile-editor>
        <profile-delete-button v-if='ownership'></profile-delete-button>
        <follow-user-button :userId="user.userId"></follow-user-button>
            <!-- :tweetId='tweetObject.tweetId' -->
        <hr>
    </div>
</template>

<script>
    import cookies from 'vue-cookies';
    import ProfileEditor from '@/components/ProfileEditor.vue';
    import FollowUserButton from '@/components/FollowUserButton.vue';
    import ProfileDeleteButton from '@/components/ProfileDeleteButton.vue';
    export default {
        name: "profile-display",
        components: {
            ProfileEditor,
            FollowUserButton,
            ProfileDeleteButton
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                ownership: cookies.get('userId') == this.user.userId,  //this.profile.userId?
                // userId: cookies.get('userId'),
                users: [],
                username: this.user.username,
                email: this.user.email,
                password: this.user.password,
                bio: this.user.bio,
                birthdate: this.user.birthdate,
            }
        },
        methods: {  //MOVE TO OTHER COMPONENTS 
            updateProfile(newUsername, newEmail, newPassword, newBio, newBirthdate) {  //CHANGE?
                this.username = newUsername;
                this.email = newEmail;
                this.password = newPassword;
                this.bio = newBio;
                this.birthdate = newBirthdate;
                this.$emit('getProfile');
            },
            // deleteProfile() {  //CHANGE?
            //     this.username = newUserame;
            //     this.bio = newBio;
            //     this.birthdate = newBirthdate;
            // }
        }
    }
</script>

<style>
    .profile-container {
        margin: 1rem;
    }
</style>