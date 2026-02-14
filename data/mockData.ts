import { Company } from '../types';

export interface Resource {
    id: string;
    title: string;
    author: string;
    company: string;
    topic: 'Regulatory' | 'Digital Health' | 'Robotics' | 'Startups' | 'Marketing' | 'AI';
    format: 'White Paper' | 'Webinar' | 'Workshop';
    duration?: string; // for videos/webinars
    pages?: number; // for papers
    excerpt: string;
    image: string;
    date: string;
}

export interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  isoDate: string; 
  location: string;
  type: string;
  description: string;
  image: string;
  attendees: number;
  speakers: Speaker[];
  agendaHighlight: string;
  tags: string[];
  price?: number;
}

export const knowledgeResources: Resource[] = [
    {
        id: 'res-1',
        title: "The State of Medical Molding 2024",
        author: "David Chen",
        company: "Precision BioPlastics",
        topic: 'Regulatory',
        format: 'White Paper',
        pages: 42,
        excerpt: "An in-depth analysis of global resin supply chains and the impact of new FDA sustainability guidelines on Class II devices.",
        image: "https://picsum.photos/seed/res1/800/450",
        date: "Oct 15, 2023"
    },
    {
        id: 'res-2',
        title: "AI-Driven Diagnostics: Clinical Validation",
        author: "Dr. Sarah Lin",
        company: "NeuroFlow Design Labs",
        topic: 'AI',
        format: 'Webinar',
        duration: "45 min",
        excerpt: "Learn the specific datasets required by the FDA for SaMD (Software as a Medical Device) approval in neurology.",
        image: "https://picsum.photos/seed/res2/800/450",
        date: "Oct 20, 2023"
    },
    {
        id: 'res-3',
        title: "Marketing MedTech in the Digital Era",
        author: "James Vane",
        company: "MedGrowth Partners",
        topic: 'Marketing',
        format: 'Workshop',
        duration: "90 min",
        excerpt: "Interactive session on B2B lead generation for contract manufacturers using technical content as a hook.",
        image: "https://picsum.photos/seed/res3/800/450",
        date: "Nov 02, 2023"
    },
    {
        id: 'res-4',
        title: "Cybersecurity Frameworks for Robotics",
        author: "Marcus Thorne",
        company: "SecureMed Systems",
        topic: 'Robotics',
        format: 'White Paper',
        pages: 28,
        excerpt: "Implementing NIST standards in semi-autonomous surgical platforms to prevent lateral movement in hospital networks.",
        image: "https://picsum.photos/seed/res4/800/450",
        date: "Nov 12, 2023"
    },
    {
        id: 'res-5',
        title: "Startup Fundraising: Series A Strategies",
        author: "Elena Rostova",
        company: "VentureHealth",
        topic: 'Startups',
        format: 'Webinar',
        duration: "60 min",
        excerpt: "How to value your early-stage clinical data when pitching to Tier 1 MedTech investors.",
        image: "https://picsum.photos/seed/res5/800/450",
        date: "Dec 05, 2023"
    },
    {
        id: 'res-6',
        title: "MDR Transition: Common Pitfalls",
        author: "Sarah Jenkins",
        company: "Compliance First",
        topic: 'Regulatory',
        format: 'Workshop',
        duration: "120 min",
        excerpt: "Deep dive into technical documentation requirements for legacy devices under the new EU regulations.",
        image: "https://picsum.photos/seed/res6/800/450",
        date: "Jan 10, 2024"
    },
    {
        id: 'res-7',
        title: "Digital Twin Integration in Orthopedics",
        author: "Liam O'Shea",
        company: "Irish MedFab",
        topic: 'Digital Health',
        format: 'White Paper',
        pages: 35,
        excerpt: "Utilizing patient-specific modeling to optimize femoral component placement in robotic hip replacements.",
        image: "https://picsum.photos/seed/res7/800/450",
        date: "Jan 15, 2024"
    },
    {
        id: 'res-8',
        title: "Biocompatible Sensors for Chronic Wear",
        author: "Yuki Tanaka",
        company: "OpticMed Sensors",
        topic: 'Digital Health',
        format: 'Webinar',
        duration: "50 min",
        excerpt: "Addressing signal degradation caused by bio-fouling in long-term continuous glucose monitoring platforms.",
        image: "https://picsum.photos/seed/res8/800/450",
        date: "Jan 22, 2024"
    },
    {
        id: 'res-9',
        title: "MDSAP Audit Readiness Checklist",
        author: "Marcus Thorne",
        company: "Compliance First",
        topic: 'Regulatory',
        format: 'White Paper',
        pages: 15,
        excerpt: "A comprehensive internal audit template for companies preparing for multi-jurisdictional QMS certification.",
        image: "https://picsum.photos/seed/res9/800/450",
        date: "Feb 01, 2024"
    },
    {
        id: 'res-10',
        title: "Scaling Robotic Assembly for Class III",
        author: "Hans Miller",
        company: "Precision Robotics",
        topic: 'Robotics',
        format: 'Workshop',
        duration: "180 min",
        excerpt: "Technical challenges in automating the micro-assembly of active implantable leads while maintaining sterility.",
        image: "https://picsum.photos/seed/res10/800/450",
        date: "Feb 14, 2024"
    },
    {
        id: 'res-11',
        title: "Generative AI in Clinical Study Design",
        author: "Dr. Sarah Lin",
        company: "NeuroFlow Design Labs",
        topic: 'AI',
        format: 'Webinar',
        duration: "55 min",
        excerpt: "Using LLMs to generate regulatory-compliant study protocols and patient information sheets in multiple languages.",
        image: "https://picsum.photos/seed/res11/800/450",
        date: "Mar 02, 2024"
    },
    {
        id: 'res-12',
        title: "The Contract Manufacturing Landscape 2025",
        author: "David Chen",
        company: "Precision BioPlastics",
        topic: 'Marketing',
        format: 'White Paper',
        pages: 50,
        excerpt: "Analyzing the trend of OEM consolidation and the shift toward 'one-stop-shop' contract manufacturing partners.",
        image: "https://picsum.photos/seed/res12/800/450",
        date: "Mar 10, 2024"
    },
    {
        id: 'res-13',
        title: "Sterilizing Bio-Electronic Hybrids",
        author: "Elena Rostova",
        company: "SterileGuard Solutions",
        topic: 'Regulatory',
        format: 'White Paper',
        pages: 22,
        excerpt: "Comparative study of E-Beam vs NO2 sterilization for devices containing active pharmaceutical coatings.",
        image: "https://picsum.photos/seed/res13/800/450",
        date: "Mar 18, 2024"
    },
    {
        id: 'res-14',
        title: "MedTech GTM Strategy for North America",
        author: "James Vane",
        company: "MedGrowth Partners",
        topic: 'Marketing',
        format: 'Webinar',
        duration: "40 min",
        excerpt: "Navigating the GPO and IDN landscapes to achieve hospital formulary access for innovative surgical tools.",
        image: "https://picsum.photos/seed/res14/800/450",
        date: "Mar 25, 2024"
    },
    {
        id: 'res-15',
        title: "Cyber-Resilience in Connected Infusion Pumps",
        author: "Marcus Thorne",
        company: "SecureMed Systems",
        topic: 'Digital Health',
        format: 'White Paper',
        pages: 30,
        excerpt: "Implementing secure boot and encrypted OTA updates in legacy infusion platform architectures.",
        image: "https://picsum.photos/seed/res15/800/450",
        date: "Apr 05, 2024"
    }
];

