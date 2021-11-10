<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/images/logo.png" alt="" />
        </router-link>
      </div>
      <div class="menu">
        <ul>
          <router-link to="/passengers"> Passengers </router-link>
          <router-link to="/create"> Create </router-link>
          <router-link to="/routedetail"> Route Details </router-link>
          <button class="secondary">Logout</button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
