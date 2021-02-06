<template>
    <div>
        <hr>
        <textarea 
            class="stanard-input"
            id='comment-text' 
            v-model='commentContent' 
            placeholder='write a comment'>
        </textarea>
        <br>
        <button class="button is-success post" @click='postComment()'>Post this comment</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'
    export default {
        name: "comment-creator",
        data() {
            return {
                commentContent: ''
            }
        },
        props: {
            tweetId: Number
        },
        methods: {
            postComment: function() {
                axios.request({
                    method: "post",
                    url: 'https://tweeterest.ml/api/comments',
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        tweetId: this.tweetId,
                        content: this.commentContent
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('getComment');
                    this.commentContent = '';
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
    #comment-text {
        margin-top: 10px;
        padding-bottom: 0px;
        margin-bottom: 0px;
    }
</style>