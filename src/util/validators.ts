import { helpers } from "@vuelidate/validators";

export const noSymbols = helpers.withMessage(
  "Can't contain symbols.",
  (val: string) => {
    const res = /^[^\^~`!@#\$%^*_+\[\]{}\\:;?|><=]+$/.test(val);
    return res;
  }
);

export const containsVue = helpers.withMessage(
  "Doesn't contain 'vue'.",
  (val: string) => !!val.toLowerCase().includes("vue")
);
