import React, { useState } from "react";
import {
  HeartPulse,
  Menu,
  X,
  FileText,
  BrainCircuit,
  Clock,
  HeartHandshake,
  Search,
  ShieldCheck,
  Users,
  ArrowRight,
  Newspaper,
  AlertTriangle,
  CheckCircle2,
  BellRing,
} from "lucide-react";

/* ------------------ COLOR PALETTE & CONSTANTS ------------------ */
const PRIMARY_BLUE = "bg-[#18365B]";
const PRIMARY_BLUE_HOVER = "hover:bg-[#132A4A]";
const PRIMARY_TEXT = "text-[#18365B]";
const SECONDARY_CYAN = "text-[#00A9A5]";
const SECONDARY_CYAN_BG = "bg-[#00A9A5]";
const CTA_ORANGE = "bg-[#D9531E]";
const CTA_ORANGE_HOVER = "hover:bg-[#BF4A1A]";
const HOPE_YELLOW = "text-[#FFC72C]";
const DARK_TEXT = "text-gray-800";
const LIGHT_TEXT = "text-white";
const SOFT_BACKGROUND = "bg-[#F3F6F9]";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Our Process", href: "#how-it-works" },
  { label: "Our Mission", href: "#mission" },
  { label: "Crisis Updates", href: "#updates" },
];

const TIMELINE_STEPS = [
  {
    title: "Securely Submit Your Verified Report",
    desc: "A guided, encrypted process to capture essential details about the missing person and the crisis context.",
    Icon: FileText,
  },
  {
    title: "AI-Powered Instant Match and Analysis",
    desc: "Our models cross-reference reports against vetted external sources and survivor data for high-confidence matches in real-time.",
    Icon: BrainCircuit,
  },
  {
    title: "Transparent Tracking & Critical Alerts",
    desc: "Families and verified agencies receive immediate, clear status updates and alerts as actionable information emerges.",
    Icon: Clock,
  },
  {
    title: "Coordinated & Safe Reunion Protocol",
    desc: "We coordinate with trusted authorities and validated field volunteers to execute the reunion safely and minimize emotional trauma.",
    Icon: HeartHandshake,
  },
];

const BENEFITS = [
  {
    title: "Accelerate Critical Search Time",
    desc: "Centralized, secure data and AI-driven filters drastically cut down the time required for initial and ongoing searches.",
    Icon: Search,
  },
  {
    title: "Guaranteed Data Integrity",
    desc: "Only verified data from authenticated sources is used, ensuring reliability and fostering crucial inter-agency trust.",
    Icon: ShieldCheck,
  },
  {
    title: "Empower Coordinated Response",
    desc: "Reliable, real-time information sharing synchronizes efforts between all agencies and vetted volunteer networks.",
    Icon: Users,
  },
];

const METRICS = [
  {
    value: "99.7%",
    label: "Data Vetting Accuracy",
    Icon: ShieldCheck,
  },
  {
    value: "< 12H",
    label: "Median Match Alert Time",
    Icon: Clock,
  },
  {
    value: "2,500+",
    label: "Active Field Volunteers",
    Icon: Users,
  },
];

const LATEST_UPDATES = [
  {
    id: 1,
    title:
      "Post-Storm Reunification: Over 80 families safely reunited in Sector Delta.",
    date: "October 29, 2025",
    type: "Reunion Success",
    Icon: CheckCircle2,
    color: "text-green-600 bg-green-50",
  },
  {
    id: 2,
    title:
      "System Upgrade: New Multi-Modal AI deployed for image and text matching.",
    date: "October 25, 2025",
    type: "System Update",
    Icon: BrainCircuit,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: 3,
    title:
      "ACTION REQUIRED: Urgent need for verified medical personnel in Sector 3 (South Region).",
    date: "October 24, 2025",
    type: "Action Required",
    Icon: AlertTriangle,
    color: "text-red-600 bg-red-50",
  },
  {
    id: 4,
    title:
      "Volunteer Drive 2025: Enlistment for next phase of field assistance now open.",
    date: "October 20, 2025",
    type: "Volunteer Drive",
    Icon: Users,
    color: "text-amber-600 bg-amber-50",
  },
];

/* ------------------ COMPONENTS ------------------ */

