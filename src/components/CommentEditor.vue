<template>
    <div class='editor'>
        <button class="editor button is-warning" @click='showCommentForm = !showCommentForm'>Edit</button>
        <div v-if='showCommentForm'>
            <textarea v-model="commentContent"></textarea>
            <button class="button is-success" @click='editComment'>Update comment</button>
        </div>
        <!-- <h3>{{ commentObject.username }}</h3>
        <p>{{ commentObject.content }}</p> -->
        <!-- <h5>{{ commentObject.createdAt }}</h5> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "comment-editor",
        data() {
            return {
                showCommentForm: false,
                commentContent: ''
            }
        },
        props: {
            commentId: {
                type: Number,
                required: true
            }
        },
        methods: {
            editComment: function() {
                axios.request({
                    method: "patch",
                    url: "https://tweeterest.ml/api/comments",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        commentId: this.commentId,
                        content: this.commentContent
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('update-comment', this.commentContent);
                    this.showCommentForm = false;
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