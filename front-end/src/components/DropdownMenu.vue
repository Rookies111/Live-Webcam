<script>
export default {
  name: 'DropdownMenu',

  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="dropdown">
    <button class="dropdown-btn">
      {{ title }} <img src="../assets/dropdown_arrow.png" width="15px" height="15px" />
    </button>
    <div class="dropdown-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dropdown-btn {
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 15px;
  position: relative;
  font-size: 1.9rem;
  font-weight: bold;
  z-index: 2;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  width: 10.25rem;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  padding: 1rem 0rem 0rem 0rem;
  text-align: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 0;
  transform: translate(0, -1rem);
  grid-template-rows: auto;
}

.dropdown-content div {
  background-color: #0f0;
  color: #000;
  padding: 12px 16px;
  font-size: 1.9rem;
  text-decoration: none;
  display: flex;
}

.dropdown:hover .dropdown-content,
.dropdown-content:hover {
  display: grid;
}
</style>
