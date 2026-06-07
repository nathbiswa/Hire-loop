"use client";

import React, { useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Magnifier, MapPin, Briefcase } from "@gravity-ui/icons";

export default function JobContainer({ initialJobs }) {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("all");
    const [jobType, setJobType] = useState("all");

    // ইউনিক লোকেশন লিস্ট তৈরি ড্রপডাউনের জন্য
    const locations = ["all", ...new Set(initialJobs?.map(job => job.location).filter(Boolean))];

    // রিয়েল-টাইম ফিল্টারিং লজিক (নতুন এবং আগের দুই ডাটা স্ট্রাকচারই সাপোর্ট করবে)
    const filteredJobs = initialJobs?.filter((job) => {
        // ১. টাইটেল, নাম বা রেসপন্সিবিলিটি দিয়ে সার্চ
        const matchesSearch =
            job.title?.toLowerCase().includes(search.toLowerCase()) ||
            job.name?.toLowerCase().includes(search.toLowerCase()) ||
            job.responsibilities?.toLowerCase().includes(search.toLowerCase());

        // ২. লোকেশন ফিল্টার
        const matchesLocation = location === "all" || job.location === location;

        // ৩. রিমোট/অনসাইট ফিল্টার
        let matchesType = true;
        if (jobType === "remote") matchesType = job.isRemote === true;
        if (jobType === "onsite") matchesType = job.isRemote === false;

        return matchesSearch && matchesLocation && matchesType;
    }) || [];

    return (
        <>
            {/* সার্চ এবং ফিল্টার ইনপুট গ্রুপ */}
            <div className="max-w-6xl mx-auto bg-[#121212] border border-neutral-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center mb-8">

                {/* সার্চ বক্স */}
                <div className="relative w-full md:flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500">
                        <Magnifier width="18" height="18" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by job title, company or requirements..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                </div>

                {/* লোকেশন ফিল্টার */}
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

                {/* জব টাইপ ফিল্টার */}
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

            {/* ৩ কলামের রেসপন্সিভ গ্রিড লেআউট */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job._id?.$oid || job._id}>
                            <JobCard job={job} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-neutral-500">
                        No jobs match your search criteria.
                    </div>
                )}
            </div>
        </>
    );
}