<template>
    <div class="remover">
        <button class="button is-danger" @click='deleteComment'>Delete</button>
        <!-- <h3>{{ tweetObject.username }}</h3>
        <p>{{ tweetObject.content }}</p> -->
        <!-- <h5>{{ tweetObject.createdAt }}</h5> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import cookies from 'vue-cookies';
    export default {
        name: "comment-delete-button",
        props: {  //need to use props to get commentId
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
                    // if(response.status == 201) {  //200?
                    //     // this.$store.commit("setToken", response.data.loginToken);
                    //     cookies.set("session", response.data.loginToken);  //stash loginToken in a cookie //
                    //     this.$router.push({  //display the comments page
                    //         name: "comments"  //
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