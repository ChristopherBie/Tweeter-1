<template>
    <div id='login'>
        <h1 class='is-size-1'>Welcome to Tweeter!</h1>
        <h3 class='is-size-4'>Please sign in or sign up.</h3>
        <signin-form></signin-form>
        <signup-form></signup-form>
    </div>
</template>

<script>
    import SigninForm from "@/components/SigninForm.vue";
    import SignupForm from "@/components/SignupForm.vue";
    export default {
        name: "login",
        components: {
            SigninForm,
            SignupForm
        },
    };
</script>

<style>
    #login h1 {
        margin-top: 5rem;
    }
    #login h1, #login h3 {
        text-align: center;
    }
    #login .panel {
        max-width: 400px;
        margin: 5rem auto 0;
    }
    form {
        width: 100%;
    }
</style>