export const allEvents: Event[] = [
  {
    id: 1,
    name: "MedTech Innovation Summit 2024",
    date: "Nov 12-14",
    isoDate: "20241112T090000/20241114T170000",
    location: "San Francisco, CA",
    type: "Conference",
    description: "The premier gathering for medical device executives, investors, and innovators to discuss the future of healthcare.",
    image: "https://picsum.photos/seed/event1/600/400",
    attendees: 450,
    agendaHighlight: "Keynote: AI in Diagnostics",
    tags: ["Innovation", "Executive"],
    price: 899,
    speakers: [
      { name: "Dr. Sarah Lin", role: "CTO, MedCore", avatar: "https://picsum.photos/seed/spk1/100/100" },
      { name: "James Vane", role: "Partner, Sequoia", avatar: "https://picsum.photos/seed/spk2/100/100" }
    ]
  },
  {
    id: 2,
    name: "QMS Digitization Masterclass",
    date: "Nov 20",
    isoDate: "20241120T130000/20241120T150000",
    location: "Online",
    type: "Webinar",
    description: "Learn how to transition from paper-based QMS to a fully digital workflow efficiently with zero downtime.",
    image: "https://picsum.photos/seed/event2/600/400",
    attendees: 1200,
    agendaHighlight: "Live Demo of eQMS",
    tags: ["Quality", "Regulatory"],
    price: 0,
    speakers: [
      { name: "Marcus Thorne", role: "Reg Affairs Dir", avatar: "https://picsum.photos/seed/spk3/100/100" }
    ]
  },
  {
    id: 3,
    name: "MD&M West 2025",
    date: "Feb 05-07",
    isoDate: "20250205T090000/20250207T180000",
    location: "Anaheim, CA",
    type: "Expo",
    description: "North America's largest medtech expo. Connect with thousands of suppliers and explore new manufacturing technologies.",
    image: "https://picsum.photos/seed/event3/600/400",
    attendees: 15000,
    agendaHighlight: "Supplier Showcase Floor",
    tags: ["Manufacturing", "Supply Chain"],
    price: 150,
    speakers: []
  },
  {
    id: 4,
    name: "Digital Health Summit: EMEA",
    date: "Dec 05",
    isoDate: "20241205T090000/20241205T170000",
    location: "Berlin, Germany",
    type: "Conference",
    description: "Exploring the European landscape for digital health interventions and data privacy regulations.",
    image: "https://picsum.photos/seed/event4/600/400",
    attendees: 300,
    agendaHighlight: "GDPR for Medical Devices",
    tags: ["Digital Health", "Europe"],
    price: 450,
    speakers: []
  },
  {
    id: 5,
    name: "Surgical Robotics Workshop",
    date: "Dec 12",
    isoDate: "20241212T100000/20241212T140000",
    location: "Boston, MA",
    type: "Networking",
    description: "An intimate hands-on workshop and networking event for robotics engineers and clinical leads.",
    image: "https://picsum.photos/seed/event5/600/400",
    attendees: 50,
    agendaHighlight: "Haptic Feedback Integration",
    tags: ["Robotics", "Hands-on"],
    price: 299,
    speakers: []
  },
  {
    id: 6,
    name: "Global Regulatory Outlook 2025",
    date: "Jan 15",
    isoDate: "20250115T080000/20250115T100000",
    location: "Online",
    type: "Webinar",
    description: "What to expect from FDA, EMA, and NMPA in the coming year.",
    image: "https://picsum.photos/seed/event6/600/400",
    attendees: 2500,
    agendaHighlight: "Harmonization Updates",
    tags: ["Regulatory", "Global"],
    price: 0,
    speakers: []
  },
  {
    id: 7,
    name: "MedTech M&A Roundtable",
    date: "Jan 28",
    isoDate: "20250128T160000/20250128T180000",
    location: "New York, NY",
    type: "Networking",
    description: "A private evening for investors and founders to discuss the exit landscape for medical device startups.",
    image: "https://picsum.photos/seed/event7/600/400",
    attendees: 80,
    agendaHighlight: "Exit Valuation Multiples",
    tags: ["Finance", "Executive"],
    price: 150,
    speakers: []
  },
  {
    id: 8,
    name: "Additive Manufacturing Expo",
    date: "Feb 20-22",
    isoDate: "20250220T090000/20250222T170000",
    location: "Chicago, IL",
    type: "Expo",
    description: "The latest in metal 3D printing and biocompatible materials for orthopedic implants.",
    image: "https://picsum.photos/seed/event8/600/400",
    attendees: 4000,
    agendaHighlight: "3D Printed Titanium Demo",
    tags: ["Manufacturing", "Innovation"],
    price: 99,
    speakers: []
  },
  {
    id: 9,
    name: "Clinical Trial Excellence Forum",
    date: "Mar 04",
    isoDate: "20250304T090000/20250304T170000",
    location: "Online",
    type: "Webinar",
    description: "Strategies for decentralized clinical trials and real-world evidence collection.",
    image: "https://picsum.photos/seed/event9/600/400",
    attendees: 1800,
    agendaHighlight: "Virtual Patient Recruitment",
    tags: ["Clinical", "Data"],
    price: 0,
    speakers: []
  },
  {
    id: 10,
    name: "Cardiovascular Innovation Days",
    date: "Mar 18-19",
    isoDate: "20250318T090000/20250319T170000",
    location: "Houston, TX",
    type: "Conference",
    description: "Spotlighting breakthroughs in structural heart and electrophysiology devices.",
    image: "https://picsum.photos/seed/event10/600/400",
    attendees: 600,
    agendaHighlight: "Live Transcatheter Valve Case",
    tags: ["Cardiac", "Innovation"],
    price: 750,
    speakers: []
  }
];

