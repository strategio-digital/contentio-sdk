import { defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

// docs: https://vee-validate.logaretm.com/v4/guide/global-validators
export const defineRules = () => {
    // Default rules from @vee-validate/rules
    defineRule('required', required);
    defineRule('email', email);

    // Example custom rule
    defineRule('hasA', (value: string) => {
        if (value.indexOf('a') < 0) {
            return 'Toto pole vyžaduje znak a';
        }
        return true;
    });
}
