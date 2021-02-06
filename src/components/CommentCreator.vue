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
        <button class="button is-success post" @click='postComment()'>Post this comment</button>  <!--() ADDED IN ORDER TO DISPLAY COMMENTS -MADE A DIFFERENCE?-->
        <!-- <p>{{ content }}</p>
        <p>{{ tweetId }}</p> -->
        <!-- <div v-for='(comment, index) in comments' :key='index'>
            comment text
            <br>  -author
        </div> -->

        <!-- <hr> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'
    export default {
        name: "comment-creator",
        data() {
            return {
                commentContent: ''//,
                // comments: []  //add sth here?
            }
        },
        props: {
            // commentContent: {
            //     type: Object,
            // },
            // tweetId: {
            //     type: Number,
            //     required: true
            // }
            tweetId: Number
        },
        methods: {
            postComment: function() {
                // alert(this.tweetId);
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
                    }//,
                    // params: {
                    //     tweetId: this.tweetId
                    // }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('getComment');
                        //FIXED (FROM this.$emit('post-comment', this.commentContent)) IN ORDER TO DISPLAY COMMENTS
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
    /* .post-comment {
        margin-top: 0px;
        padding-top: 0px;
    } */
    #comment-text {
        margin-top: 10px;
        padding-bottom: 0px;
        margin-bottom: 0px;
    }
</style>