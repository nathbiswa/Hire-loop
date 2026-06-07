import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import { Card, Button } from "@heroui/react";
import { ArrowLeft, MapPin, Briefcase, Calendar, MoneyCurrency } from "@gravity-ui/icons";
import Link from 'next/link';

const JobDetailsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);
    console.log("Fetched job details:", job);

    // ডাটা না পাওয়া গেলে সেফটি মেসেজ
    if (!job) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <p className="text-neutral-500 mb-4">Job details not found.</p>
                <Link href="/jobs" className="text-purple-400 hover:underline flex items-center gap-2">
                    <ArrowLeft width="16" height="16" /> Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 flex justify-center items-start">
            <div className="w-full max-w-3xl flex flex-col gap-6">

                {/* ব্যাক বাটন */}
                <Link href="/jobs" className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm self-start transition-colors">
                    <ArrowLeft width="16" height="16" /> Back to All Jobs
                </Link>

                {/* মেইন জব ডিটেইলস কার্ড */}
                <Card className="w-full bg-[#121212] text-white p-6 md:p-8 rounded-2xl border border-neutral-800 shadow-2xl">

                    {/* হেডার: জবের টাইটেল ও টাইপ */}
                    <Card.Header className="flex flex-col items-start gap-2 pb-6 border-b border-neutral-800 shrink-0">
                        <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                            {job.isRemote ? "Remote" : "On-site"}
                        </span>
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mt-2">{job.title}</h1>
                    </Card.Header>

                    {/* মেটা ইনফরমেশন গ্রিড (লোকেশন, স্যালারি, ডেডলাইন) */}
                    <Card.Content className="py-6 flex flex-col gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">

                            <div className="flex items-center gap-3 text-neutral-300 text-sm">
                                <MapPin width="18" height="18" className="text-purple-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-neutral-500">Location</p>
                                    <p className="font-medium">{job.location || "Not Specified"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-neutral-300 text-sm">
                                <Briefcase width="18" height="18" className="text-pink-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-neutral-500">Salary Range</p>
                                    <p className="font-medium">
                                        {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} BDT
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-neutral-300 text-sm sm:col-span-2">
                                <Calendar width="18" height="18" className="text-amber-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-neutral-500">Application Deadline</p>
                                    <p className="font-medium">{job.deadline || "Open until filled"}</p>
                                </div>
                            </div>

                        </div>

                        {/* রেসপন্সিবিলিটি সেকশন */}
                        {job.responsibilities && (
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Key Responsibilities</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed bg-[#161616] p-4 rounded-xl border border-neutral-800/60">
                                    {job.responsibilities}
                                </p>
                            </div>
                        )}

                        {/* রিকোয়ারমেন্টস সেকশন */}
                        {job.requirements && (
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Requirements</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed bg-[#161616] p-4 rounded-xl border border-neutral-800/60">
                                    {job.requirements}
                                </p>
                            </div>
                        )}
                    </Card.Content>

                    {/* ফুটার অ্যাকশন: ফাইনাল সাবমিশন বা ইমেইল বাটন */}
                    <Card.Footer className="pt-2 border-t border-neutral-800/60 shrink-0">
                        <Link href={`/jobs/${id}/apply`}
                            className="w-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors rounded-xl py-2 px-2 text-base shadow-lg"
                        >
                            Proceed to Apply
                        </Link>
                    </Card.Footer>

                </Card>
            </div>
        </div>
    );
};

export default JobDetailsPage;