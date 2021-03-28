<template>
    <v-container>
        <h1>{{title}}</h1>
        <p>This is the home page of the application</p>
        <p>Be nice</p>
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
