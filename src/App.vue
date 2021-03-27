<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark>
            <div class="d-flex align-center">
                <h2>Keycloak Auth App</h2>
            </div>

            <v-spacer></v-spacer>
            <v-btn text to="/">
                Home
            </v-btn>
            <v-btn text to="/admin">
                Admin
            </v-btn>
            <v-btn text @click="logout">
                Logout
            </v-btn>

        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            //
        }),
        methods: {
            logout() {
                this.$keycloak.logout();
            }
        }
    };
</script>
