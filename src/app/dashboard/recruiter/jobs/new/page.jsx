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
    FieldError,
    Switch
} from "@heroui/react";

import { toast } from "react-toastify";
import { createJob } from "@/lib/actions/jobs";

export default function PostJobPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [jobCategory, setJobCategory] = useState("");
    const [jobType, setJobType] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [isRemote, setIsRemote] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);

            const payload = {
                title: data.title,
                category: jobCategory,
                jobType,
                salaryMin: data.salaryMin,
                salaryMax: data.salaryMax,
                currency,
                location: isRemote ? "Remote" : data.location,
                isRemote,
                deadline: data.deadline,
                responsibilities: data.responsibilities,
                requirements: data.requirements,
                status: "active",
                companyId: "company_123",
            };

            const res = await createJob(payload);

            if (res?.insertedId) {
                toast.success("Job posted successfully!");

                e.target.reset();
                setJobCategory("");
                setJobType("");
                setCurrency("USD");
                setIsRemote(false);

                router.push("/dashboard/recruiter");
            } else {
                toast.error("Failed to post job");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">

            <div className="w-full max-w-[720px] bg-[#121212] border border-[#262626] rounded-xl shadow-2xl text-[#ededed]">

                {/* Header */}
                <div className="flex justify-between items-start p-6 pb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Post a Job
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Fill job details to hire candidates
                        </p>
                    </div>

                    <button
                        aria-label="Close form"
                        onClick={() => router.back()}
                    >
                        ✕
                    </button>
                </div>

                <hr className="border-[#262626]" />

                <Form onSubmit={handleSubmit} className="flex flex-col">

                    <div className="p-6 space-y-5">

                        {/* Job Title */}
                        <TextField isRequired name="title">
                            <Label>Job Title</Label>
                            <Input placeholder="e.g. Frontend Developer" />
                        </TextField>

                        {/* Category + Job Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <Label>Job Category</Label>
                                <Select
                                    isRequired
                                    selectedKey={jobCategory}
                                    onSelectionChange={setJobCategory}
                                    aria-label="Job category select"
                                >
                                    <Select.Trigger>
                                        <Select.Value placeholder="Select category" />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item key="Development">💻 Development</ListBox.Item>
                                            <ListBox.Item key="Design">🎨 Design</ListBox.Item>
                                            <ListBox.Item key="Marketing">📢 Marketing</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <div>
                                <Label>Job Type</Label>
                                <Select
                                    isRequired
                                    selectedKey={jobType}
                                    onSelectionChange={setJobType}
                                    aria-label="Job type select"
                                >
                                    <Select.Trigger>
                                        <Select.Value placeholder="Select type" />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item key="Full-time">🕒 Full-time</ListBox.Item>
                                            <ListBox.Item key="Part-time">⏳ Part-time</ListBox.Item>
                                            <ListBox.Item key="Contract">📄 Contract</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                        </div>

                        {/* Salary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            <TextField name="salaryMin">
                                <Label>Min Salary</Label>
                                <Input type="number" />
                            </TextField>

                            <TextField name="salaryMax">
                                <Label>Max Salary</Label>
                                <Input type="number" />
                            </TextField>

                            <div>
                                <Label>Currency</Label>
                                <Select
                                    selectedKey={currency}
                                    onSelectionChange={setCurrency}
                                    aria-label="Currency select"
                                >
                                    <Select.Trigger>
                                        <Select.Value />
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item key="USD">USD</ListBox.Item>
                                            <ListBox.Item key="BDT">BDT</ListBox.Item>
                                            <ListBox.Item key="EUR">EUR</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                        </div>

                        {/* Location + Remote Toggle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">

                            <TextField name="location" isDisabled={isRemote}>
                                <Label>Location</Label>
                                <Input placeholder="City" />
                            </TextField>

                            {/* ✅ FIXED ACCESSIBILITY WARNING */}
                            <div className="flex items-center justify-between border border-[#262626] rounded-lg px-4 py-3 mt-6">

                                <div>
                                    <p className="text-sm font-medium">Remote Job</p>
                                    <p className="text-xs text-gray-400">
                                        Enable if this job is remote
                                    </p>
                                </div>

                                <Switch
                                    isSelected={isRemote}
                                    onValueChange={setIsRemote}
                                    aria-label="Remote job toggle"
                                />
                            </div>

                        </div>

                        {/* Deadline */}
                        <TextField name="deadline">
                            <Label>Application Deadline</Label>
                            <Input type="date" />
                        </TextField>

                        {/* Responsibilities */}
                        <div>
                            <Label>Responsibilities</Label>
                            <TextArea
                                name="responsibilities"
                                placeholder="Write job responsibilities..."
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <Label>Requirements</Label>
                            <TextArea
                                name="requirements"
                                placeholder="Write job requirements..."
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="p-4 flex justify-end gap-3">

                        <Button type="button" onClick={() => router.back()}>
                            Cancel
                        </Button>

                        <Button type="submit" isDisabled={loading}>
                            {loading ? "Posting..." : "Post Job"}
                        </Button>

                    </div>

                </Form>
            </div>
        </div>
    );
}