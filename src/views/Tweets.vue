<template>
    <div id="tweets">
        <div class="navbar">
            <button class="button is-success" @click='displayProfilesPage'>View profiles</button>
            <signout-button></signout-button>
            <hr>
            <h1 class='title is-3'>Tweets</h1>
            <h3 class='title is-4'>by people you follow</h3>
            <hr>
        </div>
        <a href='#tweet-creator-anchor'>
            <button class="button is-success">Write a tweet</button>
        </a>
        <div v-for="tweet in tweets" :key="tweet.tweetId">
            <tweet-display @getTweet='getTweets' :tweetObject="tweet"></tweet-display>
        </div>
        <tweet-creator @getTweet='getTweets'></tweet-creator>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    import SignoutButton from '@/components/SignoutButton.vue';
    import TweetDisplay from '@/components/TweetDisplay.vue';
    import TweetCreator from '@/components/TweetCreator.vue';
    export default {
        name: "tweets",
        components: {
            SignoutButton,
            TweetDisplay,
            TweetCreator
        },
        data() {
            return {
                tweets: []
            }
        },
        mounted: function() {
            this.getTweets();
        },
        methods: {
            displayProfilesPage: function() {
                this.$router.push({
                    name: 'profiles'
                });
            },
            getTweets: function() {
                axios.request({
                    method: 'get',
                    url: "https://tweeterest.ml/api/tweets",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.tweets = response.data;
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
</style>