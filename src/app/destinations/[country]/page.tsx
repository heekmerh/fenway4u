"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, Ship, Globe, DollarSign, CheckSquare, Square, Clock, 
  Briefcase, Building2, MapPin, TrendingUp, CheckCircle2, ArrowRight, 
  Search, Award, ShieldAlert, Sun, CloudSnow, Share2, HelpCircle, 
  Send, Loader2, Info, Landmark, HelpCircle as HelpIcon, Heart, Compass, X
} from "lucide-react";

// Types for Country Details Schema
interface Snapshot {
  avgSalary: string;
  costOfLiving: string;
  currency: string;
  cities: string[];
  population: string;
  language: string;
  avgRent: string;
  weather: string;
}

interface Pathway {
  title: string;
  timeline: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  cost: string;
  details: string[];
}

interface JobDemand {
  role: string;
  salary: string;
  level: "High" | "Critical" | "Stable";
  certs: string[];
}

interface CityShowcase {
  name: string;
  weather: string;
  rent: string;
  jobs: string;
  desc: string;
  bgGlow: string;
}

interface ContentArticle {
  title: string;
  category: string;
  readTime: string;
  summary: string;
}

interface CountryDetails {
  fullName: string;
  flag: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBgImage: string;
  snapshot: Snapshot;
  pathways: Pathway[];
  demands: JobDemand[];
  cities: CityShowcase[];
  housingRules: { step: string; detail: string }[];
  scamAlerts: string[];
  weatherGuide: { season: string; temp: string; desc: string; tips: string }[];
  articles: ContentArticle[];
  communities: { type: string; title: string; desc: string }[];
  checklistItems: string[];
}

