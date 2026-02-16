import { NextRequest, NextResponse } from "next/server";
import { createContact, findContactByEmail, updateContact } from "@/lib/ghl";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      website,
      tier,
      capabilities,
      certifications,
      source,
    } = body as {
      firstName?: string;
      lastName?: string;
      email: string;
      phone?: string;
      companyName?: string;
      website?: string;
      tier?: string;
      capabilities?: string[];
      certifications?: string[];
      source?: string;
    };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if contact already exists
    let existingContact: { contact?: { id: string } } | null = null;
    try {
      existingContact = (await findContactByEmail(email)) as {
        contact?: { id: string };
      };
    } catch {
      // Contact not found, proceed with creation
    }

    const tags = [
      "allthingsmedtech",
      tier ? `tier:${tier}` : "tier:explorer",
      source ? `source:${source}` : "source:website",
    ].filter(Boolean);

    if (existingContact?.contact?.id) {
      // Update existing contact
      const updated = await updateContact(existingContact.contact.id, {
        firstName,
        lastName,
        phone,
        companyName,
        website,
        tags,
      });

      return NextResponse.json({
        success: true,
        action: "updated",
        contact: updated,
      });
    }

    // Create new contact
    const contact = await createContact({
      firstName: firstName || email.split("@")[0],
      lastName: lastName || "",
      email,
      phone,
      companyName,
      website,
      tags,
      source: source || "website",
    });

    return NextResponse.json({
      success: true,
      action: "created",
      contact,
    });
  } catch (err) {
    console.error("GHL contact creation error:", err);
    return NextResponse.json(
      { error: "Failed to create/update contact" },
      { status: 500 }
    );
  }
}
