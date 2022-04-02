export type CreatedATType = {
    date: string;
    timezone: string;
    timezone_type: number;
};

export type UpdatedAtType = CreatedATType;

export type LastOrderAtType = CreatedATType;

export type CartType = {
    cartItems: {
        id: number;
        product: ProductType;
        quantity: number;
    }[];
    createdAt: CreatedATType;
    deliveryMethod?: DeliveryMethodType;
    email: string;
    firstName: string;
    guid: string;
    id: number;
    lastName: string;
    paymentMethod?: PaymentMethodType;
    phone: string;
    updatedAt: UpdatedAtType;
};

export type PaymentMethodType = {
    active: boolean;
    currency?: {
        code: string;
        exchangeRatio: number;
        id: number;
        name: string;
        primary: boolean;
        symbol: string;
        updatedAt: {
            date: string;
            timezone_type: number;
            timezone: string;
        };
    };
    description: string;
    id: number;
    name: string;
    params: unknown;
    price: number;
    tax?: {
        description: string;
        id: number;
        percentageZone: number;
        primary: boolean;
        shortcut: string;
    };
    type: string;
};

export type PaymentMethodsType = PaymentMethodType[];

export type DeliveryMethodType = {
    active: boolean;
    currency?: {
        code: string;
        exchangeRatio: number;
        id: number;
        name: string;
        primary: boolean;
        symbol: string;
        updatedAt: {
            date: string;
            timezone_type: number;
            timezone: string;
        };
    };
    description: string;
    excludedPaymentMethods?: PaymentMethodsType;
    id: number;
    name: string;
    params: unknown;
    price: number;
    tax?: {
        description: string;
        id: number;
        percentageZone: number;
        primary: boolean;
        shortcut: string;
    };
    type: string;
};

export type DeliveryMethodsType = DeliveryMethodType[];

export type ProductType = {
    adultsOnly: boolean;
    atypicalDelivery: boolean;
    atypicalPayment: boolean;
    cartLimit?: number;
    createdAt: CreatedATType;
    deliveryFree: boolean;
    depth?: number;
    descriptionLong?: string;
    descriptionShort?: string;
    height?: number;
    id: number;
    lastOrderAt?: null;
    measureUnit: {
        id: number;
        unit: string;
        description: string;
    };
    minimumSellingPrice?: number;
    name?: string;
    openGraphDescription?: string;
    openGraphTitle?: string;
    paymentFree: boolean;
    prices: {
        basicPrice: number;
        discountPrice: number;
        product_id: number;
        currency_id: number;
        user_group_id: number;
    }[];
    purchaseAllowed: boolean;
    purchasePrice?: number;
    seoDescription?: number;
    seoTitle?: string;
    slug: string;
    stockClaimedAmount?: number;
    stockMinimumAmount?: number;
    stockNegativeAmount: boolean;
    updatedAt: UpdatedAtType;
    date: string;
    timezone: string;
    timezone_type: number;
    visible: boolean;
    weight?: number;
    width?: number;
};
