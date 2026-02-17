"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Eye,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Building2,
  ExternalLink,
  Shield,
  ChevronRight,
  Bell,
  LogOut,
  Crown,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

// Placeholder dashboard — will be populated with real data once auth is wired
const mockStats = {
  profileViews: 847,
  contactRequests: 23,
  searchAppearances: 2_341,
  directoryRank: 12,
};

const mockMessages = [
  {
    id: 1,
    from: "Sarah Chen",
    company: "BioMedik Solutions",
    subject: "ISO 13485 Certification Inquiry",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    from: "Marcus Johnson",
    company: "NovaTech Devices",
    subject: "Contract Manufacturing Quote Request",
    time: "1d ago",
    unread: true,
  },
  {
    id: 3,
    from: "Dr. Emily Park",
    company: "Surgical Dynamics",
    subject: "Partnership Opportunity",
    time: "3d ago",
    unread: false,
  },
];

type TabKey = "overview" | "messages" | "profile" | "settings";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "messages", label: "Inquiries", icon: <MessageSquare className="w-4 h-4" /> },
    { key: "profile", label: "Profile", icon: <Building2 className="w-4 h-4" /> },
    { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-bone pt-28 pb-16 px-6 relative">
      {/* Subtle decorative elements */}
      <div className="absolute top-32 right-0 w-[500px] h-[500px] bg-retro-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-med-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-retro-orange font-tech font-bold uppercase tracking-widest text-xs mb-2">
              <Shield className="w-4 h-4" />
              <span>Catalyst Plan</span>
            </div>
            <h1 className="font-serif font-bold text-4xl text-ink mb-1">
              Dashboard
            </h1>
            <p className="font-sans text-ink/50 text-sm">
              Manage your company profile and analytics
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-tech font-bold rounded-xl border-2 border-med-teal/20 text-med-teal hover:border-retro-orange hover:text-retro-orange transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              View Public Profile
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-tech font-bold rounded-xl bg-med-teal text-bone hover:shadow-[0_0_20px_rgba(214,90,49,0.3)] transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-med-teal/5 p-1.5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-tech font-bold transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-med-teal text-bone shadow-md"
                  : "text-ink/50 hover:text-med-teal hover:bg-white/50"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.key === "messages" && (
                <span className="w-5 h-5 rounded-full bg-retro-orange text-white text-[10px] flex items-center justify-center font-mono">
                  2
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </main>
  );
}

