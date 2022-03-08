/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import {Field, SetupOptions, RuleParam, ValidationError} from "./types";

export interface IFormValidator {
    validate(form: HTMLFormElement, fields: Field[], onSuccess: Function): void;
    addAlert(form: HTMLFormElement, danger: boolean, message: string): void;
    clearAlerts(form: HTMLFormElement): void;
}

export default (setup?: SetupOptions): IFormValidator => {
    let countDownHash: null | string = (Math.random() + 1).toString(36).substring(7);

    let options: SetupOptions = {
        errorClasses: 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
        neutralClasses: 'border-gray-300 text-gray-900 placeholder-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
        alertSuccessBg: 'flex items-center text-white text-bold text-sm p-3 rounded bg-green-700',
        alertErrorBg: 'flex items-center text-white text-bold text-sm p-3 rounded bg-rose-700',
        alertIcon: '<svg class="mr-2 inline-block max-w-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>',
        hiddenClass: 'hidden',
        antispamMessage: 'Vyčkejte 15 vteřin a odešlete zprávu znovu. Tímto se bráníme proti spamu, děkujeme za pochopení.',
        antispamDelay: 15 * 1000
    }

    if (setup) {
        options = setup;
    }

    const timeout = setTimeout(() => {
        countDownHash = null;
        clearTimeout(timeout);
    }, options.antispamDelay);

    const validate = (form: HTMLFormElement, fields: Field[], onSuccess: Function): void => {
        (Array.from(form.querySelectorAll('input,textarea,select')) as HTMLInputElement[] | HTMLSelectElement[] | HTMLTextAreaElement[]).forEach(node => {
            node.addEventListener('keyup', () => {
                clearAlerts(form);
                validateForm(form, fields, true);
            });
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const errors = validateForm(form, fields, true);

            if (errors.length === 0 && !isAntispamReady()) {
                addAlert(form, true, options.antispamMessage);
                return 0;
            }

            if (errors.length === 0 && isAntispamReady()) onSuccess();
        });
    }

    const isValid = {
        email: (input: HTMLInputElement) => {
            if (input.value.trim().length === 0) {
                return true;
            }

            //return true;
            const regex = /^("([ !#-[\]-~]|\\[ -~])+"|[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?$/i
            return regex.exec(input.value);
        },
        phone: (input: HTMLInputElement) => {
            if (input.value.trim().length === 0) {
                return true;
            }

            const regex = /^(\+)*([0-9\s])+$/;
            return regex.exec(input.value); // true - valid
        },
        max: (input: HTMLInputElement, param: RuleParam) => {
            if (input.value.trim().length === 0) {
                return true;
            }

            if (!param.max) {
                throw `Missing 'max' parameter on input name="${input.name}"`
            }
            return input.value.trim().length <= param.max; // true - valid
        },
        min: (input: HTMLInputElement, param: RuleParam) => {
            if (!param.min) {
                throw `Missing 'min' parameter on input name="${input.name}"`
            }
            return input.value.trim().length >= param.min; // true - valid
        },
        required: (input: HTMLInputElement) => {
            return input.value.trim().length !== 0; // true - valid
        }
    }

    const showErrors = (form: HTMLFormElement, errors: ValidationError[]) => {
        const errorClasses = options.errorClasses.split(' ');
        const neutralClasses = options.neutralClasses.split(' ');

        errors.forEach(error => {
            const input = form.querySelector(`[name="${error.field}"]`) as HTMLInputElement;
            const group = input.closest('[data-v-group]') as HTMLElement | null;

            if (!group) {
                throw `Not found [data-v-group] element for input name="${input.name}"`
            }

            const message = group.querySelector('[data-v-message]') as HTMLElement | null;

            if (!message) {
                throw `Not found [data-v-message] element for input name="${input.name}"`
            }

            const icon = group.querySelector('[data-v-icon]') as HTMLElement | null;

            input.classList.add(...errorClasses);
            input.classList.remove(...neutralClasses);
            message.classList.remove(options.hiddenClass);
            message.innerText = error.message;

            if (icon) icon.classList.remove(options.hiddenClass);
        });
    }

    const clearErrors = (form: HTMLFormElement) => {
        const errorClasses = options.errorClasses.split(' ');
        const neutralClasses = options.neutralClasses.split(' ');

        (Array.from(form.querySelectorAll('input,textarea')) as HTMLInputElement[]).forEach(input => {
            input.classList.remove(...errorClasses);
            input.classList.add(...neutralClasses);
        });

        (Array.from(form.querySelectorAll('[data-v-message],[data-v-icon]')) as HTMLElement[]).forEach(node => {
            node.classList.add(options.hiddenClass);
        });
    }

    const validateForm = (form: HTMLFormElement, fields: Field[], renderErrors: boolean) => {
        let errors: ValidationError[] = [];

        fields.forEach((field) => {
            const input = form.querySelector(`[name="${field.name}"]`) as HTMLInputElement | null;

            if (!input) {
                throw `Input [name="${field.name}"] does not exists.`;
            }

            field.rules.forEach(rule => {
                //@ts-ignore
                const valid = isValid[rule.type](input, rule.param);

                if (!valid) {
                    errors.push({field: field.name, message: rule.message});
                }
            });
        });

        if (renderErrors) {
            clearErrors(form);
            showErrors(form, errors);
        }

        return errors;
    }

    const addAlert = (form: HTMLFormElement, danger: boolean, message: string):void => {
        const className = danger ? options.alertErrorBg : options.alertSuccessBg;
        const alerts = form.querySelector('[data-v-alerts]') as HTMLElement | null;

        if (!alerts) {
            throw `Not found [data-v-alerts] element for ${form}`;
        }

        alerts.classList.remove(options.hiddenClass);
        alerts.innerHTML = `<div class="${className}">${danger ? options.alertIcon : ''} <span>${message}</span></div>`;
    }

    const clearAlerts = (form: HTMLFormElement): void => {
        const alerts = (form.querySelector('[data-v-alerts]') as HTMLElement | null);

        if (!alerts) {
            throw `Not found [data-v-alerts] element for ${form}`;
        }

        alerts.classList.add(options.hiddenClass);
        alerts.innerText = '';
    }

    const isAntispamReady = () => countDownHash === null;

    return { validate, addAlert, clearAlerts }
}