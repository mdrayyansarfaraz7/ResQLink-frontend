import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
} from "lucide-react";

/* ------------------ CONSTANTS ------------------ */
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#mission" },
];

const TIMELINE_STEPS = [
  {
    title: "Submit a Report",
    desc: "Provide essential details about the missing person with a secure, guided form.",
    Icon: FileText,
  },
  {
    title: "AI-Powered Matching",
    desc: "Our models cross-reference reports, photos, and verified sources to find likely matches.",
    Icon: BrainCircuit,
  },
  {
    title: "Real-Time Updates",
    desc: "Get alerts as new information emerges. Track status changes with transparency.",
    Icon: Clock,
  },
  {
    title: "Safe Reunification",
    desc: "We coordinate with authorities and verified volunteers to reunite families safely.",
    Icon: HeartHandshake,
  },
];

const BENEFITS = [
  {
    title: "Accelerate Search Efforts",
    desc: "Centralized data and smart filters speed up time-critical searches.",
    Icon: Search,
  },
  {
    title: "Enhance Coordination",
    desc: "Reliable information sharing between agencies and volunteers.",
    Icon: ShieldCheck,
  },
  {
    title: "Reduce Emotional Trauma",
    desc: "Compassionate tools to support families through the crisis.",
    Icon: Users,
  },
];

/* ------------------ COMPONENTS ------------------ */

function Header({ mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-blue-700">
              Smart
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium text-slate-700 hover:text-blue-700"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#search"
              className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-800 focus:outline-none"
            >
              Search Database
            </a>
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      <div
        className={`${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-50 w-80 max-w-[80vw] transform bg-white shadow-xl transition-transform duration-300 md:hidden`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="font-semibold text-slate-900">Smart Reunite</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#search"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Search Database
          </a>
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
};

function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[88vh] items-center"
      id="home"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1974&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-slate-900/55" />
      <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          A Beacon of Hope in Critical Moments
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-100">
          Smart Reunite connects families with missing loved ones during crises—
          combining verified data, AI-powered matching, and real-time
          coordination to bring people back together safely.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/client-form"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
          >
            File a Missing Person Report
          </Link>

          <a
            href="#search"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Search for a Loved One
          </a>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A Smarter, Faster Process
          </h2>
          <p className="mt-3 text-slate-600">
            We streamline disaster response with a clear, step-by-step workflow—
            built for urgency, accuracy, and compassion.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-1 bg-slate-200" />

          <ol className="space-y-12 relative">
            {TIMELINE_STEPS.map(({ title, desc, Icon }, idx) => (
              <li key={idx} className="relative flex items-start gap-6">
                {/* Icon */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-4 ring-white">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200 w-full">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Transforming Disaster Response
          </h2>
          <p className="mt-4 text-slate-600">
            Our mission is to empower families, responders, and volunteers with
            tools that shorten search times, improve data integrity, and
            prioritize safety.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Smart Reunite
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-300">
            A trusted platform to support families and responders in the most
            critical moments—fast, secure, and compassionate.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Quick Links
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#report" className="hover:text-white">
                Report Missing
              </a>
            </li>
            <li>
              <a href="#search" className="hover:text-white">
                Search Database
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-white">
                How It Works
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Legal
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Smart Reunite. All rights reserved.
      </div>
    </footer>
  );
}

/* ------------------ MAIN ------------------ */
export default function SmartReuniteHome() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-900">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero />
      <Timeline />
      <Mission />
      <Footer />
    </div>
  );
}
