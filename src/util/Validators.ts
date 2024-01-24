import { helpers } from "@vuelidate/validators";

export const noSymbols = helpers.withMessage(
  "Can't contain symbols.",
  (val: string) => {
    console.log(val);
    const res = /^[^\^~`!@#\$%^*_+\[\]{}\\:;?|><=]+$/.test(val);
    console.log(res);
    return res;
  }
);

export const containsVue = helpers.withMessage(
  "Doesn't contain 'vue'.",
  (val: string) => !!val.toLowerCase().includes("vue")
);
