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
}

interface Stripe {
    elements: () => Stripe.Elements;
    /** Creates a token from an element and other elements,
     *  with optional data collected such cardholder name
     * */
    createToken: (element: Stripe.Element | "bank_account", data?: object) => Promise<Stripe.Token>;
    createSource: () => any;
    retrieveSource: () => any;
    paymentRequest: () => any;
}

declare var Stripe: (key: string) => Stripe;
