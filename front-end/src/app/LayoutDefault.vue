<template>
  <div class="LayoutDefault">
    <nav class="LayoutDefault__nav">
      <div class="column">
        <router-link to="/" class="logo vertical-center">
          <img src="../assets/picture/logo.png" />Live Webcam</router-link
        >
      </div>
      <div class="column vertical-center" align="center">
        <router-link to="/">Home</router-link> | <router-link to="/gallery">Gallery</router-link> |
        <router-link to="/about">About</router-link>
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
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  content: '';
  display: table;
  clear: both;
  font-weight: bold;
}

nav router-link {
  margin: 0 0.5rem;
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

.logo {
  float: left;
  font-size: 1.4rem;
}
</style>
