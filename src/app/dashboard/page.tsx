"use client";

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
} from "lucide-react";

// Placeholder dashboard — will be populated with real data once auth is wired
const mockStats = {
  profileViews: 847,
  contactRequests: 23,
  searchAppearances: 2_341,
  directoryRank: 12,
};

export default function DashboardPage() {
  return (
    <main className="container py-12 z-10 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-[var(--text-muted)]">
            Manage your company profile and analytics
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link
            href="/directory"
            className="px-4 py-2 text-sm rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Public Profile
          </Link>
          <Link
            href="/join"
            className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Upgrade Plan
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-xs text-green-400 font-mono">+12%</span>
          </div>
          <div className="text-2xl font-bold font-mono">
            {mockStats.profileViews.toLocaleString()}
          </div>
          <div className="text-sm text-[var(--text-muted)]">Profile Views</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-xs text-green-400 font-mono">+5</span>
          </div>
          <div className="text-2xl font-bold font-mono">
            {mockStats.contactRequests}
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            Contact Requests
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-xs text-green-400 font-mono">+18%</span>
          </div>
          <div className="text-2xl font-bold font-mono">
            {mockStats.searchAppearances.toLocaleString()}
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            Search Appearances
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <div className="text-2xl font-bold font-mono">
            #{mockStats.directoryRank}
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            Directory Rank
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-8">
          <Building2 className="w-8 h-8 text-[var(--primary)] mb-4" />
          <h2 className="text-xl font-bold mb-2">Company Profile</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Update your company description, capabilities, certifications, and
            contact information.
          </p>
          <button className="px-6 py-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] text-sm transition-colors">
            Edit Profile
          </button>
        </div>

        <div className="glass-card rounded-xl p-8">
          <Settings className="w-8 h-8 text-[var(--primary)] mb-4" />
          <h2 className="text-xl font-bold mb-2">Account Settings</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Manage your subscription plan, billing information, and notification
            preferences.
          </p>
          <button className="px-6 py-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] text-sm transition-colors">
            Manage Settings
          </button>
        </div>

        <div className="glass-card rounded-xl p-8">
          <MessageSquare className="w-8 h-8 text-[var(--primary)] mb-4" />
          <h2 className="text-xl font-bold mb-2">Inquiries</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            View and respond to contact requests from engineers and procurement
            teams.
          </p>
          <button className="px-6 py-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] text-sm transition-colors">
            View Inquiries
          </button>
        </div>

        <div className="glass-card rounded-xl p-8">
          <BarChart3 className="w-8 h-8 text-[var(--primary)] mb-4" />
          <h2 className="text-xl font-bold mb-2">Analytics</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Deep-dive into profile views, search impressions, and engagement
            metrics over time.
          </p>
          <div className="flex items-center gap-2">
            <button className="px-6 py-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] text-sm transition-colors">
              View Analytics
            </button>
            <span className="text-xs px-2 py-1 rounded bg-[rgba(6,182,212,0.1)] text-[var(--primary)] border border-[var(--primary-glow)]">
              Catalyst+
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
