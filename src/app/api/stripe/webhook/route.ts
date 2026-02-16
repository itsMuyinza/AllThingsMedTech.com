import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Disable body parsing — Stripe needs raw body for signature verification
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  // If webhook secret is configured, verify the signature
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // In development without webhook secret, parse directly
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { tier, companyName } = session.metadata || {};
        const email = session.customer_email;

        console.log(
          `[ATM] Checkout complete: ${email} -> ${tier} (${companyName})`
        );

        // Sync to GHL: update contact tier
        if (email && tier) {
          try {
            const ghlRes = await fetch(
              `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/ghl/contact`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  tier,
                  companyName,
                  source: "stripe_checkout",
                }),
              }
            );
            if (!ghlRes.ok) {
              console.error("[ATM] GHL sync failed:", await ghlRes.text());
            }
          } catch (ghlErr) {
            console.error("[ATM] GHL sync error:", ghlErr);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log(
          `[ATM] Subscription updated: ${subscription.id} -> ${subscription.status}`
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log(
          `[ATM] Subscription canceled: ${subscription.id}`
        );
        // TODO: Update GHL contact tier back to Explorer
        break;
      }

      default:
        console.log(`[ATM] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
