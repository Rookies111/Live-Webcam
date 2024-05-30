<script>
export default {
  name: 'DropdownMenu',

  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },

  mounted() {
    const dropdown_content = document.querySelector('.dropdown-content')
    this.content.split(',').forEach((item) => {
      const option = document.createElement('button')
      option.textContent = item
      option.classList.add('dropdown-option')
    })
    dropdown_content.appendChild(option)
  }
}
</script>

<template>
  <div class="dropdown">
    <button class="dropdown-btn">
      {{ title }} <img src="../assets/dropdown_arrow.png" width="15px" height="15px" />
    </button>
    <div class="dropdown-content"></div>
  </div>
</template>

<style scoped>
.dropdown-btn {
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 15px;
  font-weight: bold;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-option {
  color: #000;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
