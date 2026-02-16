import { NextRequest, NextResponse } from "next/server";

/**
 * GHL Webhook Receiver
 *
 * Receives events from GoHighLevel:
 * - Contact created/updated
 * - Opportunity stage changed
 * - Form submissions
 * - Appointment events
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("[ATM] GHL Webhook received:", JSON.stringify(body, null, 2));

    const eventType = body.type || body.event;

    switch (eventType) {
      case "ContactCreate":
      case "ContactUpdate":
        console.log(`[ATM] Contact ${eventType}: ${body.contact?.email}`);
        break;

      case "OpportunityStageUpdate":
        console.log(
          `[ATM] Opportunity stage: ${body.opportunity?.name} -> ${body.opportunity?.stage?.name}`
        );
        break;

      case "FormSubmission":
        console.log(`[ATM] Form submitted: ${body.form?.name}`);
        break;

      default:
        console.log(`[ATM] Unhandled GHL event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("GHL webhook error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
