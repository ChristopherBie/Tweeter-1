<template>
    <div>
        <button class="button is-primary" @click="FollowOrUnfollowUser()">
            <span v-if='following'>Stop following</span>
            <span v-else>Follow</span>
        </button>
        <!-- {{ following }} -->
        <!-- <p id='number-followed'>You are following {{ numberFollowed }} user(s).</p> -->
        
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
        name: "follow-user-button",
        data() {
            return {
                // userId: cookies.get("userId"),
                following: false,
                followedUsers: [],
                // numberFollowed: 0
            }
        },
        props: {
            userId: Number
        },
        mounted: function() {
            this.getFollowedUsers();
            // this.userId = cookies.get("userId");
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
            getFollowedUsers: function() {
                axios.request({
                    method: "get",
                    url: "https://tweeterest.ml/api/follows",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    params: {
                        userId: cookies.get("userId")
                    }
                }).then((response) => {
                    console.log(response);
                    this.FollowedUsers = response.data;
                    // this.numberFollowed = this.FollowedUsers.length;                    
                    for(let i = 0; i < this.FollowedUsers.length; i++) {
                        if(this.userId == this.FollowedUsers[i].userId) {
                            this.following = true;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            FollowOrUnfollowUser: function() {
                if(this.following == false) {
                    axios.request({
                        method: "post",
                        url: "https://tweeterest.ml/api/follows",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                        },
                        data: {
                            loginToken: cookies.get("session"),
                            followId: this.userId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.following = true;
                        // this.numberFollowed++;
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    axios.request({
                        method: "delete",
                        url: "https://tweeterest.ml/api/follows",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                        },
                        data: {
                            loginToken: cookies.get("session"),
                            followId: this.userId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.following = false;
                        // this.numberFollowed--;
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }
        }
    }
</script>


//STYLES
<style>
    #number-of-likes {
        /* display: inline; */
        margin-left: 1.3rem;
    }
</style>