function Header({ mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${PRIMARY_BLUE} ${LIGHT_TEXT}`}
          >
            <HeartPulse className="h-5 w-5" />
          </span>
          <span
            className={`text-xl font-medium tracking-tight ${PRIMARY_TEXT}`}
          >
            Smart Reunite
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm text-slate-600 hover:text-[#18365B]"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#report"
            className={`inline-flex items-center rounded-full ${CTA_ORANGE} px-5 py-2 text-sm font-medium ${LIGHT_TEXT} ${CTA_ORANGE_HOVER} transition transform hover:scale-105`}
          >
            File Urgent Report
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="absolute top-0 right-0 bg-white w-64 h-full p-6 shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mt-10 space-y-4">
              {NAV_ITEMS.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-slate-700 hover:text-[#18365B]"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#report"
                onClick={() => setMobileOpen(false)}
                className={`block text-center rounded-full ${CTA_ORANGE} px-4 py-3 text-sm font-medium ${LIGHT_TEXT}`}
              >
                Act Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[90vh] items-center text-center text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://image.cnbcfm.com/api/v1/image/106806318-16070850822020-12-04t110151z_1392206137_rc2bgk94ci4s_rtrmadp_0_usa-immigration-storms.jpeg?v=1610032508')",
        }}
      />
      <div className="absolute inset-0 bg-slate-900/80" />
      <div className="mx-auto max-w-6xl px-4 py-20 z-10">
        <h1 className="text-5xl sm:text-6xl font-semibold">
          Immediate Action.{" "}
          <span className="text-[#00A9A5]">Verified Data.</span> The Fastest
          Path to Reunification.
        </h1>
        <p className="mt-6 text-lg text-slate-200 max-w-2xl mx-auto">
          When every moment counts, rely on our secure AI-driven platform for
          clarity, trust, and immediate action.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <a
            href="#report"
            className={`rounded-full ${CTA_ORANGE} px-8 py-4 font-medium ${LIGHT_TEXT} ${CTA_ORANGE_HOVER} transform hover:scale-[1.05]`}
          >
            Act Now: File a Critical Report
          </a>
          <a
            href="#search"
            className="rounded-full border border-white/30 px-8 py-4 font-medium text-white hover:bg-white/20"
          >
            Search Verified Matches
          </a>
        </div>
      </div>
    </section>
  );
}

function ImpactMetrics() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        {METRICS.map((m) => (
          <div key={m.label}>
            <m.Icon className="mx-auto h-8 w-8 text-[#18365B]" />
            <h3 className="text-4xl font-semibold text-[#18365B] mt-3">
              {m.value}
            </h3>
            <p className="text-slate-600 mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="how-it-works" className={`${SOFT_BACKGROUND} py-24`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-[#18365B] mb-12">
          Our Clear 4-Step Process
        </h2>
        <ol className="space-y-10">
          {TIMELINE_STEPS.map(({ title, desc, Icon }, idx) => (
            <li
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md flex items-start gap-5 hover:shadow-lg transition"
            >
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full ${PRIMARY_BLUE} ${LIGHT_TEXT}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`text-lg font-medium ${PRIMARY_TEXT}`}>
                  {title}
                </h3>
                <p className="text-slate-600 mt-1">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className={`text-3xl font-semibold ${PRIMARY_TEXT}`}>
          Our Core Mission
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          We empower families, responders, and volunteers with smart, secure,
          and transparent tools to reunite safely and quickly.
        </p>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {BENEFITS.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-md hover:shadow-xl transition"
            >
              <div
                className={`h-14 w-14 mx-auto flex items-center justify-center rounded-xl ${SECONDARY_CYAN_BG} ${LIGHT_TEXT}`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className={`mt-5 text-lg font-medium ${DARK_TEXT}`}>
                {title}
              </h3>
              <p className="mt-2 text-slate-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrisisUpdates() {
  return (
    <section id="updates" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-3xl font-semibold text-center ${PRIMARY_TEXT}`}>
          Live Crisis Updates & Field Reports
        </h2>
        <p className="text-slate-600 text-center mt-3 mb-10">
          Stay informed with the latest verified developments from our response
          network.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LATEST_UPDATES.map(({ id, title, date, type, Icon, color }) => (
            <div
              key={id}
              className={`group relative bg-white rounded-3xl shadow-md border border-slate-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center justify-center rounded-lg p-2 ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm text-slate-500">{date}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-800 group-hover:text-[#18365B] transition">
                {title}
              </h3>

              <span
                className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium ${color}`}
              >
                {type}
              </span>

              <button className="mt-5 flex items-center text-sm font-medium text-[#00A9A5] group-hover:underline">
                <BellRing className="h-4 w-4 mr-2" />
                View Full Update
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className={`inline-flex items-center rounded-full ${PRIMARY_BLUE} px-8 py-3 text-sm font-semibold ${LIGHT_TEXT} ${PRIMARY_BLUE_HOVER} transform hover:scale-105`}
          >
            <Newspaper className="mr-2 h-4 w-4" /> View All Field Reports
          </a>
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  return (
    <section className="py-20 bg-slate-900 text-center text-white">
      <h2 className="text-3xl font-semibold mb-6">
        The Power of Verified Reunification
      </h2>
      <blockquote className="max-w-3xl mx-auto text-slate-300 italic">
        "We were given new hope when we needed it most. The AI match was
        instantaneous and secure, and the support team was with us every step of
        the way."
      </blockquote>
      <p className={`mt-4 text-sm ${HOPE_YELLOW}`}>
        — Maria S., Reunited Family Member
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-10 text-center text-sm">
      <HeartPulse className="h-6 w-6 mx-auto text-[#00A9A5]" />
      <p className="mt-2">© {new Date().getFullYear()} Smart Reunite</p>
    </footer>
  );
}

/* ------------------ MAIN APP COMPONENT ------------------ */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen font-sans text-slate-900 antialiased">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Hero />
        <ImpactMetrics />
        <Timeline />
        <Mission />
        <CrisisUpdates />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}
