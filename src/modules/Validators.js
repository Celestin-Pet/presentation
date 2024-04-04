export default function useValidators() {

  // validation of the empty inputs
    const isEmpty = (fieldName, fieldValue) => {
     return !fieldValue ? "C'est champ est réquis" : "";
    }
  
    const minLength = (fieldName, fieldValue, min) => {       
         return fieldValue.length < min ? `C'est champ doit avoi au moins  ${min} caractères` : "";
   }
// email validation 
   const isEmail = (fieldName, fieldValue) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(fieldValue) ? "cette adresse mail n'est pas valide" : "";
  }

  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);    
    return !isNum ? "c'est n'accepte que le chiffre " : "";
  }
   return {isEmpty, minLength, isEmail, isNum}
 }