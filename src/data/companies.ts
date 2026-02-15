export interface FDADevice {
  name: string;
  code: string; // 510(k), PMA, De Novo
  class: "I" | "II" | "III";
  status: "Cleared" | "Approved" | "Pending" | "Breakthrough";
  date: string;
}

export interface FundingRound {
  round: string;
  amount: string;
  date: string;
  investors: string[];
}

export interface ClinicalTrial {
  name: string;
  phase: string;
  status: "Recruiting" | "Completed" | "Active" | "Terminated";
  location: string;
}

export interface Job {
  title: string;
  department: string;
  location: string;
  salary: string;
  equity: string;
  tags: string[];
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  ticker?: string;
  logo?: string;
  description: string;
  sector: string;
  therapeuticArea: string;
  hq: string;
  ceo: string;
  founded: number;
  employees: string;
  website: string;
  totalFunding: string;
  stage: string; // "Public", "Series A", "Series B", etc.
  approvalStatus: string[]; // "510(k)", "PMA", "CE Mark", etc.
  badges: string[];
  fdaDevices: FDADevice[];
  fundingHistory: FundingRound[];
  clinicalTrials: ClinicalTrial[];
  jobs: Job[];
  newsVolume: number[]; // last 12 months relative
  stockPrice?: number;
  stockChange?: number;
}

