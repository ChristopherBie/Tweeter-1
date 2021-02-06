<template>
    <div class="remover">
        <button class="button is-danger" @click='deleteTweet'>Delete</button>
        <!-- <h3>{{ tweetObject.username }}</h3>
        <p>{{ tweetObject.content }}</p> -->
        <!-- <h5>{{ tweetObject.createdAt }}</h5> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "tweet-delete-button",
        props: {  //need to use props to get tweetId
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
                    // if(response.status == 201) {  //200?
                    //     // this.$store.commit("setToken", response.data.loginToken);
                    //     cookies.set("session", response.data.loginToken);  //stash loginToken in a cookie //
                    //     this.$router.push({  //display the tweets page
                    //         name: "tweets"  //
                    //     });
                    // }
                })
                .catch((error) => {
                    console.log(error);
                });


        //         this.$store.commit('signout');
        //         this.$router.push({
        //             name: 'login'
        //         });  //displays login page upon signout
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



//if parent has a tweet object, it should pass it to TweetDisplay.vue
    which should figure out what to do with it