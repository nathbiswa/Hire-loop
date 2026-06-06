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
                <div className="p-6 border-b border-[#262626]">
                    <h1 className="text-white text-xl font-semibold">
                        Post a Job
                    </h1>
                </div>

                <Form onSubmit={handleSubmit} className="p-6 space-y-6">

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

                </Form>
            </div>
        </div>
    );
}