const countryData: Record<string, CountryDetails> = {
  "canada": {
    fullName: "Canada",
    flag: "🇨🇦",
    heroHeadline: "Build Your Future In Canada",
    heroSubheadline: "Explore legal pathways, study options, high-demand job boards, real cost calculators, and seamless cargo delivery support to start your new chapter.",
    heroBgImage: "/images/hero_customs_1779129505412.png", // reusing existing high quality visual
    snapshot: {
      avgSalary: "$62,000 CAD / Year",
      costOfLiving: "Moderate to High",
      currency: "Canadian Dollar ($ CAD)",
      cities: ["Toronto", "Vancouver", "Calgary", "Montreal", "Ottawa"],
      population: "40 Million",
      language: "English & French",
      avgRent: "$1,850 CAD / Month",
      weather: "-10°C (Winter) to 26°C (Summer)"
    },
    pathways: [
      {
        title: "Study Pathway (PGWP)",
        timeline: "1 - 3 Years",
        difficulty: "Medium",
        cost: "$20,000 - $35,000 CAD/yr",
        details: [
          "Post-Graduation Work Permit (PGWP) eligibility",
          "Top-tier designated learning institutions (DLI)",
          "Part-time work permitted during classes (20 hrs/wk)",
          "Direct pathway to Permanent Residency"
        ]
      },
      {
        title: "Express Entry (Federal Skilled Worker)",
        timeline: "6 - 12 Months",
        difficulty: "Hard",
        cost: "$2,500 - $4,000 CAD",
        details: [
          "Points-based system (CRS score)",
          "Requires age, education, and language validation",
          "No Canadian job offer required to apply",
          "Grants immediate Permanent Residency"
        ]
      },
      {
        title: "Provincial Nominee Programs (PNP)",
        timeline: "12 - 18 Months",
        difficulty: "Medium",
        cost: "$3,000 - $5,000 CAD",
        details: [
          "Custom criteria based on province's job gaps",
          "Accelerated Express Entry linking",
          "Requires commitment to reside in nominee province",
          "Lower CRS score requirements for selected trades"
        ]
      },
      {
        title: "Visitor & Family Super Visa",
        timeline: "2 - 4 Months",
        difficulty: "Easy",
        cost: "$500 - $1,200 CAD",
        details: [
          "Valid for up to 10 years with multi-entry options",
          "Reunite parents and grandparents with sponsors",
          "Requires private health insurance coverage",
          "Fast electronic travel authorization (eTA)"
        ]
      }
    ],
    demands: [
      { role: "Registered Nurses & Caregivers", salary: "$78,000 CAD/yr", level: "Critical", certs: ["NCAS / NNAS Licensing", "CPR Cert"] },
      { role: "Software Developers & Tech Leads", salary: "$95,000 CAD/yr", level: "High", certs: ["AWS/Cloud Techs", "Degree equivalent"] },
      { role: "Commercial Truck Drivers (Class 1)", salary: "$68,000 CAD/yr", level: "Critical", certs: ["Class 1 License", "Air Brake Endorsement"] },
      { role: "Construction Electricians & Carpenters", salary: "$72,000 CAD/yr", level: "Critical", certs: ["Red Seal Certification", "Local Apprentice registration"] }
    ],
    cities: [
      { name: "Toronto", weather: "Moderate Winter (-6°C)", rent: "$2,200 CAD", jobs: "Finance, Tech & Hospitality", desc: "Canada's largest financial core with the most vibrant, culturally diverse African communities.", bgGlow: "shadow-red-500/10" },
      { name: "Calgary", weather: "Cold Dry Winter (-12°C)", rent: "$1,550 CAD", jobs: "Energy, Logistics & Trades", desc: "Extremely affordable rents, zero provincial sales tax, and a booming job market for tradespeople.", bgGlow: "shadow-[#D4AF37]/10" },
      { name: "Vancouver", weather: "Mild Rainy Winter (2°C)", rent: "$2,400 CAD", jobs: "Tech, Creative & Marine", desc: "Voted one of the world's most liveable cities with pristine mountain views but higher cost bounds.", bgGlow: "shadow-blue-500/10" }
    ],
    housingRules: [
      { step: "Prepare Documents", detail: "Landlords require your Letter of Admission/Employment, Credit Report, and Bank Statements." },
      { step: "Understand First & Last", detail: "Standard deposit in Ontario is First and Last month's rent. Security deposits are illegal in Ontario." },
      { step: "Temporary Hosting", detail: "Book an AirBnB or student residence for your first 14 days to physically inspect rentals." }
    ],
    scamAlerts: [
      "Never send cash or wire transfers before viewing the property in person.",
      "Beware of landlords who claim to be out of the country and want to mail keys.",
      "Ensure a standard lease agreement is signed by both parties."
    ],
    weatherGuide: [
      { season: "Deep Winter (Nov - Mar)", temp: "-5°C to -15°C", desc: "Heavy snowfall, icy winds, shorter days.", tips: "Buy a down-filled parka (rated -20°C), winter boots with rubber grip, and take Vitamin D daily." },
      { season: "Vibrant Summer (Jun - Aug)", temp: "20°C to 28°C", desc: "Long sunny days, beautiful lakes, outdoor street festivals.", tips: "Enjoy outdoor barbecues, camping, and explore free multi-cultural heritage events." }
    ],
    articles: [
      { title: "Surviving Your First Canadian Winter: A Newcomer's Guide", category: "Lifestyle", readTime: "5 min", summary: "Layering techniques, heating cost management, and staying active in the snow." },
      { title: "Standard Cost of Living Breakdown: Toronto vs. Calgary", category: "Finance", readTime: "7 min", summary: "A side-by-side comparison of grocery bills, rents, public transit, and income tax rates." },
      { title: "Direct Shipping from Africa to Canada: Fenway4u Support", category: "Logistics", readTime: "4 min", summary: "How to ship native spices, home goods, and documents safely with express air cargo." }
    ],
    communities: [
      { type: "Diaspora Networking", title: "African Association of Canada", desc: "Connect with thousands of professionals, join monthly mixers, and get mentorship." },
      { type: "Culinary Comfort", title: "Nigerian Grocery Markets in Toronto", desc: "Authentic markets in North York and Scarborough offering garri, yams, spices, and palm oil." },
      { type: "Student Associations", title: "African Student Leagues (U of T & York)", desc: "Student networks providing airport pickups, orientation, and study group networks." }
    ],
    checklistItems: [
      "Secure International Passport & Valid Visa Study/Work Permit",
      "Academic Transcripts & Standard Educational WES Evaluations",
      "Pack Winter Outerwear (Waterproof boots, thermal socks, insulated coat)",
      "Set Up Canadian Bank Account & Pre-Transfer Funds",
      "Secure Temporary Housing (AirBnB or shared flat bounds)",
      "Sync Luggage Cargo Sourcing Details with Fenway4u Express Delivery"
    ]
  },
  "united-kingdom": {
    fullName: "United Kingdom",
    flag: "🇬🇧",
    heroHeadline: "Opportunities, Education & Living In The UK",
    heroSubheadline: "Navigate Skilled Worker routes, explore top universities, estimate cost of living, locate African markets, and ship your goods directly to your UK address.",
    heroBgImage: "/images/hero_customs_1779129505412.png",
    snapshot: {
      avgSalary: "£38,000 GBP / Year",
      costOfLiving: "High in London, Moderate in North",
      currency: "British Pound Sterling (£ GBP)",
      cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
      population: "67 Million",
      language: "English (Welsh & Gaelic recognized)",
      avgRent: "£1,250 GBP / Month",
      weather: "2°C (Winter) to 22°C (Summer)"
    },
    pathways: [
      {
        title: "Skilled Worker Visa (Tier 2)",
        timeline: "3 - 6 Months",
        difficulty: "Hard",
        cost: "£1,500 - £3,000 GBP",
        details: [
          "Requires a job offer from an approved licensed UK sponsor",
          "Certificate of Sponsorship (CoS) mandatory",
          "Salary must meet minimum thresholds (£38,700 standard)",
          "Direct pathway to Indefinite Leave to Remain (ILR)"
        ]
      },
      {
        title: "UK Student Visa (Graduate Route)",
        timeline: "2 - 5 Months",
        difficulty: "Medium",
        cost: "£20,000 - £30,000 GBP/yr",
        details: [
          "2-year post-study Graduate Visa allowance",
          "Allows full work rights during post-study stay",
          "NHS Health Surcharge mandatory during residency",
          "Quick electronic biometric visa processing"
        ]
      },
      {
        title: "Health and Care Worker Visa",
        timeline: "1 - 3 Months",
        difficulty: "Medium",
        cost: "£500 - £1,200 GBP",
        details: [
          "Exempt from NHS Health Surcharge fees",
          "Fast-track processing within 3 weeks",
          "Includes nurses, doctors, and adult social care workers",
          "Allows dependent family members to accompany"
        ]
      },
      {
        title: "UK Ancestry Visa",
        timeline: "2 - 4 Months",
        difficulty: "Easy",
        cost: "£600 GBP",
        details: [
          "Requires proof of grandparent born in the UK",
          "Valid for 5 years with full work rights",
          "Can apply for settlement (ILR) after 5 years",
          "Must apply from outside the UK"
        ]
      }
    ],
    demands: [
      { role: "Nurses, Doctors & Care Assistants", salary: "£36,000 GBP/yr", level: "Critical", certs: ["NMC Registration", "OSCE Examination"] },
      { role: "IT Business Analysts & Cyber Experts", salary: "£55,000 GBP/yr", level: "High", certs: ["BCS Professional Certs", "Degree equivalent"] },
      { role: "Civil & Structural Engineers", salary: "£48,000 GBP/yr", level: "High", certs: ["ICE Chartered Membership", "Professional assessment"] },
      { role: "Secondary School STEM Teachers", salary: "£34,000 GBP/yr", level: "Critical", certs: ["Qualified Teacher Status (QTS)", "Subject degree"] }
    ],
    cities: [
      { name: "London", weather: "Damp Mild Winter (4°C)", rent: "£1,900 GBP", jobs: "Finance, Tech & Management", desc: "A historic global mega-city with a huge, well-established African diaspora and cultural networking hubs.", bgGlow: "shadow-blue-500/10" },
      { name: "Manchester", weather: "Rainy Cold Winter (2°C)", rent: "£1,100 GBP", jobs: "Creative, Tech & Education", desc: "The tech heart of the North, highly popular with students due to outstanding universities and lower rents.", bgGlow: "shadow-yellow-500/10" },
      { name: "Birmingham", weather: "Chilly Winter (3°C)", rent: "£980 GBP", jobs: "Engineering, Retail & Public sector", desc: "Brilliant central UK location, rich diversity, and massive redevelopment making it a key job hub.", bgGlow: "shadow-purple-500/10" }
    ],
    housingRules: [
      { step: "Right to Rent Check", detail: "UK landlords are legally required to verify your visa and passport before lease signature." },
      { step: "Guarantor Options", detail: "If you lack UK credit history, you may need a UK-based guarantor or pay 6 months upfront." },
      { step: "Tenancy Deposit Scheme", detail: "Your deposit (max 5 weeks' rent) must legally be protected in a government-backed TDS account." }
    ],
    scamAlerts: [
      "Avoid landlords demanding holding fees via Western Union without a viewing.",
      "Check that the landlord or agency is registered with a professional body like ARLA.",
      "Always request a copy of the Gas Safety Certificate before signing."
    ],
    weatherGuide: [
      { season: "Grey Drizzly Winter (Nov - Feb)", temp: "1°C to 8°C", desc: "Frequent rain, damp wind, short daylight (dark by 4:00 PM).", tips: "Invest in a windproof umbrella, waterproof thermal jacket, and stay active to counter winter blues." },
      { season: "Warm Spring & Summer (May - Aug)", temp: "16°C to 24°C", desc: "Pleasant sunshine, long evenings (light until 9:30 PM), lively pubs.", tips: "Enjoy picnics in public parks, summer music festivals, and train trips around the coast." }
    ],
    articles: [
      { title: "Understanding the NHS Surcharge and Healthcare System", category: "Healthcare", readTime: "6 min", summary: "How to register with a local GP, get prescriptions, and what the NHS covers." },
      { title: "Skilled Worker Visa Sponsor List Guide", category: "Immigration", readTime: "8 min", summary: "Tips on identifying UK companies offering Certificate of Sponsorship (CoS)." },
      { title: "African Grocery Concierge: Getting Spices in the UK", category: "Food Sourcing", readTime: "4 min", summary: "Fenway4u shipping solutions and African grocery markets in London and Manchester." }
    ],
    communities: [
      { type: "Diaspora Networking", title: "UK-African Chamber of Commerce", desc: "A high-end professional network offering business mentorship and diaspora trade events." },
      { type: "Culinary Comfort", title: "London Peckham & Manchester Markets", desc: "Vibrant ethnic markets offering authentic West and East African food staples." },
      { type: "Student Associations", title: "UK African Students Union", desc: "Support groups across Russell Group universities offering peer guidance and career mixers." }
    ],
    checklistItems: [
      "Valid UK Visa (Skilled Worker or Student approval)",
      "TB Test Certificate & NHS Health Surcharge Confirmation",
      "Tenancy Deposit Funds ready in bank (5 weeks' rent equivalent)",
      "Set Up UK SIM Card (Giffgaff/Vodafone order online ahead)",
      "Academic Certificates & Transcripts certified copies",
      "Fenway4u Package Sourced (Spices, cultural clothes, certificates ready to ship)"
    ]
  },
  "united-states": {
    fullName: "United States",
    flag: "🇺🇸",
    heroHeadline: "Endless Opportunities In The United States",
    heroSubheadline: "Navigate visa pathways, access top universities, compute regional cost breakdowns, explore high-paying tech/healthcare jobs, and arrange secure container shipping.",
    heroBgImage: "/images/hero_customs_1779129505412.png",
    snapshot: {
      avgSalary: "$69,000 USD / Year",
      costOfLiving: "High in coastal cities, Moderate in south",
      currency: "United States Dollar ($ USD)",
      cities: ["New York", "Houston", "San Francisco", "Atlanta", "Chicago"],
      population: "335 Million",
      language: "English (Spanish widely spoken)",
      avgRent: "$1,600 USD / Month",
      weather: "-5°C (NY Winter) to 35°C (Texas Summer)"
    },
    pathways: [
      {
        title: "US Student Visa (F1 / STEM OPT)",
        timeline: "2 - 4 Years",
        difficulty: "Medium",
        cost: "$25,000 - $45,000 USD/yr",
        details: [
          "STEM OPT grants up to 3 years post-graduation work rights",
          "Allows working part-time on campus (20 hrs/wk)",
          "Requires SEVIS fee and strong academic sponsorship",
          "Direct route to H1B skilled transition"
        ]
      },
      {
        title: "Skilled Worker Visa (H-1B Speciality)",
        timeline: "6 - 9 Months",
        difficulty: "Very Hard",
        cost: "$3,000 - $6,000 USD (Employer paid)",
        details: [
          "Requires employer sponsorship and specialty degree",
          "Subject to an annual lottery quota system",
          "Valid for up to 6 years with extensions",
          "Dual-intent visa (allows applying for Green Card)"
        ]
      },
      {
        title: "Diversity Visa Lottery (Green Card)",
        timeline: "1 - 2 Years",
        difficulty: "Easy",
        cost: "$330 USD (Visa fee if selected)",
        details: [
          "Annual random selection drawing (DV Lottery)",
          "Requires minimum High School education equivalent",
          "Grants immediate Permanent Residency (Green Card)",
          "Completely free to register in October/November"
        ]
      },
      {
        title: "O-1 Visa (Extraordinary Ability)",
        timeline: "2 - 5 Months",
        difficulty: "Very Hard",
        cost: "$2,000 - $5,000 USD",
        details: [
          "For individuals with outstanding achievements in sciences/arts",
          "Requires strong portfolio, citations, or national awards",
          "No lottery quota cap applies",
          "Sponsored by US agents or employers"
        ]
      }
    ],
    demands: [
      { role: "Software Engineers & AI Specialists", salary: "$118,000 USD/yr", level: "High", certs: ["Technical Portfolio", "Coding Bootcamp equivalent"] },
      { role: "Healthcare Workers & Registered Nurses", salary: "$85,000 USD/yr", level: "Critical", certs: ["NCLEX-RN Exam", "State Nursing Board License"] },
      { role: "Financial Analysts & Accountants", salary: "$76,000 USD/yr", level: "High", certs: ["CPA Certification", "Finance Degree"] },
      { role: "Mechanical & Electrical Engineers", salary: "$90,000 USD/yr", level: "High", certs: ["FE/PE Certification", "ABET accredited degree"] }
    ],
    cities: [
      { name: "Houston", weather: "Warm Mild Winter (12°C)", rent: "$1,250 USD", jobs: "Healthcare, Energy & Engineering", desc: "Outstanding affordability, massive Texas economy, and incredibly welcoming African communities.", bgGlow: "shadow-[#D4AF37]/10" },
      { name: "New York City", weather: "Cold Snow Winter (0°C)", rent: "$2,800 USD", jobs: "Finance, Fashion, Media & Tech", desc: "A magnetic metropolis with rich career opportunities and highly active African networks.", bgGlow: "shadow-red-500/10" },
      { name: "Atlanta", weather: "Chilly Winter (8°C)", rent: "$1,450 USD", jobs: "IT, Logistics & Entertainment", desc: "Often called the multicultural tech hub of the South, offering excellent weather and reasonable rents.", bgGlow: "shadow-purple-500/10" }
    ],
    housingRules: [
      { step: "Build Credit Score", detail: "US landlords heavily screen for US credit history. Newcomers may need a co-signer or larger deposit." },
      { step: "Prepare Lease Files", detail: "Have your paystubs, F1 I-20, or H1B offer letter ready ahead of scheduling viewings." },
      { step: "Application Fees", detail: "Landlords legally charge $35-$75 per applicant to run background checks." }
    ],
    scamAlerts: [
      "Avoid wire transfer requests via Zelle or Venmo before viewing the lease paperwork.",
      "Check listing websites like Apartments.com or Zillow for duplicate scam postings.",
      "Demand a copy of the landlord's property deed if subletting from someone."
    ],
    weatherGuide: [
      { season: "Crisp East Coast Winter (Dec - Feb)", temp: "-3°C to 5°C", desc: "Heavy snow in Northern/East states, freezing temperatures.", tips: "Get a heavy wool/down coat, warm gloves, thermal undergarments, and plan home heating budgets." },
      { season: "Hot Southern Summer (Jun - Aug)", temp: "28°C to 38°C", desc: "Extreme summer heat in Southern/Texas areas, sunny skies.", tips: "Stay hydrated, ensure home air conditioning is serviced, and enjoy swimming and barbecues." }
    ],
    articles: [
      { title: "Understanding the US Credit Score System: A Guide", category: "Finance", readTime: "6 min", summary: "How to open a credit card, build history, and avoid common debt traps." },
      { title: "NCLEX Guide for Foreign-Trained Nurses", category: "Healthcare", readTime: "8 min", summary: "Step-by-step pathway to clear state licensing and obtain nursing visas." },
      { title: "Consolidating Shipping from Africa to US Ports", category: "Logistics", readTime: "5 min", summary: "How Fenway4u handles customs paperwork, car shipping, and LCL container cargo." }
    ],
    communities: [
      { type: "Diaspora Networking", title: "US-African Diaspora Network", desc: "A robust national chamber hosting networking events, funding panels, and student forums." },
      { type: "Culinary Comfort", title: "African Grocery Markets in Houston & Atlanta", desc: "Supermarkets offering fresh native tubers, dry fish, spices, and traditional clothing options." },
      { type: "Student Associations", title: "National Society of Black Engineers", desc: "Student and professional association offering study support, networking, and direct tech job entry." }
    ],
    checklistItems: [
      "Secure US Visa (F-1 Student Approval or H-1B Sponsorship)",
      "Form I-20 / DS-2019 Documents (For students/exchange scholars)",
      "Pre-Arranged Credit Proof (Bank statement or job offer letter)",
      "Obtain international driving permit if planning to buy a vehicle",
      "Pack essential traditional spices and certified academic records",
      "Arrange consolidated ocean cargo or express shipping with Fenway4u"
    ]
  }
};

