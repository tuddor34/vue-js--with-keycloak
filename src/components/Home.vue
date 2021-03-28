<template>
    <v-container>
        <h1>{{title}}</h1>
        <p>This is the home page of the application</p>
        <p v-if="$store.state.userData.isLoggedIn">You are logged in as <strong>{{$store.state.userData.firstName + " " + $store.state.userData.lastName }}</strong>.</p>
    </v-container>
</template>

<script>
    export default {
        name: 'Home',

        data: () => ({
            title: "Home"
        }),
    }
</script>
