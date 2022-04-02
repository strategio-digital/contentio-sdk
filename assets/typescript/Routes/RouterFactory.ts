/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

type RouterFactory = {
    cart: string;
    product_detail: Function;
};

export const RouterFactory: RouterFactory = {
    cart: '/kosik',
    product_detail: (slug: string) => '/produkty/' + slug,
};
