/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

declare namespace Stripe {
    type ElementType = "card" | "cardNumber" | "cardExpiry" | "cardCvc" |
        "paymentRequestButton" | "iban";

    interface Element {
        mount: (selectorOrElement: string | HTMLElement) => any;
        on: (event: "change" | "blur" | "click" | "focus" | "ready", handler: (event: any) => any) => void;
        destroy(): () => void;
        addEventListener: (event: "change" | "blur" | "click" | "focus" | "ready", handler: (event: any) => any) => void;
        removeEventListener: (event: "change" | "blur" | "click" | "focus" | "ready", handler: (event: any) => any) => void;
    }

    interface Token {
        id: string;
        object: "token";
    }

    interface Elements {
        create: (type: ElementType, options?: object) => Element;
    }

    interface PaymentRequestOptions {
        country: string;
        currency: string;
        total: {
            amount: number;
            label: string;
            pending?: boolean;
        },
        displayItems?: {
            amount: number;
            label: string;
            pending?: boolean;
        }[],
        requestPayerName?: boolean;
        requestPayerEmail?: boolean;
        requestPayerPhone?: boolean;
        requestShipping?: boolean;
    }

    interface PaymentRequest {
        canMakePayment(): Promise<any>;
        show(): void;
        update(): void;
        on(event: string, handler: (error, info) => void);
    }
}

interface Stripe {
    elements: () => Stripe.Elements;
    /** Creates a token from an element and other elements,
     *  with optional data collected such cardholder name
     * */
    createToken: (element: Stripe.Element | "bank_account", data?: object) => Promise<{ token: Stripe.Token, error: any}>;
    createSource: () => any;
    retrieveSource: () => any;
    paymentRequest: (options: Stripe.PaymentRequestOptions) => Stripe.PaymentRequest;
}

declare var Stripe: (key: string) => Stripe;
