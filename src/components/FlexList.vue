
<template>
  <div class="flex-list">
    <slot> </slot>
  </div>
</template>

<style>

.flex-list {
  display: flex;
  justify-content: space-around;
  flex-flow: column;
  width: auto;
  border-radius: 25px;
}

</style>