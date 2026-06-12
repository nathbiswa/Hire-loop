import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './applyJobs/page';
import { getApplicationByApplicantId } from '@/lib/api/applications';
import Link from 'next/link';
import { getPlansById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    // 🔒 Not logged in
    if (!user) {
        redirect(`/auth/login?redirect=/jobs/${id}/apply`);
    }

    // 🔒 Role restriction
    if (user?.role !== 'seeker') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center p-8 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-amber-900 mb-2">Access Restricted</h2>
                    <p className="text-amber-700 text-sm">
                        Only registered <strong>Job Seekers</strong> can apply for this position.
                    </p>
                    <div className="mt-6">
                        <Link href="/jobs" className="text-sm font-medium text-amber-900 hover:underline">
                            &larr; Back to Job Board
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 📊 Data fetching
    const applications = await getApplicationByApplicantId(user?.id);
    const job = await getJobById(id);
    const plan = await getPlansById(user?.plan || "seeker_free");

    // ✅ Correct logic
    const maxLimit = plan?.maxApplicationPerMonth || 0;
    const applicationCounts = applications?.length || 0;
    const hasReachedLimit = applicationCounts >= maxLimit;

    const usagePercentage =
        maxLimit > 0
            ? Math.min((applicationCounts / maxLimit) * 100, 100)
            : 0;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                            {plan?.name || "Free"} Plan
                        </span>

                        <h2 className="text-lg font-medium text-slate-900 mt-2">
                            Monthly Application Usage:
                            <span
                                className={`ml-2 font-bold ${hasReachedLimit ? 'text-rose-600' : 'text-emerald-600'
                                    }`}
                            >
                                {applicationCounts}
                            </span>{" "}
                            / {maxLimit} ({Math.round(usagePercentage)}%)
                        </h2>
                    </div>

                    {/* Upgrade CTA */}
                    <div className="sm:text-right">
                        <p className="text-sm text-slate-500 mb-1">
                            Need to submit more applications?
                        </p>
                        <Link
                            href="/plans"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Upgrade your Plan &rarr;
                        </Link>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-5 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${hasReachedLimit ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                        style={{ width: `${usagePercentage}%` }}
                    />
                </div>
            </div>

            {/* Apply Section */}
            {hasReachedLimit ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
                    <h3 className="text-rose-900 font-semibold mb-1">
                        Application Limit Reached
                    </h3>
                    <p className="text-rose-700 text-sm max-w-md mx-auto">
                        You have used all {maxLimit} applications for this month.
                        Upgrade your subscription to apply for this job instantly.
                    </p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                        Complete Your Application
                    </h3>
                    <JobApply applicant={user} job={job} />
                </div>
            )}
        </div>
    );
};

export default ApplyPage;