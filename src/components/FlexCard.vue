<template>
  <div class="flex-card">
    <slot> </slot>
  </div>
</template>


<style>
.flex-card {
  display: flex;
  background-color: black;
  justify-self: center;
  justify-content: space-between;
  align-items: center;
  flex-flow: wrap;
  margin: 1%;
  padding: 1%;
  width: auto;
  border-radius: 20px;
  box-shadow: 2px 2px #00000077;
}

</style>