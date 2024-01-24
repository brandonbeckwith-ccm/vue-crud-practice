<script setup lang="ts">


</script>

<template>
  <button
    @click="$emit($event.type, $event)"
    class="base-button"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button:first-of-type {
  margin-left: 0.5em;
}

.base-button:last-of-type {
  margin-right: 0.6em;
}

.base-button {
  max-width: 50px;
  max-height: 50px;
  border-radius: 10px;
  transition: 0.25s;
  border-color: transparent;
}

.base-button:active {
  transform: scale(0.85);
  box-shadow: 3px, 2px, 22px, 1px rgba(0, 0, 0, 0.5);
}

.base-button:hover {
  filter: brightness(90%);
}

</style>
