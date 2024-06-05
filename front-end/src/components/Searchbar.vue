<script></script>
<template>
  <div class="search">
    <input class="searchbar" type="search" placeholder="Search" />
    <div class="result-list">
      <div>result 1</div>
      <div>result 2</div>
      <div>result 3</div>
    </div>
  </div>
</template>

<style scoped>
.search {
  width: 75%;
}

.searchbar {
  width: 100%;
  padding: 10px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
  font-size: 1.9rem;
  background-color: #fff;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.result-list {
  display: none;
  width: 72.5%;
  position: absolute;
  /* top: 1rem; */
  padding: 1rem 0rem 0rem 0rem;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  transform: translate(0, -1rem);
  grid-template-rows: auto;
  z-index: 1;
}

.searchbar:focus {
  border: 3px solid #000;
  background-color: #f00;
}

.result-list div {
  background-color: #f9f9f9;
  color: #000;
  padding: 0.5rem;
  font-size: 1.4rem;
  text-decoration: none;
  cursor: pointer;
}

.result-list div:hover {
  background-color: #e0e0e0;
}

.searchbar:focus .result-list,
.result-list:hover {
  display: grid;
}
</style>
