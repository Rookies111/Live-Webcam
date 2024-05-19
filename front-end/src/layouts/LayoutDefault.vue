<template>
  <div class="LayoutDefault">
    <nav class="LayoutDefault__nav">
      <router-link to="/" class="logo"><img src="../assets/logo.png" width="70px" height="70px" />Live Webcam</router-link>
      <router-link to="/">Home</router-link> | <router-link to="/gallery">Gallery</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <main class="LayoutDefault__main">
      <slot />
    </main>
    <!-- <footer class="LayoutDefault__footer">&copy; Awesome Company</footer> -->
  </div>
</template>

<style>
nav {
  width: 100%;
  background-color: #fff;
  color: black;
  box-shadow: #000;
  font-weight: bold;
}

.logo {
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
