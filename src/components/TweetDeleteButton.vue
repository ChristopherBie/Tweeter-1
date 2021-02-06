<template>
    <div class="remover">
        <button class="button is-danger" @click='deleteTweet'>Delete</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "tweet-delete-button",
        props: {
            tweetId: {
                type: Number,
                required: true
            }
        },
        methods: {
            deleteTweet: function() {
                axios.request({
                    method: "delete",
                    url: "https://tweeterest.ml/api/tweets",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        tweetId: this.tweetId,
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('delete-tweet');
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