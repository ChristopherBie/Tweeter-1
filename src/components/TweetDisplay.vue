<template>
    <div class="tweet-container" v-if='tweetFollowing'>
        <hr>
        <p class='is-size-4'>user: {{ tweetObject.username }}</p>
        <p class='is-size-5'>{{ tweetObject.content }}</p>
        <tweet-like-button :tweetId='tweetObject.tweetId'></tweet-like-button>
        <tweet-editor @update-tweet='updateTweet' v-if="ownership" :tweetId='tweetObject.tweetId'></tweet-editor>
        <tweet-delete-button @delete-tweet='deleteTweet' v-if="ownership" :tweetId='tweetObject.tweetId'></tweet-delete-button>
        <br>
        <button class='button is-link' @click='showComments'>View comments</button>
        <div id="comments" v-if='viewingComments'>
            <h3 class='is-size-5'>Comments:</h3>
            <div v-if="comments.length">
                <div v-for="comment in comments" :key="comment.commentId">
                    <comment-display @getComment='getComments' :commentObject="comment"></comment-display>
                </div>
            </div>
            <comment-creator @getComment='getComments' :tweetId="tweetObject.tweetId"></comment-creator>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    import TweetLikeButton from "@/components/TweetLikeButton.vue";
    import TweetEditor from '@/components/TweetEditor.vue';
    import TweetDeleteButton from '@/components/TweetDeleteButton.vue';
    import CommentDisplay from '@/components/CommentDisplay.vue';
    import CommentCreator from '@/components/CommentCreator.vue';
    export default {
        name: "tweet-display",
        components: {
            TweetLikeButton,
            TweetEditor,
            TweetDeleteButton,
            CommentDisplay,
            CommentCreator
        },
        props: {
            tweetObject: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                ownership: cookies.get('userId') == this.tweetObject.userId,
                tweetFollowing: false,
                followedTweets: [],
                content: this.tweetObject.content,
                comments: [],
                viewingComments: false
            }
        },
        mounted: function() {
            this.getFollowedTweets();
        },
        methods: {
            updateTweet(newContent) {
                this.content = newContent;
                this.$emit('getTweet');
            },
            deleteTweet() {
                this.$emit('getTweet');
            },
            getFollowedTweets: function() {
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
                    this.followedTweets = response.data;
                    for(let i = 0; i < this.followedTweets.length; i++) {
                        if(this.tweetObject.userId == this.followedTweets[i].userId) {
                            this.tweetFollowing = true;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },            
            postComment(comment) {
                this.comments.push(comment);                
            },
            showComments() {
                this.viewingComments = !this.viewingComments;
                this.getComments();
            },
            getComments: function() {
                axios.request({
                    method: 'get',
                    url: "https://tweeterest.ml/api/comments",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    params: {
                        tweetId: this.tweetObject.tweetId,
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.comments = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            }        
        }
    }
</script>

<style>
    .tweet-container {
        margin: 1rem;
    }
    button {
        display: block;
    }
</style>