import { NextRequest, NextResponse } from "next/server";
import { createContact, createOpportunity } from "@/lib/ghl";

/**
 * Contact Vendor API
 *
 * When an engineer/buyer wants to contact a supplier:
 * 1. Creates the buyer as a GHL contact
 * 2. Creates an opportunity in the vendor pipeline
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      senderName,
      senderEmail,
      senderCompany,
      vendorName,
      vendorId,
      subject,
      message,
    } = body as {
      senderName: string;
      senderEmail: string;
      senderCompany?: string;
      vendorName: string;
      vendorId: string;
      subject: string;
      message: string;
    };

    if (!senderEmail || !vendorName || !message) {
      return NextResponse.json(
        { error: "Missing required fields: senderEmail, vendorName, message" },
        { status: 400 }
      );
    }

    // Create buyer as contact in GHL
    const nameParts = senderName?.split(" ") || [""];
    const contact = await createContact({
      firstName: nameParts[0] || senderEmail.split("@")[0],
      lastName: nameParts.slice(1).join(" ") || "",
      email: senderEmail,
      companyName: senderCompany,
      tags: ["buyer", "contact-request", "allthingsmedtech"],
      source: "vendor_contact_form",
    });

    console.log(
      `[ATM] Contact request: ${senderEmail} -> ${vendorName} (${subject})`
    );

    return NextResponse.json({
      success: true,
      message: "Contact request sent successfully",
      contact,
    });
  } catch (err) {
    console.error("Contact vendor error:", err);
    return NextResponse.json(
      { error: "Failed to send contact request" },
      { status: 500 }
    );
  }
}
