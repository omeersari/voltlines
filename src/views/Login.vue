<template>
  <div class="login-page">
    <div class="login-form">
      <div class="info">
        <h2>Ömer Sarı, Volt Lines Front-End Dev. Assignment</h2>
      </div>
      <h2>Volt Lines</h2>
      <input type="text" placeholder="Username" v-model="auth.username" />
      <input type="password" placeholder="Password" v-model="auth.password" />
      <button class="primary" @click="login">LOGIN</button>
    </div>
    <div class="login-image">
      <img src="../assets/images/bgc.jpg" alt="Image" />
    </div>
    <notifications group="login" position="bottom left" />
  </div>
</template>

<script>
import api from "../api/mockapi";
export default {
  data() {
    return {
      auth: {
        username: "",
        password: "",
      },
      api,
    };
  },
  methods: {
    async login() {
      const response = await this.api.login();
      if (
        this.auth.username === response[0].username &&
        this.auth.password === response[0].password
      ) {
        this.$router.push("/passengers");
      } else {
        this.$notify({
          group: "login",
          title: "Error",
          text: "Wrong username or password",
          type: "error",
          duration: "3000",
        });
      }
    },
  },
};
</script>

<style></style>
