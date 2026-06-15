"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    Button,
    Select,
    ListBox,
    Switch
} from "@heroui/react";

import { toast } from "react-toastify";
import { createJob } from "@/lib/actions/jobs";

export default function PostJobForm({ company }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // STATES
    const [category, setCategory] = useState("");
    const [jobType, setJobType] = useState("");
    const [currency, setCurrency] = useState("");
    const [isRemote, setIsRemote] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);

            const payload = {
                ...data,
                category,
                jobType,
                currency,
                isRemote,
                isPubliclyVisible: true,
                status: "active",
                companyId: company._id,
                companyName: company.name,
                companyLogo: company.logo,
                createdAt: new Date()
            };

            console.log("Payload:", payload);

            const res = await createJob(payload);

            if (res?.insertedId) {
                toast.success("Job posted successfully!");
                e.target.reset();

                // reset state
                setCategory("");
                setJobType("");
                setCurrency("");
                setIsRemote(false);

                router.push("/dashboard/recruiter/jobs");
            } else {
                toast.error("Failed to post job");
            }

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">

            <div className="w-full max-w-[720px] bg-[#121212] border border-[#262626] rounded-xl">

                {/* HEADER */}
                <div className="p-8 bg-[#0a0a0a] border-b border-[#1f1f1f]">
                    <div className="flex flex-col gap-2">
                        {/* Breadcrumb or Small Label */}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Recruitment Portal
                        </span>

                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-medium tracking-tight text-white">
                                Post a Job
                            </h1>

                            {/* Decorative Action (Optional) */}
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#161616] border border-[#262626] rounded-md text-gray-300">
                                <span className="text-gray-500 font-medium">Company:</span>
                                <span className="font-semibold text-white">{company.name}</span>
                            </div>

                            <span className="px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                                {company.status}
                            </span>
                        </div>
                    </div>
                </div>

                {company.status !== 'approved' && (
                    <div className="mt-4 flex items-center gap-3 rounded-lg border border-amber-500/10 bg-amber-500/5 p-4 text-sm text-amber-200/80 backend-blur-md">
                        {/* Minimal Warning Icon */}
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-amber-400">Account Pending Approval</span>
                            <p className="text-xs text-amber-500/70">
                                Your job post will go live as soon as our team reviews your company details.
                            </p>
                        </div>
                    </div>
                )}

                {company.status === 'approved' && <Form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* TITLE */}
                    <TextField isRequired name="title">
                        <Label>Job Title</Label>
                        <Input placeholder="e.g. Frontend Developer" />
                    </TextField>

                    {/* CATEGORY + JOB TYPE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* CATEGORY */}
                        <div>
                            <Label>Job Category</Label>

                            <Select
                                selectedKeys={category ? new Set([category]) : new Set()}
                                onSelectionChange={(keys) => setCategory([...keys][0])}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Select category" />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item key="Frontend">Frontend</ListBox.Item>
                                        <ListBox.Item key="Backend">Backend</ListBox.Item>
                                        <ListBox.Item key="Fullstack">Fullstack</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* hidden input */}
                            <input type="hidden" name="category" value={category} />
                        </div>

                        {/* JOB TYPE */}
                        <div>
                            <Label>Job Type</Label>

                            <Select
                                selectedKeys={jobType ? new Set([jobType]) : new Set()}
                                onSelectionChange={(keys) => setJobType([...keys][0])}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Select job type" />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item key="Full-time">Full-time</ListBox.Item>
                                        <ListBox.Item key="Part-time">Part-time</ListBox.Item>
                                        <ListBox.Item key="Contract">Contract</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <input type="hidden" name="jobType" value={jobType} />
                        </div>
                    </div>

                    {/* SALARY + CURRENCY */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <TextField name="salaryMin">
                            <Label>Min Salary</Label>
                            <Input type="number" />
                        </TextField>

                        <TextField name="salaryMax">
                            <Label>Max Salary</Label>
                            <Input type="number" />
                        </TextField>

                        {/* CURRENCY */}
                        <div>
                            <Label>Currency</Label>

                            <Select
                                selectedKeys={currency ? new Set([currency]) : new Set()}
                                onSelectionChange={(keys) => setCurrency([...keys][0])}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Select currency" />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item key="USD">USD</ListBox.Item>
                                        <ListBox.Item key="BDT">BDT</ListBox.Item>
                                        <ListBox.Item key="EUR">EUR</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <input type="hidden" name="currency" value={currency} />
                        </div>

                    </div>

                    {/* LOCATION + REMOTE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <TextField name="location">
                            <Label>Location</Label>
                            <Input placeholder="Dhaka / Remote" />
                        </TextField>

                        <div className="flex items-center gap-3">
                            <Switch
                                isSelected={isRemote}
                                onValueChange={setIsRemote}
                            >
                                Remote Job
                            </Switch>
                        </div>

                    </div>

                    {/* DEADLINE */}
                    <TextField name="deadline">
                        <Label>Application Deadline</Label>
                        <Input type="date" />
                    </TextField>

                    {/* RESPONSIBILITIES */}
                    <TextField name="responsibilities">
                        <Label>Responsibilities</Label>
                        <TextArea placeholder="Job responsibilities..." />
                    </TextField>

                    {/* REQUIREMENTS */}
                    <TextField name="requirements">
                        <Label>Requirements</Label>
                        <TextArea placeholder="Job requirements..." />
                    </TextField>

                    {/* BUTTON */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" onClick={() => router.back()}>
                            Cancel
                        </Button>

                        <Button type="submit" isDisabled={loading}>
                            {loading ? "Posting..." : "Post Job"}
                        </Button>
                    </div>

                </Form>}
            </div>
        </div>
    );
}