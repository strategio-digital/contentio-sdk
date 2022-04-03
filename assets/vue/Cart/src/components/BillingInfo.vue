<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Form, Field, ErrorMessage} from "vee-validate";
import Summary from "./Summary.vue";
import {store} from "../../../store";
import {Switch, SwitchGroup, SwitchLabel} from "@headlessui/vue";
import {defineRules} from "../../../Plugins/vee-validate";

// TODO dát na nějaké rozumné místo
defineRules();

@Options({
    components: {
        Summary,
        Field,
        Form,
        Switch,
        SwitchGroup,
        SwitchLabel,
        ErrorMessage,
    }
})
export default class BillingInfo extends Vue {
    private store = store;

    private hasDifferentDeliveryAddress = false;

    private hasIc = false;

    private hasDic = false;

    private formData = {
        contact: {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
        },
        company: {
            name: '',
            ic: '',
            dic: '',
        },
        billing: {
            street: '',
            city: '',
            zip: '',
            country: this.store.deliveryCountryId,
        },
        delivery: {
            name: '',
            note: '',
            street: '',
            city: '',
            zip: '',
            country: this.store.deliveryCountryId,
            phone: '',
        },
        message: '',
    };

    private async onSubmit(): Promise<void> {
        console.log('handle form submit', this.formData);
    }

    private log = console.log;
}
</script>

