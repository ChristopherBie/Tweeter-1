<template>
    <div class="comment-container">
        <hr>
        <p class='is-size-5'>user: {{ commentObject.username }}</p>
        <p class='is-size-6'>{{ commentObject.content }}</p>  <!-- ? -->
        <comment-editor @update-comment='updateComment' v-if="ownership" :commentId='commentObject.commentId'></comment-editor>
        <comment-delete-button @delete-comment='deleteComment' v-if="ownership" :commentId='commentObject.commentId'></comment-delete-button>
    </div>
</template>

<script>
    import cookies from 'vue-cookies';
    import CommentEditor from '@/components/CommentEditor.vue';
    import CommentDeleteButton from '@/components/CommentDeleteButton.vue';
    export default {
        name: "comment-display",
        components: {
            CommentEditor,
            CommentDeleteButton
        },
        props: {
            commentObject: {
                type: Object,
            }
        },
        data() {
            return {
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