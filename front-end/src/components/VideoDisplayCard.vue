<script>
export default {
  name: 'VideoDisplayCard'
}
</script>

<template>
  <div class="video-display-card">
    <img src="../assets/no_signal.jpg" alt="video thumbnail" />
    <div class="video-info">
      <strong>12-12-2024</strong>
      <hr />
      <div class="video-detail">
        <div>12:03</div>
        <div>103.10MB</div>
        <div>30fps</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-display-card {
  width: 100%;
  cursor: pointer;
}

img {
  width: inherit;
  border-radius: 15px;
}

.video-info {
  padding: 1rem 0;
}

strong {
  font-size: 1.9rem;
}

hr {
  height: 3px;
  background-color: #000;
  border: 0;
}

.video-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