/* ─── Overview Tab ─────────────────────────────── */
function OverviewTab() {
  const stats = [
    {
      icon: <Eye className="w-5 h-5" />,
      value: mockStats.profileViews.toLocaleString(),
      label: "Profile Views",
      change: "+12%",
      color: "text-med-teal",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      value: mockStats.contactRequests.toString(),
      label: "Contact Requests",
      change: "+5",
      color: "text-retro-orange",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      value: mockStats.searchAppearances.toLocaleString(),
      label: "Search Appearances",
      change: "+18%",
      color: "text-med-teal",
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: `#${mockStats.directoryRank}`,
      label: "Directory Rank",
      change: "↑3",
      color: "text-retro-orange",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl p-6 hover:shadow-lg hover:border-retro-orange/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} group-hover:text-retro-orange transition-colors`}>
                {stat.icon}
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-serif font-bold text-ink mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-sans text-ink/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard
          icon={<Building2 className="w-7 h-7 text-med-teal" />}
          title="Company Profile"
          description="Update your company description, capabilities, certifications, and contact information."
          action="Edit Profile"
        />
        <DashboardCard
          icon={<MessageSquare className="w-7 h-7 text-retro-orange" />}
          title="Inquiries"
          description="View and respond to contact requests from engineers and procurement teams."
          action="View Inquiries"
          badge="2 new"
          onClick={() => {}}
        />
        <DashboardCard
          icon={<BarChart3 className="w-7 h-7 text-med-teal" />}
          title="Analytics"
          description="Deep-dive into profile views, search impressions, and engagement metrics over time."
          action="View Analytics"
          tier="Catalyst+"
        />
        <DashboardCard
          icon={<Settings className="w-7 h-7 text-retro-orange" />}
          title="Account Settings"
          description="Manage your subscription plan, billing information, and notification preferences."
          action="Manage Settings"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal" />
        <div className="p-6">
          <h3 className="font-serif font-bold text-xl text-ink mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { icon: <Eye className="w-4 h-4" />, text: "Your profile was viewed 23 times today", time: "Today" },
              { icon: <MessageSquare className="w-4 h-4" />, text: "New inquiry from BioMedik Solutions", time: "2 hours ago" },
              { icon: <CheckCircle2 className="w-4 h-4" />, text: "Profile verification completed", time: "Yesterday" },
              { icon: <TrendingUp className="w-4 h-4" />, text: "You moved up 3 spots in directory rankings", time: "3 days ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-med-teal/5 last:border-0">
                <div className="w-8 h-8 rounded-full bg-med-teal/10 flex items-center justify-center text-med-teal shrink-0">
                  {item.icon}
                </div>
                <p className="font-sans text-sm text-ink flex-1">{item.text}</p>
                <span className="text-xs font-tech text-ink/40 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Messages Tab ─────────────────────────────── */
function MessagesTab() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal" />
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl text-ink mb-6">Inquiries</h3>
        <div className="space-y-1">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition-all ${
                msg.unread
                  ? "bg-retro-orange/5 hover:bg-retro-orange/10"
                  : "hover:bg-med-teal/5"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-med-teal/10 flex items-center justify-center text-med-teal font-serif font-bold shrink-0">
                {msg.from.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-tech font-bold text-sm text-ink truncate">
                    {msg.from}
                  </span>
                  <span className="text-xs text-ink/40 font-sans">
                    {msg.company}
                  </span>
                  {msg.unread && (
                    <span className="w-2 h-2 rounded-full bg-retro-orange shrink-0" />
                  )}
                </div>
                <p className="text-sm text-ink/60 font-sans truncate">
                  {msg.subject}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-tech text-ink/40">{msg.time}</span>
                <ChevronRight className="w-4 h-4 text-ink/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Profile Tab ─────────────────────────────── */
function ProfileTab() {
  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-xl text-ink">Profile Completion</h3>
            <span className="text-2xl font-serif font-bold text-retro-orange">72%</span>
          </div>
          <div className="w-full bg-med-teal/10 h-2.5 rounded-full overflow-hidden mb-6">
            <div className="w-[72%] h-full bg-gradient-to-r from-med-teal to-retro-orange rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Company Name", done: true },
              { label: "Description", done: true },
              { label: "Logo Uploaded", done: true },
              { label: "Certifications", done: false },
              { label: "Case Studies", done: false },
              { label: "Contact Details", done: true },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  item.done
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-amber-200 bg-amber-50/50"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className={`text-sm font-sans ${item.done ? "text-ink/60" : "text-ink"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl p-6">
        <h3 className="font-serif font-bold text-xl text-ink mb-6">Company Information</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { label: "Company Name", value: "Your Company" },
            { label: "Industry", value: "Medical Devices" },
            { label: "Location", value: "San Francisco, CA" },
            { label: "Website", value: "yourcompany.com" },
            { label: "Founded", value: "2018" },
            { label: "Employees", value: "25-50" },
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-xs font-tech font-bold text-med-teal uppercase tracking-wider mb-1.5">
                {field.label}
              </label>
              <div className="bg-bone/50 border border-med-teal/10 rounded-xl px-4 py-3 text-sm font-sans text-ink">
                {field.value}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 px-6 py-2.5 rounded-xl bg-med-teal text-bone font-tech font-bold text-sm hover:shadow-[0_0_20px_rgba(214,90,49,0.3)] transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ─── Settings Tab ─────────────────────────────── */
function SettingsTab() {
  return (
    <div className="space-y-6">
      {/* Subscription */}
      <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-med-teal via-retro-orange to-med-teal" />
        <div className="p-6">
          <h3 className="font-serif font-bold text-xl text-ink mb-4">Subscription</h3>
          <div className="flex items-center gap-4 p-4 bg-med-teal/5 rounded-xl border border-med-teal/10">
            <Crown className="w-8 h-8 text-retro-orange" />
            <div className="flex-1">
              <p className="font-tech font-bold text-ink">Catalyst Plan</p>
              <p className="text-xs text-ink/50 font-sans">$499/year · Renews Jan 15, 2027</p>
            </div>
            <Link
              href="/join"
              className="px-4 py-2 rounded-lg border-2 border-retro-orange text-retro-orange font-tech font-bold text-xs hover:bg-retro-orange hover:text-white transition-all"
            >
              Upgrade to Titan
            </Link>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl p-6">
        <h3 className="font-serif font-bold text-xl text-ink mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "Email me when I receive an inquiry", enabled: true },
            { label: "Weekly analytics summary", enabled: true },
            { label: "Directory updates and new features", enabled: false },
            { label: "Newsletter and industry news", enabled: true },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="text-sm font-sans text-ink">{pref.label}</span>
              <button
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  pref.enabled ? "bg-med-teal" : "bg-ink/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    pref.enabled ? "left-[18px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white/60 backdrop-blur-xl border border-red-200 rounded-2xl p-6">
        <h3 className="font-serif font-bold text-xl text-red-600 mb-4">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-sans text-ink">Log out of your account</p>
            <p className="text-xs text-ink/40 font-sans">You can sign back in anytime with your email</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 font-tech font-bold text-xs hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable Dashboard Card ─────────────────── */
function DashboardCard({
  icon,
  title,
  description,
  action,
  tier,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  tier?: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-med-teal/10 rounded-2xl p-7 hover:shadow-lg hover:border-retro-orange/20 transition-all duration-300 group">
      <div className="mb-5 group-hover:scale-110 transition-transform origin-left">
        {icon}
      </div>
      <h2 className="font-serif font-bold text-xl text-ink mb-2">{title}</h2>
      <p className="text-sm font-sans text-ink/50 mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={onClick}
          className="px-5 py-2.5 rounded-xl border-2 border-med-teal/20 text-med-teal font-tech font-bold text-xs hover:border-retro-orange hover:text-retro-orange transition-all"
        >
          {action}
        </button>
        {tier && (
          <span className="text-xs px-3 py-1 rounded-full bg-retro-orange/10 text-retro-orange border border-retro-orange/20 font-tech font-bold">
            {tier}
          </span>
        )}
        {badge && (
          <span className="text-xs px-3 py-1 rounded-full bg-med-teal/10 text-med-teal font-tech font-bold">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
