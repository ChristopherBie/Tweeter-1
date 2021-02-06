<template>
    <div>
        <button class="button is-primary" @click="likeOrUnlikeTweet()">
            <span v-if='liked'>Unlike this tweet</span>
            <span v-else>Like this tweet</span>
        </button>
        <p id='number-of-likes'>{{ numberOfLikes }} user(s) like(s) this.</p>
        
        <!-- <button @click='likeTweet'>
            <span v-if='gridView'>List view</span>
            <span v-else>Grid view</span>
        </button>
        <div id='view' :class='{ 'grid-view': gridView }'> -->
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    export default {
        name: "tweet-like-button",
        data() {
            return {
                liked: false,
                likedTweets: [],
                numberOfLikes: 0
            }
        },
        props: {
            tweetId: Number
        },
        mounted: function() {
            this.getLikes();
        },
        methods: {
            // likeOrUnlikeTweet(liked, tweetId) {
            //     if(this.liked == false) {
            //         likeTweet(tweetId);
            //     } else {
            //         unlikeTweet(tweetId);
            //     }
            //     this.liked = !this.liked;
            // },
            getLikes: function() {
                axios.request({
                    method: "get",
                    url: "https://tweeterest.ml/api/tweet-likes",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    params: {
                        tweetId: this.tweetId
                    }
                }).then((response) => {
                    console.log(response);
                    this.likedTweets = response.data;
                    this.numberOfLikes = this.likedTweets.length;                    
                    for(let i = 0; i < this.likedTweets.length; i++) {
                        if(cookies.get("userId") == this.likedTweets[i].userId) {
                            this.liked = true;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            likeOrUnlikeTweet: function() {
                if(this.liked == false) {
                    axios.request({
                        method: "post",
                        url: "https://tweeterest.ml/api/tweet-likes",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                        },
                        data: {
                            loginToken: cookies.get("session"),
                            tweetId: this.tweetId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.liked = true,
                        this.numberOfLikes++;
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    axios.request({
                        method: "delete",
                        url: "https://tweeterest.ml/api/tweet-likes",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                        },
                        data: {
                            loginToken: cookies.get("session"),
                            tweetId: this.tweetId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.liked = false,
                        this.numberOfLikes--;
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style>
    #number-of-likes {
        margin-left: 0px;
        padding-left: 0px;
    }
</style>