export default function CountryEcosystemPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = use(params);
  const countrySlug = resolvedParams.country.toLowerCase();
  const currentCountry = countryData[countrySlug];

  const [activeTab, setActiveTab] = useState<"calculator" | "matcher" | "feed">("calculator");
  const [interactiveChecklist, setInteractiveChecklist] = useState<string[]>([]);
  const [calculatorState, setCalculatorState] = useState({
    household: "single",
    shippingCargo: "none",
    flights: 1,
    visaType: "study"
  });

  // AI Matcher state
  const [matcherDrawer, setMatcherDrawer] = useState(false);
  const [matcherOutput, setMatcherOutput] = useState<string | null>(null);
  const [matcherLoading, setMatcherLoading] = useState(false);
  const [matcherInputs, setMatcherInputs] = useState({
    career: "IT",
    budget: "Low",
    lifestyle: "Urban"
  });

  // Local storage for checklist
  useEffect(() => {
    if (currentCountry) {
      const saved = localStorage.getItem(`intmove_checklist_${countrySlug}`);
      if (saved) {
        setInteractiveChecklist(JSON.parse(saved));
      }
    }
  }, [countrySlug, currentCountry]);

  const toggleChecklist = (item: string) => {
    setInteractiveChecklist(prev => {
      const exists = prev.includes(item);
      const updated = exists ? prev.filter(i => i !== item) : [...prev, item];
      localStorage.setItem(`intmove_checklist_${countrySlug}`, JSON.stringify(updated));
      return updated;
    });
  };

  if (!currentCountry) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
        <Globe className="w-16 h-16 text-red-500 animate-spin mb-6" />
        <h1 className="text-3xl font-bold mb-2">Destination Not Found</h1>
        <p className="text-white/50 text-sm max-w-sm mb-6">We are currently building immersive ecosystems for other destinations. Try Canada, United Kingdom, or United States.</p>
        <Link href="/" className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors text-sm uppercase tracking-wider">
          Back to Homepage
        </Link>
      </div>
    );
  }

  // Cost calculator computation
  const calculateTotalCost = () => {
    let visaFee = 500;
    if (calculatorState.visaType === "work") visaFee = 1500;
    else if (calculatorState.visaType === "pr") visaFee = 2500;

    let flightRate = 800;
    if (countrySlug === "canada") flightRate = 950;
    else if (countrySlug === "united-states") flightRate = 1100;
    const flightTotal = calculatorState.flights * flightRate;

    let shippingFee = 0;
    if (calculatorState.shippingCargo === "electronics") shippingFee = 120;
    else if (calculatorState.shippingCargo === "lcl") shippingFee = 450;
    else if (calculatorState.shippingCargo === "car") shippingFee = 1400;

    let baseSettlementCost = 1500; // Rent + Food Deposit
    if (calculatorState.household === "couple") baseSettlementCost = 2500;
    else if (calculatorState.household === "family") baseSettlementCost = 4200;

    return {
      visa: visaFee,
      flights: flightTotal,
      shipping: shippingFee,
      settlement: baseSettlementCost,
      total: visaFee + flightTotal + shippingFee + baseSettlementCost
    };
  };

  const costBreakdown = calculateTotalCost();

  // AI Matching logic
  const handleRunMatcher = () => {
    setMatcherLoading(true);
    setMatcherOutput(null);
    setTimeout(() => {
      let advice = "";
      const career = matcherInputs.career;
      const budget = matcherInputs.budget;
      const lifestyle = matcherInputs.lifestyle;

      if (budget === "Low") {
        advice = `💡 Based on a tighter budget, Calgary (Canada) or Manchester (UK) present the best initial entry points. Calgary offers affordable rents and zero provincial sales tax, while the UK Student Visa (Graduate Route) provides lower immediate tuition bounds. Sourcing a skilled worker sponsor in the healthcare sector ( Adult Social Care ) is also incredibly fast-tracked right now with no visa surcharge fees!`;
      } else if (career === "IT" && lifestyle === "Urban") {
        advice = `💡 Your profile points strongly to the United States (STEM OPT / H-1B specialities) in cities like Atlanta or Seattle, or Toronto (Canada) under the Global Talent Stream. US tech careers command the highest global salaries averaging $118,000 USD, while Toronto boasts the most massive interconnected African tech networking hubs.`;
      } else if (career === "Healthcare") {
        advice = `💡 Critical Alert! Both the UK Health & Care Visa and Canadian provincial streams (BC/Ontario Caregiver PNP) are highly immigration-friendly. The UK Health & Care Visa processes in just 3 weeks with complete exemption from NHS healthcare surcharges, making it the fastest legal relocation route for professional nurses today!`;
      } else {
        advice = `💡 Canada (Express Entry / CRS) remains the most robust permanent immigration destination, especially if you have valid language results. For swift corporate shipping, business freight, or luxury car sourcing, the US Southern Core (Houston) offers extremely low customs friction.`;
      }

      setMatcherOutput(advice);
      setMatcherLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pb-20">
      
      {/* Background blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-purple-500/5 blur-[150px] -z-10 rounded-full" />

      {/* SECTION 1 — CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent z-10" />
          <Image 
            src={currentCountry.heroBgImage} 
            alt={`${currentCountry.fullName} Cinematic Skyline`}
            fill
            className="object-cover opacity-35 mix-blend-screen pointer-events-none"
            priority
          />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <span>{currentCountry.flag} Immersive Ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight text-white">
              {currentCountry.heroHeadline}
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              {currentCountry.heroSubheadline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <button 
              onClick={() => {
                const event = new CustomEvent("open-contact-modal");
                window.dispatchEvent(event);
              }}
              className="w-full sm:w-auto bg-[#D4AF37] text-black font-extrabold px-8 py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all uppercase text-xs tracking-wider"
            >
              Book Relocation Consultation
            </button>
            <a 
              href="#pathways"
              className="w-full sm:w-auto bg-white/5 text-white font-extrabold px-8 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors uppercase text-xs tracking-wider text-center"
            >
              Explore Visa Pathways
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase font-bold tracking-widest animate-bounce z-20 flex flex-col items-center gap-2">
          <span>Scroll to Explore</span>
          <div className="w-1 h-8 bg-gradient-to-b from-[#D4AF37] to-transparent rounded-full" />
        </div>
      </section>

      {/* SECTION 2 — COUNTRY SNAPSHOT DASHBOARD */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#090909]/80 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Country Snapshot <span className="text-[#D4AF37]">Dashboard</span></h2>
            <p className="text-white/50 text-sm mt-2">Live structural statistics & legal benchmarks for {currentCountry.fullName}.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Average Salary", val: currentCountry.snapshot.avgSalary, sub: "Skilled professional baseline", color: "text-[#D4AF37]" },
              { label: "Cost of Living", val: currentCountry.snapshot.costOfLiving, sub: "Rent + groceries index", color: "text-blue-400" },
              { label: "Currency Status", val: currentCountry.snapshot.currency, sub: "Direct local transactions", color: "text-purple-400" },
              { label: "Immigrant Rent", val: currentCountry.snapshot.avgRent, sub: "One-bedroom city center avg", color: "text-emerald-400" },
              { label: "Target Population", val: currentCountry.snapshot.population, sub: "Dynamic growing demographic", color: "text-white" },
              { label: "Official Languages", val: currentCountry.snapshot.language, sub: "Primary visa requirements", color: "text-white" },
              { label: "Climate Spectrum", val: currentCountry.snapshot.weather, sub: "Seasonal temperature range", color: "text-white" },
              { label: "Popular Cities", val: currentCountry.snapshot.cities.slice(0, 3).join(", "), sub: "High African diaspora ratios", color: "text-[#D4AF37]" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-xl group hover:border-[#D4AF37]/30 transition-colors">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest">{stat.label}</p>
                <p className={`text-lg md:text-xl font-black mt-2 tracking-tight ${stat.color}`}>{stat.val}</p>
                <p className="text-white/30 text-[10px] font-light mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — IMMIGRATION PATHWAYS */}
      <section id="pathways" className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Strategic Visa <span className="text-[#D4AF37]">Pathways</span></h2>
            <p className="text-white/50 text-sm mt-2">Structured legal routes analyzed by our expert immigration coordinators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentCountry.pathways.map((path, idx) => (
              <div key={idx} className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-black text-white">{path.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-white/5 border border-white/10 text-white/70 text-[9px] px-2 py-0.5 rounded font-bold uppercase">⏱️ {path.timeline}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase border
                        ${path.difficulty === "Easy" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}
                        ${path.difficulty === "Medium" && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}
                        ${path.difficulty === "Hard" && "bg-red-500/10 text-red-400 border-red-500/20"}
                        ${path.difficulty === "Very Hard" && "bg-purple-500/10 text-purple-400 border-purple-500/20"}
                      `}>
                        Difficulty: {path.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/40 uppercase font-bold">Estimated Cost</p>
                    <p className="text-sm font-bold font-mono text-[#D4AF37] mt-0.5">{path.cost}</p>
                  </div>
                </div>

                <ul className="space-y-3.5 border-t border-white/5 pt-4">
                  {path.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => {
                    const event = new CustomEvent("open-contact-modal");
                    window.dispatchEvent(event);
                  }}
                  className="w-full bg-white/5 group-hover:bg-[#D4AF37] text-white group-hover:text-black font-extrabold py-3.5 rounded-xl border border-white/10 group-hover:border-transparent transition-all uppercase text-[10px] tracking-wider text-center"
                >
                  Start Relocation Pathway
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — INTERACTIVE RELOCATION & FINANCIAL DASHBOARD */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#090909]/80 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Interactive Relocation <span className="text-[#D4AF37]">Calculator</span></h2>
            <p className="text-white/50 text-sm mt-2">Adjust variables to estimate your visa, shipping, flights, and settlement budget.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Calculator Toggles */}
            <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
              
              {/* Visa Pathway selector */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">1. Visa / Pathway Type</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "study", label: "Study Visa" },
                    { id: "work", label: "Work Sponsor" },
                    { id: "pr", label: "Permanent Res." }
                  ].map(v => (
                    <button
                      key={v.id}
                      onClick={() => setCalculatorState({...calculatorState, visaType: v.id})}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all
                        ${calculatorState.visaType === v.id 
                          ? "bg-blue-600/10 border-blue-500 text-blue-400" 
                          : "bg-black border-white/5 text-white/50 hover:border-white/20"}`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Household type */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">2. Relocating Household Size</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "single", label: "Single Person" },
                    { id: "couple", label: "Couple (2 pax)" },
                    { id: "family", label: "Family (3-5 pax)" }
                  ].map(h => (
                    <button
                      key={h.id}
                      onClick={() => setCalculatorState({...calculatorState, household: h.id})}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all
                        ${calculatorState.household === h.id 
                          ? "bg-purple-600/10 border-purple-500 text-purple-400" 
                          : "bg-black border-white/5 text-white/50 hover:border-white/20"}`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flights ticket count slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest">3. Airline Flight Tickets</label>
                  <span className="text-xs font-bold text-white font-mono">{calculatorState.flights} Ticket(s)</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6"
                  value={calculatorState.flights}
                  onChange={(e) => setCalculatorState({...calculatorState, flights: Number(e.target.value)})}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              {/* Shipping cargo sourcing tier */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">4. Fenway4u Sourcing & Shipping Cargo</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "none", label: "No Cargo" },
                    { id: "electronics", label: "Devices Only" },
                    { id: "lcl", label: "Box (LCL)" },
                    { id: "car", label: "Vehicle Cargo" }
                  ].map(cargo => (
                    <button
                      key={cargo.id}
                      onClick={() => setCalculatorState({...calculatorState, shippingCargo: cargo.id})}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-bold transition-all truncate
                        ${calculatorState.shippingCargo === cargo.id 
                          ? "bg-amber-500/10 border-[#D4AF37] text-[#D4AF37]" 
                          : "bg-black border-white/5 text-white/50 hover:border-white/20"}`}
                    >
                      {cargo.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Cost Invoice Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-[#050505] border border-[#D4AF37]/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
              
              <div>
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" /> Relocation Estimate Invoice
                </h4>
                
                <div className="space-y-3 text-xs border-b border-white/5 pb-4">
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Legal & Visa Proc. Fees</span>
                    <span className="font-mono text-white">${costBreakdown.visa} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Estimated Aviation Tickets</span>
                    <span className="font-mono text-white">${costBreakdown.flights} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Fenway4u Logistics Cargo</span>
                    <span className="font-mono text-white">${costBreakdown.shipping} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Settlement (1st Month Deposit)</span>
                    <span className="font-mono text-white">${costBreakdown.settlement} USD</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-white">Estimated Relocation Cost</span>
                  <span className="text-2xl font-black text-[#D4AF37] font-mono">${costBreakdown.total} USD</span>
                </div>
                <p className="text-[9px] text-white/30 italic mt-2">Disclaimer: Simulated calculation based on historical trends. Actual prices vary.</p>
                <button 
                  onClick={() => {
                    const event = new CustomEvent("open-contact-modal");
                    window.dispatchEvent(event);
                  }}
                  className="w-full bg-[#D4AF37] text-black font-extrabold py-3.5 rounded-xl hover:bg-yellow-400 transition-colors uppercase text-[10px] tracking-wider text-center mt-4"
                >
                  Confirm Sourcing Estimate
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — JOBS IN DEMAND */}
      <section className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Jobs In <span className="text-[#D4AF37]">Demand</span></h2>
            <p className="text-white/50 text-sm mt-2">Accelerated job roles offering high-rate immigration sponsorship.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCountry.demands.map((job, idx) => (
              <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-xl group hover:border-blue-500/20 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full m-4 bg-red-500 animate-pulse" />
                <Briefcase className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-bold text-white text-base leading-tight min-h-[44px]">{job.role}</h3>
                
                <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/40">Average Salary:</span>
                    <span className="font-mono text-[#D4AF37] font-bold">{job.salary}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/40">Demand:</span>
                    <span className="text-red-400 font-bold uppercase">{job.level}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[8px] text-white/30 uppercase font-bold">Required Credentials:</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {job.certs.map((c, cIdx) => (
                      <span key={cIdx} className="bg-white/5 text-white/60 text-[8px] px-1.5 py-0.5 rounded border border-white/5">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — BEST CITIES FOR IMMIGRANTS */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#090909]/85 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Best Cities For <span className="text-[#D4AF37]">Immigrants</span></h2>
            <p className="text-white/50 text-sm mt-2">Top-ranked hubs with established African community ties and rich lifestyle profiles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentCountry.cities.map((city, idx) => (
              <div key={idx} className={`bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl hover:scale-105 transition-transform duration-300 ${city.bgGlow}`}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-2xl font-black text-white">{city.name}</h3>
                </div>
                
                <p className="text-white/60 text-xs leading-relaxed font-light">{city.desc}</p>
                
                <div className="border-t border-white/5 pt-3.5 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/40">Winter Weather:</span>
                    <span className="text-white font-semibold">{city.weather}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Average Rent:</span>
                    <span className="text-white font-semibold">{city.rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Core Job Sector:</span>
                    <span className="text-[#D4AF37] font-semibold">{city.jobs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 & 8 — HOUSING GUIDANCE & RELOCATION CARGO */}
      <section className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Housing Guidance */}
          <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-2xl md:text-3xl font-black flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#D4AF37]" /> Rental & Housing Guidance
            </h3>
            <p className="text-white/50 text-sm font-light">Navigating housing leases without local credit scores.</p>
            
            <div className="space-y-4">
              {currentCountry.housingRules.map((rule, idx) => (
                <div key={idx} className="flex gap-4 items-start p-3 bg-white/2 rounded-xl border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">{idx+1}</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{rule.step}</h4>
                    <p className="text-white/50 text-[10px] mt-0.5">{rule.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl space-y-2">
              <h4 className="text-[10px] font-black uppercase text-red-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Anti-Scam Alert Guide
              </h4>
              <ul className="list-disc list-inside text-[9px] text-white/60 space-y-1">
                {currentCountry.scamAlerts.map((scam, idx) => <li key={idx}>{scam}</li>)}
              </ul>
            </div>
          </div>

          {/* Relocation & Sourcing Support (Fenway4u) */}
          <div className="bg-gradient-to-br from-blue-950/20 to-[#0A0F1C] border border-blue-500/20 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div>
              <h3 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                <Ship className="w-6 h-6 text-blue-400" /> Relocation & Shipping Support
              </h3>
              <p className="text-white/50 text-sm font-light">Seamless cargo logistics directly integrated with Fenway4u networks.</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { title: "Standard Ocean Cargo", detail: "Perfect for household boxes & large volumes (LCL / FCL)." },
                  { title: "Express Air Delivery", detail: "Fast-tracked 3-5 days delivery for academic credentials & tech." },
                  { title: "Luxury Car Shipping", detail: "Bidding, custom clearance, and final port vehicle delivery." },
                  { title: "African Food Sourcing", detail: "Vacuum-sealed packaging delivering culinary staples fresh." }
                ].map((serv, idx) => (
                  <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <h4 className="font-bold text-white text-xs">{serv.title}</h4>
                    <p className="text-white/40 text-[9px] font-light">{serv.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <p className="text-[10px] text-white/40 font-bold uppercase">Ready to ship?</p>
                <p className="text-xs text-white/60 font-light mt-0.5">Use our active cargo calculators for instant pricing.</p>
              </div>
              <Link href="/shop-for-me" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors">
                Open Shipping Portal
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9 — WEATHER & SEASONS */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#090909]/85 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Weather & <span className="text-[#D4AF37]">Seasons Guide</span></h2>
            <p className="text-white/50 text-sm mt-2">Adjusting to local climates. Detailed seasonal clothing & temperature limits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentCountry.weatherGuide.map((w, idx) => (
              <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl group hover:border-[#D4AF37]/20 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-bl-full flex items-center justify-center">
                  {w.season.includes("Winter") ? <CloudSnow className="w-8 h-8 text-blue-400" /> : <Sun className="w-8 h-8 text-amber-400" />}
                </div>
                
                <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/80 font-bold uppercase">{w.season}</span>
                <p className="text-2xl font-black text-white mt-3 font-mono">{w.temp}</p>
                <p className="text-white/50 text-xs font-light mt-1.5 leading-relaxed">{w.desc}</p>
                
                <div className="mt-4 p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] text-[#D4AF37] font-light leading-relaxed">
                  <strong>💡 Pro Tip:</strong> {w.tips}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — LIFE ABROAD CONTENT HUB */}
      <section className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">Life Abroad <span className="text-[#D4AF37]">Content Hub</span></h2>
            <p className="text-white/50 text-sm mt-2">Modern editorial stories and practical lifestyle guidelines for newcomers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentCountry.articles.map((art, idx) => (
              <div key={idx} className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-blue-500/20 transition-colors">
                <div>
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    <span>{art.category}</span>
                    <span className="text-white/30">{art.readTime} Read</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-3 group-hover:text-blue-400 transition-colors leading-snug">{art.title}</h3>
                  <p className="text-white/50 text-xs font-light mt-2 leading-relaxed">{art.summary}</p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/5 flex items-center text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest gap-1 group-hover:gap-2 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 — AFRICAN COMMUNITY ABROAD */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#090909]/85 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black">African Community <span className="text-[#D4AF37]">Abroad</span></h2>
            <p className="text-white/50 text-sm mt-2">Established support structures, grocers, and networking spaces so you never feel alone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCountry.communities.map((comm, idx) => (
              <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl relative shadow-xl hover:border-purple-500/20 transition-colors">
                <span className="text-[8px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-extrabold text-purple-400 uppercase tracking-widest">{comm.type}</span>
                <h3 className="font-bold text-white text-base mt-3">{comm.title}</h3>
                <p className="text-white/50 text-xs font-light mt-1.5 leading-relaxed">{comm.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14 — INTERACTIVE RELOCATION CHECKLIST */}
      <section className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-4xl bg-[#0c0c0c] border border-white/5 p-6 md:p-8 rounded-3xl shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
          
          <div className="text-center mb-10 border-b border-white/5 pb-6">
            <h3 className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2">
              <CheckSquare className="w-6 h-6 text-[#D4AF37]" /> Interactive Relocation Checklist
            </h3>
            <p className="text-white/50 text-xs mt-1">Cross off milestones as you finalize travel files. Progress auto-saves locally.</p>
            
            {/* Checklist progress bar */}
            <div className="flex items-center gap-3 max-w-sm mx-auto mt-4">
              <div className="flex-grow bg-white/5 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(interactiveChecklist.length / currentCountry.checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 font-mono shrink-0">
                {interactiveChecklist.length}/{currentCountry.checklistItems.length}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {currentCountry.checklistItems.map(item => {
              const checked = interactiveChecklist.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleChecklist(item)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left text-xs transition-all duration-300
                    ${checked 
                      ? 'bg-emerald-500/5 border-emerald-500/30 text-white font-semibold shadow-inner' 
                      : 'bg-black border-white/5 text-white/60 hover:border-white/20'}`}
                >
                  <div className="shrink-0 mt-0.5">
                    {checked 
                      ? <CheckSquare className="w-4 h-4 text-emerald-400" /> 
                      : <Square className="w-4 h-4 text-white/30" />
                    }
                  </div>
                  <span className={checked ? 'line-through text-white/40' : ''}>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 15 — FINAL CTA */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#090909]/60 relative z-20 text-center">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-6xl font-black">Start Your Journey To {currentCountry.fullName}</h2>
          <p className="text-white/60 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Expert relocation, legal advisory, visa checklists, and specialized cargo shipping support designed for your global future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => {
                const event = new CustomEvent("open-contact-modal");
                window.dispatchEvent(event);
              }}
              className="w-full sm:w-auto bg-[#D4AF37] text-black font-extrabold px-8 py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all uppercase text-xs tracking-wider"
            >
              Book Sourcing Consultation
            </button>
            <a 
              href="mailto:consult@fenway4u.com"
              className="w-full sm:w-auto bg-white/5 text-white font-extrabold px-8 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors uppercase text-xs tracking-wider text-center"
            >
              Email An Advisor
            </a>
          </div>
        </div>
      </section>

      {/* ADVANCED FLOATING TOOL: MATCH ASSISTANT DRAWER */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setMatcherDrawer(true)}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold text-xs px-4 py-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all uppercase tracking-wider"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>AI Country Matcher</span>
        </button>
      </div>

      {/* MATCH DRAWER MODAL */}
      <AnimatePresence>
        {matcherDrawer && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMatcherDrawer(false)}
              className="absolute inset-0 z-0 cursor-pointer"
            />

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="relative z-10 w-full max-w-md h-full md:h-[90vh] bg-[#0A0F1C] border-l border-white/10 md:rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">AI Match Assistant</h3>
                  </div>
                  <button onClick={() => setMatcherDrawer(false)} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-white/50 leading-relaxed font-light">Input your primary skills, budget bounds, and preferred environment, and our advisor will match you instantly.</p>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Primary Profession / Skills</label>
                    <select
                      value={matcherInputs.career}
                      onChange={(e) => setMatcherInputs({...matcherInputs, career: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="IT">IT & Software Engineering</option>
                      <option value="Healthcare">Healthcare & Social Nursing</option>
                      <option value="Trades">Skilled Carpentry & Trades</option>
                      <option value="Finance">Finance & Chartered Accounting</option>
                      <option value="Logistics">Commercial Logistics / Trucking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Relocation Capital Budget</label>
                    <select
                      value={matcherInputs.budget}
                      onChange={(e) => setMatcherInputs({...matcherInputs, budget: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Low">Low Budget (Tighter bounds)</option>
                      <option value="Medium">Medium Budget (Standard tuition/deposits)</option>
                      <option value="High">High Budget (Sponsorship/Investment ready)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1.5">Preferred Lifestyle Environment</label>
                    <select
                      value={matcherInputs.lifestyle}
                      onChange={(e) => setMatcherInputs({...matcherInputs, lifestyle: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Urban">Mega-City Core (Vibrant density)</option>
                      <option value="Suburban">Suburban/Mid-sized (Affordable / families)</option>
                      <option value="Coast">Scenic Coastal (Nature & temperate winters)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRunMatcher}
                  disabled={matcherLoading}
                  className="w-full bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold py-3 rounded-xl transition-all uppercase text-[10px] tracking-wider flex items-center justify-center gap-1.5"
                >
                  {matcherLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Run Profile Matcher"}
                </button>
              </div>

              {/* Matcher Results Block */}
              <div className="flex-1 mt-6 overflow-y-auto pr-1">
                {matcherLoading && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-2 text-center text-white/30 text-xs">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
                    <span>Analyzing legal thresholds...</span>
                  </div>
                )}

                {matcherOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-white/80 leading-relaxed font-light"
                  >
                    {matcherOutput}
                  </motion.div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 text-center">
                <p className="text-[9px] text-white/30 italic">Match advisor powered by Fenway4u global travel models.</p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
