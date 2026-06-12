import React from 'react';
import Link from 'next/link';
import { getApplicationByApplicantId } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
// Gravity UI Icons ইম্পোর্ট (Hash পরিবর্তন করে Hashtag করা হয়েছে)
import { Code, Hashtag, Database, Cloud, Terminal } from '@gravity-ui/icons';

// জব টাইটেল অনুযায়ী আইকন সিলেক্ট করার হেল্পার ফাংশন
const getJobIcon = (title) => {
    const lowerTitle = title ? title.toLowerCase() : '';
    if (lowerTitle.includes('frontend') || lowerTitle.includes('software') || lowerTitle.includes('engineer')) {
        return <Code className="w-5 h-5 text-gray-400" />;
    }
    if (lowerTitle.includes('design') || lowerTitle.includes('ui') || lowerTitle.includes('ux')) {
        return <Hashtag className="w-5 h-5 text-gray-400" />;
    }
    if (lowerTitle.includes('data') || lowerTitle.includes('scientist') || lowerTitle.includes('analytics')) {
        return <Database className="w-5 h-5 text-gray-400" />;
    }
    if (lowerTitle.includes('cloud') || lowerTitle.includes('architect') || lowerTitle.includes('devops')) {
        return <Cloud className="w-5 h-5 text-gray-400" />;
    }
    return <Terminal className="w-5 h-5 text-gray-400" />;
};

// ডাটাবেজের `createdAt` থেকে রিলেটিভ টাইম (যেমন: '2 hours ago') বের করার ফাংশন
const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recent';
    const now = new Date();
    const appliedDate = new Date(dateString);
    const diffInMs = now - appliedDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
};

// স্ট্যাটাস অনুযায়ী ডার্ক মোড বর্ডার ও টেক্সট কালার দেওয়ার ফাংশন
const getStatusStyle = (status) => {
    const currentStatus = status ? status.toLowerCase() : 'applied';
    switch (currentStatus) {
        case 'applied':
            return 'border-zinc-500 text-zinc-300 bg-zinc-800/20';
        case 'review':
            return 'border-amber-600 text-amber-500 bg-amber-950/10';
        case 'shortlisted':
            return 'border-emerald-600 text-emerald-500 bg-emerald-950/10';
        case 'rejected':
            return 'border-red-600 text-red-500 bg-red-950/10';
        case 'offered':
            return 'border-indigo-400 text-indigo-300 bg-indigo-950/10';
        default:
            return 'border-zinc-500 text-zinc-300 bg-zinc-800/20';
    }
};

const AplicationPage = async () => {
    // সার্ভার সাইড সেশন এবং ডাটা ফেচিং
    const user = await getUserSession();
    const jobData = await getApplicationByApplicantId(user.id);

    // API থেকে সিঙ্গেল অবজেক্ট বা অ্যারে যাই আসুক, সেটিকে সেফলি অ্যারেতে কনভার্ট করা
    const appList = Array.isArray(jobData) ? jobData : jobData ? [jobData] : [];

    return (
        <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100">
            <div className="max-w-6xl mx-auto">

                {/* হেডার সেকশন */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-200">
                        Applications ({appList.length})
                    </h2>
                </div>

                {/* যদি কোনো অ্যাপ্লিকেশন না থাকে তার জন্য সেফটি চেক */}
                {appList.length === 0 ? (
                    <div className="text-center py-12 rounded-xl border border-zinc-800 bg-zinc-900/20 text-zinc-500">
                        No applications found.
                    </div>
                ) : (
                    /* ডার্ক টেবিল কন্টেইনার */
                    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Job Title</th>
                                    <th className="py-4 px-6">Company</th>
                                    <th className="py-4 px-6">Applied</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/60 text-sm">
                                {appList.map((app, index) => (
                                    <tr key={app.jobId || index} className="hover:bg-zinc-900/30 transition-colors group">

                                        {/* জব টাইটেল এবং এক্সপেরিয়েন্স কলাম */}
                                        <td className="py-4 px-6 flex items-center gap-4">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 shadow-sm flex-shrink-0">
                                                {getJobIcon(app.jobTitle)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-200 group-hover:text-white transition-colors">
                                                    {app.jobTitle || "Software Engineer"}
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-0.5 capitalize">
                                                    {app.experience || "mid"}-time • Remote
                                                </div>
                                            </div>
                                        </td>

                                        {/* কোম্পানি কলাম */}
                                        <td className="py-4 px-6 text-zinc-400 font-medium">
                                            {app.company || "Tech Company"}
                                        </td>

                                        {/* অ্যাপ্লাই করার সময় */}
                                        <td className="py-4 px-6 text-zinc-400">
                                            {formatTimeAgo(app.createdAt)}
                                        </td>

                                        {/* ডাইনামিক স্ট্যাটাস ব্যাজ */}
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(app.status)} capitalize`}>
                                                {app.status || "Applied"}
                                            </span>
                                        </td>

                                        {/* অ্যাকশন বাটন */}
                                        <td className="py-4 px-6 text-right">
                                            <Link
                                                href={`/dashboard/seeker/applications/${app.jobId || ''}`}
                                                className="text-zinc-300 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 px-3 py-1.5 rounded-md transition inline-block"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AplicationPage;