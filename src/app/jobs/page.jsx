import JobContainer from "@/components/jobs/JobContainer";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
    // API থেকে ডাইনামিক ডাটা ফেচ করা হচ্ছে (সার্ভার সাইডেই থাকবে)
    const jobs = await getJobs();

    return (
        <div className="max-w-7xl mx-auto p-8 bg-black min-h-screen text-white">
            {/* হেডার সেকশন */}
            <div className="max-w-6xl mx-auto mb-8">
                <h2 className="text-2xl font-bold tracking-tight">
                    All Available Jobs ({jobs?.length || 0})
                </h2>
                <p className="text-neutral-400 text-sm mt-1">Explore current openings</p>
            </div>

            {/* ফিল্টার এবং গ্রিড কন্টেইনার কম্পোনেন্ট ইনসার্ট করা হলো */}
            <JobContainer initialJobs={jobs || []} />
        </div>
    );
}