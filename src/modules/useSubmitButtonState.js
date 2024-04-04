import { computed } from "vue";
export default function useSubmitButtonState(form, errors) {
    const isSignupButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in form) {
            if (!form[prop] || errors[prop]) {
                disabled = true;
                break;
            }
            disabled = false;
        }
        return disabled;
    });
    return { isSignupButtonDisabled }
}