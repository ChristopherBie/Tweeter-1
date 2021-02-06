<template>
    <div class="remover">
        <button class="button is-danger" @click='deleteComment'>Delete</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "comment-delete-button",
        props: {
            commentId: {
                type: Number,
                required: true
            }
        },
        methods: {
            deleteComment: function() {
                axios.request({
                    method: "delete",
                    url: "https://tweeterest.ml/api/comments",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        commentId: this.commentId,
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('delete-comment');
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
    .remover, .remover button {
        display: inline;
        margin-top: 10px;
        margin-bottom: 30px;
    }
</style>