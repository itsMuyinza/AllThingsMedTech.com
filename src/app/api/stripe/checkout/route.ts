import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRODUCTS, TierKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, email, companyName } = body as {
      tier: TierKey;
      email: string;
      companyName?: string;
    };

    const product = STRIPE_PRODUCTS[tier];
    if (!product || !product.priceId) {
      return NextResponse.json(
        { error: "Invalid tier or free tier selected" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        tier,
        companyName: companyName || "",
        brand: "allthingsmedtech",
      },
      success_url: `${appUrl}/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/join?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
