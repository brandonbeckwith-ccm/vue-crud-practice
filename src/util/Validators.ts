import { required, Validation } from "@vuelidate/validators"
import { Ref, ref } from "vue"

function todoValidator(val: string) {
  const lowered = val.toLowerCase()
  if (!lowered.includes("vue")) {
    return false
  } else if (lowered.match(/\W/)) {
    return false
  } else {
    return true
  }
}

export const textBoxValidationRules = {
  textbox: {required, todoValidator}
}
