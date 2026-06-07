import React, { useState, useEffect } from "react";
import { MagnifyingGlass, MapPin, Briefcase } from "@gravity-ui/icons";

export default function JobFilter({ allJobs, onFilterChange }) {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("all");
    const [jobType, setJobType] = useState("all");

    // ইউনিক লোকেশন লিস্ট তৈরি (ড্রপডাউনের জন্য)
    const locations = ["all", ...new Set(allJobs?.map(job => job.location).filter(Boolean))];

    useEffect(() => {
        if (!allJobs) return;

        const filtered = allJobs.filter((job) => {
            // ১. টাইটেল বা রেসপন্সিবিলিটি দিয়ে সার্চ ম্যাচিং
            const matchesSearch =
                job.title?.toLowerCase().includes(search.toLowerCase()) ||
                job.responsibilities?.toLowerCase().includes(search.toLowerCase());

            // ২. লোকেশন ম্যাচিং
            const matchesLocation = location === "all" || job.location === location;

            // ৩. রিমোট/অনসাইট ফিল্টার (isRemote ফিল্ড দিয়ে)
            let matchesType = true;
            if (jobType === "remote") matchesType = job.isRemote === true;
            if (jobType === "onsite") matchesType = job.isRemote === false;

            return matchesSearch && matchesLocation && matchesType;
        });

        // প্যারেন্ট কম্পোনেন্টে ফিল্টার করা ডাটা পাঠিয়ে দেওয়া
        onFilterChange(filtered);
    }, [search, location, jobType, allJobs]);

    return (
        <div className="w-full bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center mb-8">

            {/* সার্চ ইনপুট বক্স */}
            <div className="relative w-full md:flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500">
                    <MagnifyingGlass width="18" height="18" />
                </span>
                <input
                    type="text"
                    placeholder="Search by title or responsibility..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
            </div>

            {/* লোকেশন ফিল্টার ড্রপডাউন */}
            <div className="relative w-full md:w-48">
                <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 pointer-events-none">
                    <MapPin width="16" height="16" />
                </span>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
                >
                    <option value="all">All Locations</option>
                    {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* জব টাইপ (Remote / Onsite) ফিল্টার */}
            <div className="relative w-full md:w-48">
                <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 pointer-events-none">
                    <Briefcase width="16" height="16" />
                </span>
                <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
                >
                    <option value="all">All Types</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                </select>
            </div>

        </div>
    );
}