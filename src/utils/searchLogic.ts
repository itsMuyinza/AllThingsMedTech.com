import { companies, Company } from "@/data/companies";

interface SearchResult {
  company: Company;
  score: number;
  matchReasons: string[];
}

const REGULATORY_TERMS: Record<string, string[]> = {
  "510(k)": ["510k", "510(k)", "premarket notification"],
  PMA: ["pma", "premarket approval"],
  "De Novo": ["de novo", "denovo"],
  "CE Mark": ["ce mark", "ce", "european"],
  Breakthrough: ["breakthrough", "breakthrough device"],
};

const THERAPEUTIC_TERMS: Record<string, string[]> = {
  Cardiovascular: ["cardio", "cardiac", "heart", "valve", "stent", "tavr", "ablation"],
  Neuroscience: ["neuro", "brain", "bci", "stroke", "spine", "spinal"],
  Orthopedics: ["ortho", "joint", "knee", "hip", "bone", "implant"],
  Diabetes: ["diabetes", "cgm", "glucose", "insulin"],
  Diagnostics: ["diagnostic", "imaging", "ultrasound", "ct", "mri"],
  Robotics: ["robot", "robotic", "surgical robot", "da vinci", "mako"],
  Oncology: ["cancer", "oncology", "tumor", "immunotherapy"],
  "Gene Therapy": ["gene", "crispr", "mrna", "cell therapy"],
  Urology: ["urology", "prostate", "bph", "bladder"],
  Neuromodulation: ["neuromod", "stimulator", "spinal cord stimulation", "scs", "pain"],
};

const STAGE_TERMS: Record<string, string[]> = {
  Seed: ["seed"],
  "Series A": ["series a"],
  "Series B": ["series b"],
  "Series C": ["series c", "series d", "late stage"],
  Public: ["public", "ipo", "nasdaq", "nyse"],
  Acquired: ["acquired", "acquisition", "m&a"],
};

export function searchCompanies(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const tokens = tokenize(q);
  const results: SearchResult[] = [];

  for (const company of companies) {
    let score = 0;
    const reasons: string[] = [];

    // Direct name match (+30)
    if (company.name.toLowerCase().includes(q) || company.slug.includes(q.replace(/\s+/g, "-"))) {
      score += 30;
      reasons.push("Name match");
    }

    // Regulatory match (+20 each)
    for (const [reg, terms] of Object.entries(REGULATORY_TERMS)) {
      if (terms.some((t) => tokens.includes(t) || q.includes(t))) {
        if (company.approvalStatus.some((s) => s.toLowerCase().includes(reg.toLowerCase()))) {
          score += 20;
          reasons.push(`Regulatory: ${reg}`);
        }
      }
    }

    // Therapeutic area match (+15 each)
    for (const [area, terms] of Object.entries(THERAPEUTIC_TERMS)) {
      if (terms.some((t) => q.includes(t))) {
        const companyAreas = `${company.therapeuticArea} ${company.sector} ${company.description}`.toLowerCase();
        if (terms.some((t) => companyAreas.includes(t))) {
          score += 15;
          reasons.push(`Therapeutic: ${area}`);
        }
      }
    }

    // Stage match (+10)
    for (const [stage, terms] of Object.entries(STAGE_TERMS)) {
      if (terms.some((t) => q.includes(t))) {
        if (company.stage.toLowerCase().includes(stage.toLowerCase())) {
          score += 10;
          reasons.push(`Stage: ${stage}`);
        }
      }
    }

    // Keyword match in description (+5)
    for (const token of tokens) {
      if (token.length > 2 && company.description.toLowerCase().includes(token)) {
        score += 5;
        reasons.push(`Keyword: ${token}`);
      }
    }

    // Sector match (+10)
    for (const token of tokens) {
      if (token.length > 2 && company.sector.toLowerCase().includes(token)) {
        score += 10;
        reasons.push(`Sector: ${company.sector}`);
      }
    }

    if (score > 0) {
      results.push({ company, score, matchReasons: [...new Set(reasons)] });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

function tokenize(query: string): string[] {
  // Keep multi-word terms like "series a", "510(k)", "de novo"
  const multiWord = [
    "series a", "series b", "series c", "series d",
    "510(k)", "510k", "de novo", "ce mark",
    "spinal cord", "gene therapy", "cell therapy",
  ];

  const found: string[] = [];
  let remaining = query.toLowerCase();

  for (const term of multiWord) {
    if (remaining.includes(term)) {
      found.push(term);
      remaining = remaining.replace(term, " ");
    }
  }

  const words = remaining.split(/\s+/).filter((w) => w.length > 1);
  return [...found, ...words];
}

export function generateInsight(results: SearchResult[], query: string): string {
  if (results.length === 0) return "No companies found matching your query.";
  const top = results[0];
  const sectors = [...new Set(results.slice(0, 3).map((r) => r.company.sector))];
  return `Identified ${top.company.name} based on your interest in ${sectors.join(" & ")} innovation.`;
}
