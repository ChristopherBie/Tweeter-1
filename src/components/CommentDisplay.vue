<template>
    <div class="comment-container">
        <hr>
        <p class='is-size-5'>user: {{ commentObject.username }}</p>
        <p class='is-size-6'>{{ commentObject.content }}</p>  <!-- ? -->
        <comment-editor @update-comment='updateComment' v-if="ownership" :commentId='commentObject.commentId'></comment-editor>
        <comment-delete-button @delete-comment='deleteComment' v-if="ownership" :commentId='commentObject.commentId'></comment-delete-button>
        <!-- <comment-display :commentId='commentObject.commentId'></comment-display> -->      <!--COMMENTED OUT TO DISPLAY COMMENTS-->
        <!-- <comment-creator :commentId='commentObject.commentId'></comment-creator> -->      <!--COMMENTED OUT TO DISPLAY COMMENTS-->
        <!-- <button @click='showComments = !showComments'>Show comments</button>
        <comment-creator v-if="showComments"></comment-creator> -->
    </div>
</template>

<script>
    // import axios from 'axios';
    import cookies from 'vue-cookies';
    import CommentEditor from '@/components/CommentEditor.vue';
    import CommentDeleteButton from '@/components/CommentDeleteButton.vue';
    export default {
        name: "comment-display",
        components: {
            CommentEditor,
            CommentDeleteButton
        },
        props: {  //"i'm expecting a comment object"  //see line 12 in #4?
            commentObject: {  //needed to display comments
                type: Object,
                //required: true
                //can do more validation, eg. making sure comment object 
                    //has content, comment id, user id
            }
        },
        // props: {
        //     tweetId: Number,
        //     commentId: Number
        // },
        data() {
            return {
                // userId: cookies.get('userId'),
                ownership: cookies.get('userId') == this.commentObject.userId,
                content: this.commentObject.content
            }
        },
        methods: {
            updateComment(newContent) {
                this.content = newContent;
                this.$emit('getComment');
            },
            deleteComment() {
                this.$emit('getComment');
            },
        }
    }
</script>

<style>
    .comment-container{
        margin: 1rem;
    }
</style>