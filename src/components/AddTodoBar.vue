<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { noSymbols, containsVue } from "../util/Validators";
import ResponsiveTextbox from "./ResponsiveTextbox.vue";
import IconButton from "./IconButton.vue";

const addInput = defineModel<string>('');

const emit = defineEmits<{ (e: "submit", invalid: boolean): void }>();

const vuelidate = useVuelidate(
  {
    addInput: {
      required,
      noSymbols,
      containsVue,
    },
  },
  { addInput }
);

async function addRequest() {
  vuelidate.value.addInput.$touch();
  emit("submit", vuelidate.value.addInput.$error)
  if (!vuelidate.value.$error) {
    vuelidate.value.$reset()
  }
}

</script>

<template>
  <div class="flex-card add-card">

    <ResponsiveTextbox
      @keypress.enter="addRequest"
      placeholder="Todo..."
      v-model="addInput"
      class="add-text"
      :invalid="vuelidate.addInput.$invalid"
      :errors="vuelidate.addInput.$errors"
    />

    <IconButton @click="addRequest" class="base-button add-button">
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1, 0, 0, 1, -7.105427357601002e-15, 0)">
          <rect
            x="222.696"
            y="111.348"
            width="55.674"
            height="278.37"
            style="stroke: rgba(0, 0, 0, 0); fill: rgb(238, 238, 238)"
          />
          <rect
            x="293.972"
            y="111.348"
            width="55.674"
            height="278.37"
            style="
              transform-box: fill-box;
              transform-origin: 50% 50%;
              stroke: rgba(0, 0, 0, 0);
              fill: rgb(238, 238, 238);
            "
            transform="matrix(0, 1, -1, 0, -71.275978, -0.000006)"
          />
        </g>
      </svg>

    </IconButton>

  </div>
</template>

<style>

.add-text {
  margin-left: 1em;
  flex-grow: 10;
}

.add-card {
  min-width: 42vw;
  background-color: #222;
  justify-items: space-evenly;
  margin-left: 1vw;
  margin-right: 1vw;
  max-height: 6vh;
}
</style>