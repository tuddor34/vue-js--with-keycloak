<template>
    <v-container>
        <h1>{{title}}</h1>
        <p>First name: {{ this.$store.state.userData.firstName}}</p>
        <p>Last name: {{ this.$store.state.userData.lastName}}</p>
        <p>Roles: </p>
        <ul id="listwrapper">
            <li v-for="item in this.$store.state.userData.roles" :key="item.id">
                {{item}}
            </li>
        </ul>
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
