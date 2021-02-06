<template>
    <div id='tweet-creator-anchor' class='bottom'>
        <hr>
        <h4>Status: {{ tweetStatus }}</h4>
        <textarea class="standard-input" v-model='tweetContent'></textarea>
        <br>
        <button class="button is-success post" @click="postTweet()">Post this tweet</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'
    export default {
        name: "tweet-creator",
        data() {
            return {
                tweetContent: '',
                tweetStatus: 'Ready to tweet!'
            }
        },
        methods: {
            postTweet: function() {
                this.tweetStatus = 'tweeting...'  //tell user that API call is happening
                axios.request({
                    method: 'post',
                    url: 'https://tweeterest.ml/api/tweets',
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        content: this.tweetContent
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('getTweet');
                    this.tweetStatus = 'Tweeted! (Scroll up to see your tweet.) Ready to tweet again.';
                    this.tweetContent = '';
                })
                .catch((error) => {
                    console.log(error);
                    this.tweetStatus = 'Tweeting failed!';
                })
            }
        }
    }
</script>

<style>
    .post {
        margin-bottom: 45px;
    }
</style>