/**
 * GoHighLevel API Client for AllThingsMedTech
 *
 * Uses the Agency-level API key for location reads.
 * For contact/pipeline/form operations, a Private Integration Token
 * scoped to the ATM sub-account is required.
 *
 * API Docs: https://highlevel.stoplight.io/docs/integrations
 */

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "";

interface GHLRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  version?: "v1" | "v2";
}

async function ghlFetch<T = unknown>(
  path: string,
  opts: GHLRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, version = "v2" } = opts;

  const url = `${GHL_BASE}/${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${GHL_API_KEY}`,
    "Content-Type": "application/json",
    Version: version === "v2" ? "2021-07-28" : "2021-04-15",
  };

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GHL API ${method} ${path} failed (${res.status}): ${errorText}`);
  }

  return res.json() as Promise<T>;
}

// ─── Contact Operations ───────────────────────────────

export interface CreateContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  website?: string;
  tags?: string[];
  customFields?: Array<{ id: string; value: string }>;
  source?: string;
}

export async function createContact(data: CreateContactPayload) {
  return ghlFetch("contacts/", {
    method: "POST",
    body: {
      ...data,
      locationId: GHL_LOCATION_ID,
    },
  });
}

export async function updateContact(
  contactId: string,
  data: Partial<CreateContactPayload>
) {
  return ghlFetch(`contacts/${contactId}`, {
    method: "PUT",
    body: data,
  });
}

export async function findContactByEmail(email: string) {
  return ghlFetch(
    `contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(email)}`
  );
}

// ─── Pipeline / Opportunity Operations ────────────────

export interface CreateOpportunityPayload {
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  name: string;
  monetaryValue?: number;
  status?: "open" | "won" | "lost" | "abandoned";
}

export async function createOpportunity(data: CreateOpportunityPayload) {
  return ghlFetch("opportunities/", {
    method: "POST",
    body: {
      ...data,
      locationId: GHL_LOCATION_ID,
    },
  });
}

// ─── Custom Fields ────────────────────────────────────

export async function getCustomFields() {
  return ghlFetch(
    `locations/${GHL_LOCATION_ID}/customFields`
  );
}

export async function createCustomField(data: {
  name: string;
  dataType: "TEXT" | "LARGE_TEXT" | "NUMERICAL" | "SINGLE_OPTIONS" | "MULTIPLE_OPTIONS";
  options?: string[];
}) {
  return ghlFetch(`locations/${GHL_LOCATION_ID}/customFields`, {
    method: "POST",
    body: data,
  });
}

// ─── Pipeline Management ──────────────────────────────

export async function getPipelines() {
  return ghlFetch(
    `opportunities/pipelines?locationId=${GHL_LOCATION_ID}`
  );
}

export async function createPipeline(data: {
  name: string;
  stages: Array<{ name: string; position: number }>;
}) {
  return ghlFetch("opportunities/pipelines", {
    method: "POST",
    body: {
      ...data,
      locationId: GHL_LOCATION_ID,
    },
  });
}

// ─── Location Info ────────────────────────────────────

export async function getLocationInfo() {
  return ghlFetch(`locations/${GHL_LOCATION_ID}`);
}

// ─── Constants ────────────────────────────────────────

export { GHL_LOCATION_ID, GHL_BASE };
