<template>
    <div class='editor'>
        <button class="editor button is-warning" @click='showTweetForm = !showTweetForm'>Edit</button>
        <div v-if='showTweetForm'>
            <textarea v-model="tweetContent"></textarea>
            <button class="button is-success" @click='editTweet'>Update tweet</button>
        </div>
        <!-- <h3>{{ tweetObject.username }}</h3>
        <p>{{ tweetObject.content }}</p> -->
        <!-- <h5>{{ tweetObject.createdAt }}</h5> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "tweet-editor",
        data() {
            return {
                showTweetForm: false,
                tweetContent: ''
            }
        },
        props: {  //need to use props to get tweetId
            tweetId: {
                type: Number,
                required: true
            }
        },
        methods: {
            editTweet: function() {
                axios.request({
                    method: "patch",
                    url: "https://tweeterest.ml/api/tweets",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "X4jpwzTZ0PRaesSZyR8C398fMTT8JvfZ1RM5I76SdBi8A"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        tweetId: this.tweetId,
                        content: this.tweetContent
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.$emit('update-tweet', this.tweetContent);
                    this.showTweetForm = false;
                    this.tweetContent = '';
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