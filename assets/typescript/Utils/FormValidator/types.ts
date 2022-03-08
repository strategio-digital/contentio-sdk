/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

export type RuleType = 'email' | 'phone' | 'max' | 'min' | 'required';

export type Field = {
    name: string;
    rules: Rule[];
}

export type Rule = {
    type: RuleType;
    message: string;
    param?: RuleParam;
}

export type RuleParam = {
    min?: number;
    max?: number;
}

export type SetupOptions = {
    hiddenClass: string;
    neutralClasses: string;
    errorClasses: string;
    alertIcon: string;
    alertSuccessBg: string;
    alertErrorBg: string;
    antispamMessage: string;
    antispamDelay: number;
}

export type ValidationError = {
    field: string;
    message: string;
}