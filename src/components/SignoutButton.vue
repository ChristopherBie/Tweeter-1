<template>
    <button 
        type="button" 
        class="button is-danger" 
        @click="signout">
        Sign out
    </button>
</template>

<script>
    export default {
        name: "signout-button",
        methods: {
            signout() {
                this.$store.commit('signout');
                this.$router.push({
                    name: 'login'
                });
                alert('Thank you for using Tweeter!');
            },
        },
    }
</script>

<style>

</style>