import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";
const sampleData = {
    _id: { $oid: "6a24757f2ec7a5cbbc40b4a0" },
    name: "IT Solving Care",
    websiteUrl: "https://my-portfolio-xi-ebon-91fr1lx26d.vercel.app",
    location: "Khulna",
    description: "Final test",
    industry: "Technology",
    employeeCount: "1-10 employees",
    logo: "https://i.ibb.co/7t14Skmg/Microsoft-logo-svg.png",
    status: "Pending",
    recruiterId: "6a2463ae346fbcdfcf88dc5e",
    createdAt: { $date: "2026-06-06T19:31:11.350Z" }
};

export default async function Page() {
    const jobs = await getJobs();


    return (
        <div className="p-8 bg-black min-h-screen flex justify-center items-center">
            <h2>Jobs ({jobs.length})</h2>
            <JobCard job={jobs[1]} />
        </div>
    );
}