import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ATM product/price IDs (live)
export const STRIPE_PRODUCTS = {
  explorer: {
    productId: "prod_TzInigZ5JSQhj5",
    priceId: null, // Free tier
    name: "Explorer",
    price: 0,
    interval: null,
  },
  catalyst: {
    productId: "prod_TzIneC4bN3sCpK",
    priceId: "price_1T1KCJ819MSanIA9dI5rnRyL",
    name: "Catalyst",
    price: 499,
    interval: "year" as const,
  },
  titan: {
    productId: "prod_TzInXhUSh1Dau3",
    priceId: "price_1T1KCK819MSanIA90C62FUuV",
    name: "Titan",
    price: 2499,
    interval: "year" as const,
  },
} as const;

export type TierKey = keyof typeof STRIPE_PRODUCTS;