export const allCompanies: Company[] = [
    {
      id: 1,
      name: "Precision BioPlastics",
      tagline: "Medical Injection Molding Specialists",
      description: "Full-service contract manufacturer specializing in high-tolerance micro-molding for surgical and diagnostic devices. Class 7 & 8 Cleanrooms.",
      location: "Minnesota, USA",
      logoUrl: "https://picsum.photos/seed/c1/200/200",
      categories: ["Contract Manufacturing", "Molding"],
      certifications: ["ISO 13485", "FDA Registered", "ISO 9001"],
      isVerified: true,
      foundedYear: 1998,
      website: "www.precisionbioplastics.com"
    },
    {
      id: 2,
      name: "NeuroFlow Design Labs",
      tagline: "From Concept to Commercialization",
      description: "Engineering consultancy focused on active implantables and neurostimulation devices.",
      location: "California, USA",
      logoUrl: "https://picsum.photos/seed/c2/200/200",
      categories: ["Design & Engineering", "R&D"],
      certifications: ["ISO 13485"],
      isVerified: true,
      foundedYear: 2012
    },
    {
      id: 3,
      name: "SterileGuard Solutions",
      tagline: "EtO and Gamma Sterilization Services",
      description: "Global provider of contract sterilization services. Validated cycles for complex device geometries.",
      location: "Germany",
      logoUrl: "https://picsum.photos/seed/c3/200/200",
      categories: ["Sterilization", "Services"],
      certifications: ["ISO 11135", "ISO 13485"],
      isVerified: true,
      foundedYear: 2005
    },
    {
      id: 4,
      name: "MediPack Systems",
      tagline: "Sterile Barrier Packaging",
      description: "Custom thermoformed trays and pouching solutions. Rapid prototyping for packaging design.",
      location: "Ireland",
      logoUrl: "https://picsum.photos/seed/c4/200/200",
      categories: ["Packaging", "Supplies"],
      certifications: ["ISO 11607", "ISO 9001"],
      isVerified: false,
      foundedYear: 2010
    },
    {
      id: 5,
      name: "Titan Medical Components",
      tagline: "Precision Machining & Swiss Turning",
      description: "High-volume manufacturing of titanium and stainless steel implants and surgical instrument components.",
      location: "Massachusetts, USA",
      logoUrl: "https://picsum.photos/seed/c5/200/200",
      categories: ["Components", "Machining"],
      certifications: ["ISO 13485", "FDA Registered"],
      isVerified: true,
      foundedYear: 1985
    },
    {
      id: 6,
      name: "Compliance First Consulting",
      tagline: "Navigating Global Regulations",
      description: "Expert guidance for 510(k) submissions, MDR transition, and QMS remediation.",
      location: "Washington DC, USA",
      logoUrl: "https://picsum.photos/seed/c6/200/200",
      categories: ["Regulatory", "Consulting"],
      certifications: ["ISO 13485"],
      isVerified: true,
      foundedYear: 2018
    },
    {
      id: 7,
      name: "OpticMed Sensors",
      tagline: "Advanced Optical Sensors",
      description: "OEM supplier of SpO2 and optical monitoring sensors for patient monitoring devices.",
      location: "Japan",
      logoUrl: "https://picsum.photos/seed/c7/200/200",
      categories: ["Components", "Electronics"],
      certifications: ["ISO 13485"],
      isVerified: true,
      foundedYear: 2001
    },
    {
      id: 8,
      name: "RapidProto Med",
      tagline: "3D Printing for Medical Devices",
      description: "Metal and biocompatible polymer 3D printing for prototypes and low-volume production runs.",
      location: "Texas, USA",
      logoUrl: "https://picsum.photos/seed/c8/200/200",
      categories: ["R&D", "Prototyping"],
      certifications: ["ISO 13485"],
      isVerified: false,
      foundedYear: 2020
    },
    {
      id: 9,
      name: "Apex Regulatory",
      tagline: "Global Compliance Partners",
      description: "Specializing in multi-market entries and complex clinical evaluation reports for class III devices.",
      location: "London, UK",
      logoUrl: "https://picsum.photos/seed/c9/200/200",
      categories: ["Regulatory", "Consulting"],
      certifications: ["ISO 9001"],
      isVerified: true,
      foundedYear: 2015
    },
    {
      id: 10,
      name: "OrthoDesign Labs",
      tagline: "Innovating Orthopedic Implants",
      description: "End-to-end design and engineering for orthopedic surgical instrumentation and implants.",
      location: "Warsaw, IN, USA",
      logoUrl: "https://picsum.photos/seed/c10/200/200",
      categories: ["Design & Engineering", "R&D"],
      certifications: ["ISO 13485"],
      isVerified: true,
      foundedYear: 2008
    },
    {
      id: 11,
      name: "MedSecure Packaging",
      tagline: "Faultless Sterile Barriers",
      description: "Advanced sterilization-ready packaging with integrated tamper-evident features.",
      location: "Lyon, France",
      logoUrl: "https://picsum.photos/seed/c11/200/200",
      categories: ["Packaging", "Sterilization"],
      certifications: ["ISO 11607"],
      isVerified: true,
      foundedYear: 2012
    },
    {
      id: 12,
      name: "NanoPrecise Molding",
      tagline: "Atomic Level Tolerance",
      description: "Micro-molding specialists for ophthalmic and neuro-stimulation components.",
      location: "Zurich, Switzerland",
      logoUrl: "https://picsum.photos/seed/c12/200/200",
      categories: ["Molding", "Contract Manufacturing"],
      certifications: ["ISO 13485", "ISO 14001"],
      isVerified: true,
      foundedYear: 2003
    },
    {
      id: 13,
      name: "GlobalMed Logistics",
      tagline: "The Cold Chain Experts",
      description: "Specialized logistics and warehousing for temperature-sensitive medical devices and biologics.",
      location: "Singapore",
      logoUrl: "https://picsum.photos/seed/c13/200/200",
      categories: ["Logistics", "Services"],
      certifications: ["ISO 9001"],
      isVerified: false,
      foundedYear: 1995
    },
    {
      id: 14,
      name: "BioLogics Materials",
      tagline: "Next-Gen Biomaterials",
      description: "Sourcing and development of biodegradable and bioactive materials for long-term implants.",
      location: "San Diego, CA, USA",
      logoUrl: "https://picsum.photos/seed/c14/200/200",
      categories: ["Supplies", "R&D"],
      certifications: ["ISO 13485"],
      isVerified: true,
      foundedYear: 2019
    },
    {
      id: 15,
      name: "Pulse Electronics Med",
      tagline: "Active Electronic Sub-assemblies",
      description: "Contract manufacturer for patient monitors, defibrillators, and diagnostic imaging equipment.",
      location: "Seoul, South Korea",
      logoUrl: "https://picsum.photos/seed/c15/200/200",
      categories: ["Electronics", "Manufacturing"],
      certifications: ["ISO 13485", "FDA Registered"],
      isVerified: true,
      foundedYear: 1990
    }
];