import React from "react";
import { Card, Button } from "@heroui/react";
import Image from "next/image"; // Next.js এর নিজস্ব ইমেজ কম্পোনেন্ট ব্যবহার করা হয়েছে
import { ArrowRight, MapPin, Person } from "@gravity-ui/icons";

export default function JobCard({ job }) {
    // প্রোপস খালি থাকলে ক্র্যাশ প্রতিরোধ করার জন্য চেক
    if (!job) return null;

    return (
        <Card className="max-w-[400px] bg-[#121212] text-white p-5 rounded-2xl border border-neutral-800 shadow-xl">
            {/* Header: কোম্পানির লোগো এবং নাম */}
            <Card.Header className="flex gap-3 items-center pb-2">
                {job.logo && (
                    <div className="relative w-10 h-10 overflow-hidden rounded-md bg-white p-1 flex items-center justify-center border border-neutral-800">
                        <Image
                            alt={`${job.name} logo`}
                            src={job.logo}
                            width={40}
                            height={40}
                            className="object-contain"
                            unoptimized // এক্সটার্নাল ইমেজের (যেমন ibb.co) হোস্টিং এরর এড়াতে এটি দেওয়া হয়েছে
                        />
                    </div>
                )}
                <div className="flex flex-col">
                    <p className="text-xl font-bold tracking-tight">{job.name}</p>
                    <p className="text-xs text-neutral-400">{job.industry || "Technology"}</p>
                </div>
            </Card.Header>

            {/* Content/Body: ডেসক্রিপশন এবং ইনফো ব্যাজ */}
            <Card.Content className="py-3 flex flex-col gap-4">
                <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                    {job.description === "Final test"
                        ? "Showcase your commitment to diversity and inclusion by highlighting initiatives"
                        : job.description}
                </p>

                {/* ইনফো পিল ব্যাজসমূহ */}
                <div className="flex flex-wrap gap-2 items-center">
                    {/* লোকেশন ব্যাজ */}
                    {job.location && (
                        <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs text-neutral-300 border border-neutral-800">
                            <MapPin width="14" height="14" className="text-purple-400" />
                            <span>{job.location}</span>
                        </div>
                    )}

                    {/* এমপ্লয়ী কাউন্ট ব্যাজ */}
                    {job.employeeCount && (
                        <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-full text-xs text-neutral-300 border border-neutral-800">
                            <Person width="14" height="14" className="text-pink-400" />
                            <span>{job.employeeCount}</span>
                        </div>
                    )}
                </div>
            </Card.Content>

            {/* Footer: অ্যাপ্লাই নাও বাটন */}
            <Card.Footer className="pt-2">
                <Button
                    as="a"
                    href={job.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    className="text-white hover:text-neutral-300 font-semibold flex items-center gap-2 p-0 bg-transparent min-w-0"
                >
                    Apply Now <ArrowRight width="16" height="16" />
                </Button>
            </Card.Footer>
        </Card>
    );
}