import {reactive } from '@vue/reactivity';
const errors = reactive({});
 import useValidators from "@/modules/Validators.js"
export default function useFormValidation(){
    const { isEmpty, minLength , isEmail, isNum} = useValidators();

      // Name validation 
    const validateNameField = (fieldName, fieldValue ) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 3)
     }

     // email validation 
     const validateEmailField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
    }

    const validatePhoneField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isNum(fieldName, fieldValue)
    }

    const validatePasswordField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4)
    }

    const validateCardNumberField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 1)
    }

    const validateDescriptionField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 15)
    }

    return { errors , validateNameField, validateEmailField, validatePhoneField, validatePasswordField, validateCardNumberField , validateDescriptionField}
}