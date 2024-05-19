<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="LayoutDefault">
    <nav class="LayoutDefault__nav">
      <div class="column">
        <RouterLink to="/" class="logo vertical-center">
          <img src="../assets/logo.png" />Live Webcam</RouterLink>
      </div>
      <div class="column vertical-center" align="center">
        <RouterLink to="/">Home</RouterLink> | <RouterLink to="/gallery">Gallery</RouterLink> |
        <RouterLink to="/about">About</RouterLink>
      </div>
    </nav>
    <main class="LayoutDefault__main">
      <slot />
    </main>
  </div>
</template>

<style>
nav {
  width: 100%;
  height: 3.5rem;
  padding: 0.25rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  content: '';
  display: table;
  clear: both;
}

nav a {
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin: 0 0.5rem;
}

.logo {
  float: left;
  font-size: 1.4rem;
}

.logo img {
  width: 3.5rem;
  margin: 0 0.5rem;
}

.column {
  float: left;
  width: 33.33%;
  height: inherit;
  font-size: 1.8rem;
  align-items: center;
}

.vertical-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