export const companies: Company[] = [
  {
    id: "1",
    slug: "medtronic",
    name: "Medtronic",
    ticker: "MDT",
    description: "Global leader in medical technology, services, and solutions. Pioneer in cardiac pacing, spinal surgery, insulin pumps, and surgical navigation.",
    sector: "Diversified MedTech",
    therapeuticArea: "Cardiovascular, Neuroscience, Diabetes",
    hq: "Dublin, Ireland / Minneapolis, MN",
    ceo: "Geoff Martha",
    founded: 1949,
    employees: "95,000+",
    website: "medtronic.com",
    totalFunding: "Public (NYSE: MDT)",
    stage: "Public",
    approvalStatus: ["510(k)", "PMA", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark", "Fortune 500"],
    fdaDevices: [
      { name: "MiniMed 780G Insulin Pump", code: "510(k)", class: "III", status: "Cleared", date: "2023-04-15" },
      { name: "Hugo RAS System", code: "PMA", class: "III", status: "Pending", date: "2024-01-20" },
      { name: "Micra AV Pacemaker", code: "PMA", class: "III", status: "Approved", date: "2022-09-10" },
      { name: "StealthStation S8", code: "510(k)", class: "II", status: "Cleared", date: "2023-11-05" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "$1.2B", date: "1977", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "HUGO RAS Pivotal Trial", phase: "Phase III", status: "Recruiting", location: "US, EU" },
      { name: "Simplera CGM Study", phase: "Phase II", status: "Completed", location: "US" },
    ],
    jobs: [
      { title: "Senior Robotics Engineer", department: "Surgical Robotics", location: "Minneapolis, MN", salary: "$150K-$190K", equity: "RSUs", tags: ["Robotics", "AI/ML", "C++"] },
      { title: "Regulatory Affairs Manager", department: "Quality", location: "Dublin, Ireland", salary: "$120K-$150K", equity: "RSUs", tags: ["FDA", "CE Mark", "ISO 13485"] },
    ],
    newsVolume: [45, 52, 38, 61, 55, 72, 48, 65, 58, 70, 63, 80],
    stockPrice: 88.45,
    stockChange: 2.3,
  },
  {
    id: "2",
    slug: "intuitive-surgical",
    name: "Intuitive Surgical",
    ticker: "ISRG",
    description: "Pioneer and global leader in robotic-assisted minimally invasive surgery. Creator of the da Vinci surgical system with 9M+ procedures performed worldwide.",
    sector: "Surgical Robotics",
    therapeuticArea: "General Surgery, Urology, Gynecology",
    hq: "Sunnyvale, CA",
    ceo: "Gary Guthart",
    founded: 1995,
    employees: "12,000+",
    website: "intuitive.com",
    totalFunding: "Public (NASDAQ: ISRG)",
    stage: "Public",
    approvalStatus: ["510(k)", "PMA", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark", "S&P 500"],
    fdaDevices: [
      { name: "da Vinci 5 Surgical System", code: "510(k)", class: "II", status: "Cleared", date: "2024-03-15" },
      { name: "da Vinci SP System", code: "510(k)", class: "II", status: "Cleared", date: "2022-06-20" },
      { name: "Ion Robotic Bronchoscopy", code: "510(k)", class: "II", status: "Cleared", date: "2023-08-12" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "$46M", date: "2000-06-13", investors: ["NASDAQ"] },
    ],
    clinicalTrials: [
      { name: "da Vinci 5 Multi-Center", phase: "Phase IV", status: "Recruiting", location: "US, EU, Japan" },
      { name: "Ion Lung Biopsy Pivotal", phase: "Phase III", status: "Completed", location: "US" },
    ],
    jobs: [
      { title: "Computer Vision Engineer", department: "AI/ML", location: "Sunnyvale, CA", salary: "$180K-$240K", equity: "$50K-$100K RSUs", tags: ["AI/ML", "Computer Vision", "Python"] },
    ],
    newsVolume: [30, 35, 42, 50, 45, 55, 60, 52, 58, 65, 70, 75],
    stockPrice: 520.30,
    stockChange: 1.8,
  },
  {
    id: "3",
    slug: "shockwave-medical",
    name: "Shockwave Medical",
    ticker: "SWAV",
    description: "Developer of intravascular lithotripsy (IVL) technology for treating calcified cardiovascular disease. Acquired by Johnson & Johnson in 2024 for $13.1B.",
    sector: "Interventional Cardiology",
    therapeuticArea: "Structural Heart, Peripheral Vascular",
    hq: "Santa Clara, CA",
    ceo: "Doug Godshall",
    founded: 2009,
    employees: "2,500+",
    website: "shockwavemedical.com",
    totalFunding: "$13.1B (Acquired by J&J)",
    stage: "Acquired",
    approvalStatus: ["510(k)", "PMA", "CE Mark", "Breakthrough"],
    badges: ["FDA Cleared", "CE Mark", "Breakthrough Device"],
    fdaDevices: [
      { name: "Shockwave C2+ IVL Catheter", code: "PMA", class: "III", status: "Approved", date: "2023-02-18" },
      { name: "Shockwave S4 Peripheral IVL", code: "510(k)", class: "II", status: "Cleared", date: "2022-11-30" },
    ],
    fundingHistory: [
      { round: "Series A", amount: "$15M", date: "2015", investors: ["OrbiMed", "Sofinnova"] },
      { round: "Series B", amount: "$35M", date: "2017", investors: ["Venrock", "OrbiMed"] },
      { round: "IPO", amount: "$107M", date: "2019-03-07", investors: ["NASDAQ"] },
      { round: "Acquisition", amount: "$13.1B", date: "2024-05-31", investors: ["Johnson & Johnson"] },
    ],
    clinicalTrials: [
      { name: "DISRUPT CAD IV", phase: "Phase III", status: "Completed", location: "US, EU" },
    ],
    jobs: [],
    newsVolume: [20, 25, 30, 80, 90, 85, 40, 35, 30, 25, 20, 15],
    stockPrice: undefined,
    stockChange: undefined,
  },
  {
    id: "4",
    slug: "stryker",
    name: "Stryker Corporation",
    ticker: "SYK",
    description: "One of the world's leading medical technology companies offering orthopedic implants, surgical equipment, neurotechnology, and spine products.",
    sector: "Orthopedics & Surgical",
    therapeuticArea: "Orthopedics, Neurotechnology, Spine",
    hq: "Kalamazoo, MI",
    ceo: "Kevin Lobo",
    founded: 1941,
    employees: "51,000+",
    website: "stryker.com",
    totalFunding: "Public (NYSE: SYK)",
    stage: "Public",
    approvalStatus: ["510(k)", "PMA", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark", "Fortune 500"],
    fdaDevices: [
      { name: "Mako SmartRobotics TKA", code: "510(k)", class: "II", status: "Cleared", date: "2023-05-22" },
      { name: "T2 Alpha Tibial Nail", code: "510(k)", class: "II", status: "Cleared", date: "2023-09-15" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "$380M", date: "1979", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "Mako THA Outcomes", phase: "Phase IV", status: "Active", location: "US" },
    ],
    jobs: [
      { title: "Mechanical Design Engineer", department: "R&D", location: "Kalamazoo, MI", salary: "$95K-$130K", equity: "RSUs", tags: ["CAD", "Biocompatibility", "DFM"] },
      { title: "Clinical Research Associate", department: "Clinical", location: "Remote", salary: "$80K-$110K", equity: "None", tags: ["Clinical Trials", "GCP", "Orthopedics"] },
    ],
    newsVolume: [40, 38, 45, 50, 42, 55, 48, 52, 60, 58, 62, 65],
    stockPrice: 365.20,
    stockChange: -0.5,
  },
  {
    id: "5",
    slug: "edwards-lifesciences",
    name: "Edwards Lifesciences",
    ticker: "EW",
    description: "The global leader in patient-focused innovations for structural heart disease and critical care. Pioneer of transcatheter heart valves (TAVR).",
    sector: "Structural Heart",
    therapeuticArea: "Structural Heart, Critical Care",
    hq: "Irvine, CA",
    ceo: "Bernard Zovighian",
    founded: 1958,
    employees: "19,000+",
    website: "edwards.com",
    totalFunding: "Public (NYSE: EW)",
    stage: "Public",
    approvalStatus: ["PMA", "CE Mark", "Breakthrough"],
    badges: ["FDA Approved", "CE Mark", "Breakthrough Device"],
    fdaDevices: [
      { name: "SAPIEN 3 Ultra RESILIA Valve", code: "PMA", class: "III", status: "Approved", date: "2023-07-15" },
      { name: "EVOQUE Tricuspid Valve", code: "PMA", class: "III", status: "Breakthrough", date: "2024-01-10" },
      { name: "PASCAL ACE Repair System", code: "PMA", class: "III", status: "Approved", date: "2023-03-22" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "$93M", date: "2000-03-21", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "PROGRESS Tricuspid", phase: "Phase III", status: "Recruiting", location: "US, EU" },
      { name: "PARTNER 4 TAVR", phase: "Phase III", status: "Active", location: "Global" },
    ],
    jobs: [
      { title: "Biomedical Engineer - Valve Design", department: "R&D", location: "Irvine, CA", salary: "$120K-$160K", equity: "RSUs", tags: ["FEA", "Biocompatibility", "TAVR"] },
    ],
    newsVolume: [35, 40, 38, 42, 50, 55, 48, 52, 60, 65, 58, 70],
    stockPrice: 72.30,
    stockChange: -1.2,
  },
  {
    id: "6",
    slug: "abbott-laboratories",
    name: "Abbott Laboratories",
    ticker: "ABT",
    description: "Global healthcare leader with diagnostics, medical devices, nutrition, and pharmaceuticals divisions. Known for FreeStyle Libre CGM and cardiac rhythm management.",
    sector: "Diagnostics & Devices",
    therapeuticArea: "Diabetes, Cardiovascular, Diagnostics",
    hq: "Abbott Park, IL",
    ceo: "Robert Ford",
    founded: 1888,
    employees: "114,000+",
    website: "abbott.com",
    totalFunding: "Public (NYSE: ABT)",
    stage: "Public",
    approvalStatus: ["510(k)", "PMA", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark", "Fortune 100"],
    fdaDevices: [
      { name: "FreeStyle Libre 3 CGM", code: "510(k)", class: "II", status: "Cleared", date: "2023-06-01" },
      { name: "Aveir DR Dual-Chamber Leadless Pacemaker", code: "PMA", class: "III", status: "Approved", date: "2024-03-14" },
      { name: "TriClip G4 Tricuspid Repair", code: "PMA", class: "III", status: "Approved", date: "2024-04-02" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "Pre-1970s", date: "1929", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "Lingo CGM Consumer Study", phase: "Phase IV", status: "Active", location: "US, UK" },
    ],
    jobs: [
      { title: "Firmware Engineer - CGM", department: "Diabetes Care", location: "Alameda, CA", salary: "$140K-$180K", equity: "RSUs", tags: ["Embedded", "Bluetooth LE", "C"] },
    ],
    newsVolume: [50, 55, 60, 58, 65, 70, 62, 68, 72, 75, 80, 85],
    stockPrice: 118.50,
    stockChange: 0.8,
  },
  {
    id: "7",
    slug: "boston-scientific",
    name: "Boston Scientific",
    ticker: "BSX",
    description: "Global medical technology leader transforming treatment for complex conditions across cardiology, endoscopy, urology, and neuromodulation.",
    sector: "Interventional MedTech",
    therapeuticArea: "Cardiology, Endoscopy, Neuromodulation",
    hq: "Marlborough, MA",
    ceo: "Michael Mahoney",
    founded: 1979,
    employees: "48,000+",
    website: "bostonscientific.com",
    totalFunding: "Public (NYSE: BSX)",
    stage: "Public",
    approvalStatus: ["510(k)", "PMA", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark", "S&P 500"],
    fdaDevices: [
      { name: "FARAPULSE PFA System", code: "PMA", class: "III", status: "Approved", date: "2024-01-18" },
      { name: "WATCHMAN FLX Pro LAAC", code: "PMA", class: "III", status: "Approved", date: "2023-10-05" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "$45M", date: "1992", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "FARAPULSE IDE", phase: "Phase III", status: "Completed", location: "US, EU" },
    ],
    jobs: [
      { title: "Electrophysiology R&D Lead", department: "Cardiology", location: "Marlborough, MA", salary: "$160K-$200K", equity: "RSUs", tags: ["EP", "PFA", "Catheter Design"] },
    ],
    newsVolume: [40, 45, 50, 55, 60, 65, 70, 68, 72, 75, 80, 90],
    stockPrice: 94.20,
    stockChange: 3.1,
  },
  {
    id: "8",
    slug: "viz-ai",
    name: "Viz.ai",
    description: "AI-powered clinical decision support platform. Detects large vessel occlusion stroke, pulmonary embolism, and aortic disease from CT scans in seconds.",
    sector: "AI Diagnostics",
    therapeuticArea: "Neurology, Cardiology, Vascular",
    hq: "San Francisco, CA",
    ceo: "Chris Mansi",
    founded: 2016,
    employees: "500+",
    website: "viz.ai",
    totalFunding: "$252M",
    stage: "Series D",
    approvalStatus: ["510(k)", "De Novo", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark", "Breakthrough Device"],
    fdaDevices: [
      { name: "Viz LVO Stroke Detection", code: "De Novo", class: "II", status: "Cleared", date: "2021-02-15" },
      { name: "Viz PE Pulmonary Embolism", code: "510(k)", class: "II", status: "Cleared", date: "2023-06-20" },
      { name: "Viz Aortic Disease Detection", code: "510(k)", class: "II", status: "Cleared", date: "2023-11-08" },
    ],
    fundingHistory: [
      { round: "Seed", amount: "$7M", date: "2017", investors: ["Innovation Endeavors"] },
      { round: "Series A", amount: "$21M", date: "2019", investors: ["Greenoaks Capital"] },
      { round: "Series C", amount: "$100M", date: "2021", investors: ["Tiger Global", "Insight Partners"] },
      { round: "Series D", amount: "$100M", date: "2023", investors: ["Transformation Capital"] },
    ],
    clinicalTrials: [
      { name: "Viz ONE Platform Real-World", phase: "Phase IV", status: "Active", location: "US" },
    ],
    jobs: [
      { title: "ML Research Scientist", department: "AI", location: "San Francisco, CA", salary: "$200K-$280K", equity: "$80K-$150K options", tags: ["AI/ML", "Medical Imaging", "PyTorch"] },
      { title: "Clinical Applications Engineer", department: "Clinical", location: "Remote", salary: "$120K-$150K", equity: "$30K-$60K options", tags: ["DICOM", "Radiology", "Integration"] },
    ],
    newsVolume: [15, 20, 25, 30, 35, 45, 50, 55, 60, 65, 70, 80],
  },
  {
    id: "9",
    slug: "synchron",
    name: "Synchron",
    description: "Developing the Stentrode brain-computer interface (BCI) implanted via blood vessel without open brain surgery. First endovascular BCI in human trials.",
    sector: "Neurotechnology",
    therapeuticArea: "Neurology, Assistive Technology",
    hq: "Brooklyn, NY",
    ceo: "Tom Oxley",
    founded: 2016,
    employees: "150+",
    website: "synchron.com",
    totalFunding: "$145M",
    stage: "Series C",
    approvalStatus: ["Breakthrough"],
    badges: ["Breakthrough Device", "IDE Approved"],
    fdaDevices: [
      { name: "Stentrode BCI", code: "PMA", class: "III", status: "Breakthrough", date: "2023-09-01" },
    ],
    fundingHistory: [
      { round: "Series A", amount: "$10M", date: "2019", investors: ["DARPA"] },
      { round: "Series B", amount: "$40M", date: "2021", investors: ["Khosla Ventures", "Gates Frontier"] },
      { round: "Series C", amount: "$75M", date: "2022", investors: ["ARCH Venture", "Bezos Expeditions"] },
    ],
    clinicalTrials: [
      { name: "COMMAND BCI Pivotal", phase: "Phase II", status: "Recruiting", location: "US, Australia" },
    ],
    jobs: [
      { title: "Neuroengineering Scientist", department: "R&D", location: "Brooklyn, NY", salary: "$160K-$220K", equity: "$100K-$200K options", tags: ["BCI", "Neuroscience", "Signal Processing"] },
    ],
    newsVolume: [10, 12, 15, 20, 25, 30, 35, 40, 50, 55, 60, 70],
  },
  {
    id: "10",
    slug: "procept-biorobotics",
    name: "PROCEPT BioRobotics",
    ticker: "PRCT",
    description: "Developer of the AquaBeam Robotic System for minimally invasive treatment of benign prostatic hyperplasia (BPH) using waterjet ablation.",
    sector: "Surgical Robotics",
    therapeuticArea: "Urology",
    hq: "San Jose, CA",
    ceo: "Reza Zadno",
    founded: 2009,
    employees: "1,200+",
    website: "procept-biorobotics.com",
    totalFunding: "Public (NASDAQ: PRCT)",
    stage: "Public",
    approvalStatus: ["510(k)", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark"],
    fdaDevices: [
      { name: "AquaBeam Robotic System 2.0", code: "510(k)", class: "II", status: "Cleared", date: "2023-04-10" },
    ],
    fundingHistory: [
      { round: "Series D", amount: "$77M", date: "2020", investors: ["RA Capital"] },
      { round: "IPO", amount: "$127M", date: "2021-09-15", investors: ["NASDAQ"] },
    ],
    clinicalTrials: [
      { name: "WATER II Long-Term", phase: "Phase III", status: "Active", location: "US, EU" },
    ],
    jobs: [
      { title: "Robotics Software Engineer", department: "Engineering", location: "San Jose, CA", salary: "$150K-$200K", equity: "$40K-$80K RSUs", tags: ["Robotics", "ROS", "C++"] },
    ],
    newsVolume: [8, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    stockPrice: 72.80,
    stockChange: 4.2,
  },
  {
    id: "11",
    slug: "penumbra",
    name: "Penumbra Inc.",
    ticker: "PEN",
    description: "Global healthcare company focused on innovative therapies for stroke and thromboembolism. Creator of the Jet 7 aspiration catheter system.",
    sector: "Neurovascular",
    therapeuticArea: "Neurology, Vascular",
    hq: "Alameda, CA",
    ceo: "Adam Elsesser",
    founded: 2004,
    employees: "4,500+",
    website: "penumbrainc.com",
    totalFunding: "Public (NYSE: PEN)",
    stage: "Public",
    approvalStatus: ["510(k)", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark"],
    fdaDevices: [
      { name: "Lightning Flash Thrombectomy", code: "510(k)", class: "II", status: "Cleared", date: "2024-02-08" },
      { name: "Jet 7 MAX Reperfusion Catheter", code: "510(k)", class: "II", status: "Cleared", date: "2023-05-15" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "$137M", date: "2015-09-17", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "COMPLETE Stroke Registry", phase: "Phase IV", status: "Active", location: "US" },
    ],
    jobs: [],
    newsVolume: [25, 28, 30, 35, 32, 40, 38, 42, 45, 48, 50, 55],
    stockPrice: 175.40,
    stockChange: -0.8,
  },
  {
    id: "12",
    slug: "axonics",
    name: "Axonics Modulation",
    description: "Developer of rechargeable sacral neuromodulation (SNM) systems for bladder and bowel dysfunction. Acquired by Boston Scientific for $3.7B in 2024.",
    sector: "Neuromodulation",
    therapeuticArea: "Urology, Pelvic Health",
    hq: "Irvine, CA",
    ceo: "Raymond Cohen",
    founded: 2012,
    employees: "800+",
    website: "axonics.com",
    totalFunding: "$3.7B (Acquired by BSX)",
    stage: "Acquired",
    approvalStatus: ["PMA", "CE Mark"],
    badges: ["FDA Approved", "CE Mark"],
    fdaDevices: [
      { name: "Axonics F15 SNM System", code: "PMA", class: "III", status: "Approved", date: "2023-08-20" },
    ],
    fundingHistory: [
      { round: "Series A", amount: "$14M", date: "2014", investors: ["OrbiMed"] },
      { round: "IPO", amount: "$122M", date: "2018-10-31", investors: ["NASDAQ"] },
      { round: "Acquisition", amount: "$3.7B", date: "2024-01-08", investors: ["Boston Scientific"] },
    ],
    clinicalTrials: [],
    jobs: [],
    newsVolume: [15, 20, 25, 60, 55, 30, 25, 20, 18, 15, 12, 10],
  },
  {
    id: "13",
    slug: "nuvance-therapeutics",
    name: "Nalu Medical",
    description: "Creator of the world's smallest implantable pulse generator (micro-IPG) for chronic pain. Revolutionary miniaturized spinal cord stimulator.",
    sector: "Neuromodulation",
    therapeuticArea: "Pain Management",
    hq: "Carlsbad, CA",
    ceo: "Peter Crosby",
    founded: 2013,
    employees: "200+",
    website: "nalumed.com",
    totalFunding: "$120M",
    stage: "Series D",
    approvalStatus: ["510(k)"],
    badges: ["FDA Cleared"],
    fdaDevices: [
      { name: "Nalu Neurostimulation System", code: "510(k)", class: "II", status: "Cleared", date: "2023-03-15" },
    ],
    fundingHistory: [
      { round: "Series A", amount: "$12M", date: "2016", investors: ["Gilde Healthcare"] },
      { round: "Series C", amount: "$55M", date: "2021", investors: ["Bain Capital Life Sciences"] },
      { round: "Series D", amount: "$40M", date: "2023", investors: ["Bain Capital"] },
    ],
    clinicalTrials: [
      { name: "NALU-SCS Pivotal", phase: "Phase III", status: "Recruiting", location: "US" },
    ],
    jobs: [
      { title: "Biomedical Hardware Engineer", department: "R&D", location: "Carlsbad, CA", salary: "$110K-$145K", equity: "$50K-$90K options", tags: ["Implantable", "Analog", "Power Systems"] },
    ],
    newsVolume: [5, 8, 10, 12, 15, 18, 20, 25, 28, 30, 35, 40],
  },
  {
    id: "14",
    slug: "zimmer-biomet",
    name: "Zimmer Biomet",
    ticker: "ZBH",
    description: "Global leader in musculoskeletal healthcare. Specializes in knee, hip, spine implants and robotic-assisted surgery with ROSA platform.",
    sector: "Orthopedics",
    therapeuticArea: "Orthopedics, Spine, Dental",
    hq: "Warsaw, IN",
    ceo: "Ivan Tornos",
    founded: 1927,
    employees: "18,000+",
    website: "zimmerbiomet.com",
    totalFunding: "Public (NYSE: ZBH)",
    stage: "Public",
    approvalStatus: ["510(k)", "PMA", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark"],
    fdaDevices: [
      { name: "ROSA Knee System", code: "510(k)", class: "II", status: "Cleared", date: "2023-07-10" },
      { name: "Persona IQ Smart Knee", code: "510(k)", class: "II", status: "Cleared", date: "2023-01-25" },
    ],
    fundingHistory: [
      { round: "IPO", amount: "Pre-1970s", date: "1969", investors: ["NYSE"] },
    ],
    clinicalTrials: [
      { name: "Persona IQ Outcomes", phase: "Phase IV", status: "Active", location: "US" },
    ],
    jobs: [
      { title: "Smart Implant Data Scientist", department: "Digital Health", location: "Warsaw, IN", salary: "$130K-$170K", equity: "RSUs", tags: ["IoT", "Biomechanics", "Data Science"] },
    ],
    newsVolume: [30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58],
    stockPrice: 112.60,
    stockChange: 0.3,
  },
  {
    id: "15",
    slug: "enovis",
    name: "Enovis (fka Colfax)",
    ticker: "ENOV",
    description: "Innovation-driven medical technology company focused on reconstructive surgery, prevention, and recovery solutions across orthopedics and rehabilitation.",
    sector: "Orthopedics & Rehab",
    therapeuticArea: "Orthopedics, Sports Medicine, Rehabilitation",
    hq: "Wilmington, DE",
    ceo: "Matthew Trerotola",
    founded: 2022,
    employees: "7,000+",
    website: "enovis.com",
    totalFunding: "Public (NYSE: ENOV)",
    stage: "Public",
    approvalStatus: ["510(k)", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark"],
    fdaDevices: [
      { name: "ARVIS Robotic Navigation", code: "510(k)", class: "II", status: "Cleared", date: "2024-01-15" },
    ],
    fundingHistory: [],
    clinicalTrials: [],
    jobs: [
      { title: "Robotics Integration Engineer", department: "Surgical", location: "Austin, TX", salary: "$125K-$165K", equity: "RSUs", tags: ["Robotics", "Navigation", "C++"] },
    ],
    newsVolume: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38],
    stockPrice: 48.90,
    stockChange: 1.5,
  },
  {
    id: "16",
    slug: "moderna-medtech",
    name: "Moderna",
    ticker: "MRNA",
    description: "mRNA technology platform pioneer. Beyond COVID vaccines, developing personalized cancer vaccines, rare disease treatments, and respiratory therapeutics.",
    sector: "mRNA Therapeutics",
    therapeuticArea: "Oncology, Infectious Disease, Rare Disease",
    hq: "Cambridge, MA",
    ceo: "Stephane Bancel",
    founded: 2010,
    employees: "5,800+",
    website: "modernatx.com",
    totalFunding: "Public (NASDAQ: MRNA)",
    stage: "Public",
    approvalStatus: ["Breakthrough"],
    badges: ["FDA Approved", "Breakthrough Device"],
    fdaDevices: [
      { name: "mRNA-4157 Cancer Vaccine", code: "PMA", class: "III", status: "Breakthrough", date: "2024-02-01" },
    ],
    fundingHistory: [
      { round: "Series A", amount: "$40M", date: "2012", investors: ["Flagship Pioneering"] },
      { round: "IPO", amount: "$621M", date: "2018-12-07", investors: ["NASDAQ"] },
    ],
    clinicalTrials: [
      { name: "KEYNOTE-942 Melanoma", phase: "Phase III", status: "Recruiting", location: "Global" },
      { name: "mRNA-1283 NextGen COVID", phase: "Phase III", status: "Completed", location: "US, EU" },
    ],
    jobs: [
      { title: "LNP Process Engineer", department: "Manufacturing", location: "Norwood, MA", salary: "$130K-$170K", equity: "RSUs", tags: ["LNP", "mRNA", "GMP"] },
    ],
    newsVolume: [60, 55, 50, 48, 45, 50, 55, 58, 62, 65, 70, 75],
    stockPrice: 35.20,
    stockChange: -2.5,
  },
  {
    id: "17",
    slug: "egenesis",
    name: "eGenesis",
    description: "Developing gene-edited pig organs for human transplantation using CRISPR. Leading the xenotransplantation revolution with 69-gene-edit porcine kidneys.",
    sector: "Xenotransplantation",
    therapeuticArea: "Transplant, Gene Therapy",
    hq: "Cambridge, MA",
    ceo: "Mike Curtis",
    founded: 2015,
    employees: "300+",
    website: "egenesisbio.com",
    totalFunding: "$337M",
    stage: "Series C",
    approvalStatus: [],
    badges: ["IND Active"],
    fdaDevices: [],
    fundingHistory: [
      { round: "Series A", amount: "$38M", date: "2017", investors: ["ARCH Venture", "Biomatics Capital"] },
      { round: "Series B", amount: "$125M", date: "2021", investors: ["OrbiMed", "Sofinnova"] },
      { round: "Series C", amount: "$174M", date: "2023", investors: ["ARCH Venture", "a]2z Partners"] },
    ],
    clinicalTrials: [
      { name: "Pig-to-Human Kidney Phase I", phase: "Phase I", status: "Recruiting", location: "US" },
    ],
    jobs: [
      { title: "Gene Editing Scientist", department: "R&D", location: "Cambridge, MA", salary: "$140K-$190K", equity: "$100K-$200K options", tags: ["CRISPR", "Genomics", "Animal Science"] },
    ],
    newsVolume: [5, 8, 10, 15, 20, 30, 40, 50, 55, 60, 65, 80],
  },
  {
    id: "18",
    slug: "butterfly-network",
    name: "Butterfly Network",
    ticker: "BFLY",
    description: "Democratizing medical imaging with Butterfly iQ+, a whole-body handheld ultrasound probe powered by semiconductor chip technology.",
    sector: "Point-of-Care Imaging",
    therapeuticArea: "Diagnostics, Emergency Medicine",
    hq: "Burlington, MA",
    ceo: "Joseph DeVivo",
    founded: 2011,
    employees: "700+",
    website: "butterflynetwork.com",
    totalFunding: "Public (NYSE: BFLY)",
    stage: "Public",
    approvalStatus: ["510(k)", "CE Mark"],
    badges: ["FDA Cleared", "CE Mark"],
    fdaDevices: [
      { name: "Butterfly iQ3 Ultrasound", code: "510(k)", class: "II", status: "Cleared", date: "2024-02-20" },
    ],
    fundingHistory: [
      { round: "Series D", amount: "$250M", date: "2018", investors: ["Fidelity"] },
      { round: "SPAC", amount: "$589M", date: "2021-02-12", investors: ["Longview Acquisition"] },
    ],
    clinicalTrials: [],
    jobs: [
      { title: "ASIC Design Engineer", department: "Hardware", location: "Burlington, MA", salary: "$170K-$220K", equity: "$40K-$80K RSUs", tags: ["ASIC", "Ultrasound", "Semiconductor"] },
    ],
    newsVolume: [20, 22, 25, 28, 30, 32, 35, 30, 28, 32, 35, 38],
    stockPrice: 2.10,
    stockChange: -5.2,
  },
  {
    id: "19",
    slug: "recursion-pharma",
    name: "Recursion Pharmaceuticals",
    ticker: "RXRX",
    description: "AI-driven drug discovery platform using automated biology and machine learning. Mapping the biology of disease at industrial scale.",
    sector: "AI Drug Discovery",
    therapeuticArea: "Oncology, Rare Disease, Infectious Disease",
    hq: "Salt Lake City, UT",
    ceo: "Chris Gibson",
    founded: 2013,
    employees: "700+",
    website: "recursion.com",
    totalFunding: "Public (NASDAQ: RXRX)",
    stage: "Public",
    approvalStatus: [],
    badges: ["IND Active"],
    fdaDevices: [],
    fundingHistory: [
      { round: "Series D", amount: "$239M", date: "2020", investors: ["Baillie Gifford"] },
      { round: "IPO", amount: "$436M", date: "2021-04-16", investors: ["NASDAQ"] },
    ],
    clinicalTrials: [
      { name: "REC-994 Cerebral Cavernous", phase: "Phase II", status: "Recruiting", location: "US" },
    ],
    jobs: [
      { title: "Senior ML Engineer - Biology", department: "AI", location: "Salt Lake City, UT", salary: "$180K-$250K", equity: "$60K-$120K RSUs", tags: ["AI/ML", "Biology", "Drug Discovery"] },
    ],
    newsVolume: [15, 18, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65],
    stockPrice: 7.80,
    stockChange: 3.8,
  },
  {
    id: "20",
    slug: "emulate-inc",
    name: "Emulate Inc.",
    description: "Organ-on-Chip technology platform recreating human organ biology on microfluidic chips. Replacing animal testing with human-relevant data.",
    sector: "Organ-on-Chip",
    therapeuticArea: "Drug Testing, Toxicology",
    hq: "Boston, MA",
    ceo: "Jim Coon",
    founded: 2013,
    employees: "200+",
    website: "emulatebio.com",
    totalFunding: "$225M",
    stage: "Series F",
    approvalStatus: [],
    badges: ["FDA MOU"],
    fdaDevices: [],
    fundingHistory: [
      { round: "Series A", amount: "$28M", date: "2014", investors: ["Flagship Pioneering"] },
      { round: "Series E", amount: "$82M", date: "2021", investors: ["Northpond Ventures"] },
      { round: "Series F", amount: "$89M", date: "2023", investors: ["Qatar Investment Authority"] },
    ],
    clinicalTrials: [],
    jobs: [
      { title: "Microfluidics Engineer", department: "R&D", location: "Boston, MA", salary: "$110K-$150K", equity: "$40K-$80K options", tags: ["PDMS", "Microfluidics", "Cell Biology"] },
    ],
    newsVolume: [8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 35, 40],
  },
];

// Helper to get all unique sectors
export function getSectors(): string[] {
  return [...new Set(companies.map((c) => c.sector))].sort();
}

// Helper to get all unique therapeutic areas
export function getTherapeuticAreas(): string[] {
  const areas = companies.flatMap((c) => c.therapeuticArea.split(", "));
  return [...new Set(areas)].sort();
}

// Helper to get all recent FDA approvals across all companies
export function getRecentFDAActivity(): (FDADevice & { company: string; companySlug: string })[] {
  return companies
    .flatMap((c) =>
      c.fdaDevices.map((d) => ({ ...d, company: c.name, companySlug: c.slug }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper to get all jobs across companies
export function getAllJobs(): (Job & { company: string; companySlug: string })[] {
  return companies
    .flatMap((c) =>
      c.jobs.map((j) => ({ ...j, company: c.name, companySlug: c.slug }))
    );
}

// Helper to get all recruiting clinical trials
export function getActiveTrials(): (ClinicalTrial & { company: string; companySlug: string })[] {
  return companies
    .flatMap((c) =>
      c.clinicalTrials.map((t) => ({ ...t, company: c.name, companySlug: c.slug }))
    )
    .filter((t) => t.status === "Recruiting" || t.status === "Active");
}

// Helper to get company by slug
export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