<template>
    <Form @submit="onSubmit" v-slot="{ errors }">
        {{ log(errors) }}
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 pb-20">
            <div>
                <div class="contact-information">
                    <h2 class="text-lg font-medium text-gray-900">Kontaktní údaje</h2>

                    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <label for="email-address" class="block text-sm font-medium text-gray-700">Zadejte e-mail
                                *</label>
                            <div class="mt-1">
                                <Field
                                    rules="email|required|hasA"
                                    v-model="formData.contact.email"
                                    type="email" id="email-address" name="email-address" autocomplete="email"
                                    class="block w-full border-red border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['email-address']}"
                                />
                                <ErrorMessage name="email-address">
                                    <span class="text-red-500">{{ errors['email-address'] }}</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700">Zadejte telefon *</label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.contact.phone"
                                    type="text" name="phone" id="phone" autocomplete="tel"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['phone']}"
                                />
                                <ErrorMessage name="phone">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <label for="first-name" class="block text-sm font-medium text-gray-700">Zadejte křestní
                                jméno *</label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.contact.firstName"
                                    type="text" id="first-name" name="first-name" autocomplete="given-name"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['first-name']}"
                                />
                                <ErrorMessage name="first-name">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Zadejte příjmení
                                *</label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.contact.lastName"
                                    type="text" id="last-name" name="last-name" autocomplete="family-name"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['last-name']}"
                                />
                                <ErrorMessage name="last-name">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="company-information mt-10 border-t border-gray-200 pt-10">
                    <h2 class="text-lg font-medium text-gray-900">Nakupuji na firmu</h2>

                    <SwitchGroup as="div" class="mt-4 flex items-center">
                        <Switch
                            v-model="hasIc"
                            :class="[hasIc ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']"
                        >
                            <span
                                aria-hidden="true"
                                :class="[hasIc ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"
                            />
                        </Switch>
                        <SwitchLabel as="span" class="ml-3">
                            <span class="text-sm font-medium text-gray-900">Zvolte, pokud potřebujete vyplnit IČ, případně DIČ.</span>
                        </SwitchLabel>
                    </SwitchGroup>

                    <div v-if="hasIc">
                        <div class="mt-6 sm:col-span-2">
                            <label for="company" class="block text-sm font-medium text-gray-700">Zadejte obchodní
                                jméno</label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.company.name"
                                    type="text" name="company" id="company"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['company']}"
                                />
                                <ErrorMessage name="company">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <SwitchGroup as="div" class="mt-4 flex items-center">
                            <Switch
                                v-model="hasDic"
                                :class="[hasDic ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']"
                            >
                                    <span
                                        aria-hidden="true"
                                        :class="[hasDic ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"
                                    />
                            </Switch>
                            <SwitchLabel as="span" class="ml-3">
                                <span class="text-sm font-medium text-gray-900">Zvolte, pokud jste plátce DPH.</span>
                            </SwitchLabel>
                        </SwitchGroup>

                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label for="company-ic" class="block text-sm font-medium text-gray-700">Zadejte IČ
                                    *</label>
                                <div class="mt-1">
                                    <Field
                                        rules="required"
                                        v-model="formData.company.ic"
                                        type="email" id="company-ic" name="company-ic" autocomplete="ic"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        :class="{'border-red-500': errors['company-ic']}"
                                    />
                                    <ErrorMessage name="company-ic">
                                        <span class="text-red-500">Tato položka je povinná</span>
                                    </ErrorMessage>
                                </div>
                            </div>

                            <div>
                                <label for="company-dic" class="block text-sm font-medium text-gray-700">Zadejte
                                    DIČ</label>
                                <div class="mt-1">
                                    <Field
                                        :disabled="!hasDic"
                                        v-model="formData.company.dic"
                                        type="text" name="company-dic" id="company-dic" autocomplete="dic"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="billing-information mt-10 border-t border-gray-200 pt-10">
                    <h2 class="text-lg font-medium text-gray-900">Fakturační údaje</h2>

                    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <label for="billing-street" class="block text-sm font-medium text-gray-700">
                                Zadejte ulici a Č.P. *
                            </label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.billing.street"
                                    type="email" id="billing-street" name="billing-street" autocomplete="billing-street"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['billing-street']}"
                                />
                                <ErrorMessage name="billing-street">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <label for="billing-city" class="block text-sm font-medium text-gray-700">Zadejte obec
                                *</label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.billing.city"
                                    type="text" name="billing-city" id="billing-city" autocomplete="billing-city"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['billing-city']}"
                                />
                                <ErrorMessage name="billing-city">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <label for="billing-zip" class="block text-sm font-medium text-gray-700">
                                Zadejte PSČ *
                            </label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.billing.zip"
                                    type="text" id="billing-zip" name="billing-zip" autocomplete="billing-zip"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['billing-zip']}"
                                />
                                <ErrorMessage name="billing-zip">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <label for="billing-country" class="block text-sm font-medium text-gray-700">
                                Vyberte zemi *
                            </label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.billing.country"
                                    as="select" id="billing-country" name="billing-country"
                                    autocomplete="billing-country"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    :class="{'border-red-500': errors['billing-country']}"
                                >
                                    <option value="1">Česká Republika</option>
                                    <option value="1">Slovenská Republika</option>
                                </Field>
                                <ErrorMessage name="billing-country">
                                    <span class="text-red-500">Tato položka je povinná</span>
                                </ErrorMessage>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="delivery-information mt-10 border-t border-gray-200 pt-10">
                    <h2 class="text-lg font-medium text-gray-900">Rozdílná dodací adresa</h2>

                    <SwitchGroup as="div" class="mt-4 flex items-center">
                        <Switch
                            v-model="hasDifferentDeliveryAddress"
                            :class="[hasDifferentDeliveryAddress ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']"
                        >
                            <span
                                aria-hidden="true"
                                :class="[hasDifferentDeliveryAddress ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"
                            />
                        </Switch>
                        <SwitchLabel as="span" class="ml-3">
                            <span class="text-sm font-medium text-gray-900">Zvolte, pokud jsou rozdílné dodací a fakturační údaje.</span>
                        </SwitchLabel>
                    </SwitchGroup>

                    <div v-if="hasDifferentDeliveryAddress">
                        <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label for="delivery-name" class="block text-sm font-medium text-gray-700">
                                    Zadejte adresáta *
                                </label>
                                <div class="mt-1">
                                    <Field
                                        rules="required"
                                        v-model="formData.delivery.name"
                                        type="email" id="delivery-name" name="delivery-name"
                                        autocomplete="delivery-name"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="delivery-note" class="block text-sm font-medium text-gray-700">Zadejte
                                    firmu, byt, patro</label>
                                <div class="mt-1">
                                    <Field
                                        v-model="formData.delivery.note"
                                        type="text" name="delivery-note" id="delivery-note" autocomplete="delivery-note"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="delivery-street" class="block text-sm font-medium text-gray-700">
                                    Zadejte ulici a Č.P. *
                                </label>
                                <div class="mt-1">
                                    <Field
                                        rules="required"
                                        v-model="formData.delivery.street"
                                        type="email" id="delivery-street" name="delivery-street"
                                        autocomplete="delivery-street"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="delivery-city" class="block text-sm font-medium text-gray-700">Zadejte obec
                                    *</label>
                                <div class="mt-1">
                                    <Field
                                        rules="required"
                                        v-model="formData.delivery.city"
                                        type="text" name="delivery-city" id="delivery-city" autocomplete="delivery-city"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="delivery-zip" class="block text-sm font-medium text-gray-700">
                                    Zadejte PSČ *
                                </label>
                                <div class="mt-1">
                                    <Field
                                        rules="required"
                                        v-model="formData.delivery.zip"
                                        type="text" id="delivery-zip" name="delivery-zip" autocomplete="delivery-zip"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="delivery-country" class="block text-sm font-medium text-gray-700">
                                    Vyberte zemi *
                                </label>
                                <div class="mt-1">
                                    <Field
                                        rules="required"
                                        v-model="formData.delivery.country"
                                        as="select" id="delivery-country" name="delivery-country"
                                        autocomplete="delivery-country"
                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="1">Česká Republika</option>
                                        <option value="1">Slovenská Republika</option>
                                    </Field>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            <label for="delivery-phone" class="block text-sm font-medium text-gray-700">Zadejte telefon
                                *</label>
                            <div class="mt-1">
                                <Field
                                    rules="required"
                                    v-model="formData.delivery.phone"
                                    type="text" name="delivery-phone" id="delivery-phone" autocomplete="delivery-phone"
                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-message mt-10 border-t border-gray-200 pt-10">
                    <h2 class="text-lg font-medium text-gray-900">Ještě něco, co bychom měli vědět?</h2>

                    <label for="message" class="mt-4 block text-sm font-medium text-gray-700">Zde můžete popsat Váš
                        požadavek</label>
                    <div class="mt-1">
                        <Field
                            v-model="formData.message"
                            as="textarea" name="message" id="message" autocomplete="message"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <Summary>
                <template #button>
                    <button
                        type="submit"
                        class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                        Dokončit nákup
                    </button>
                </template>
            </Summary>
        </div>
    </Form>
</template>
