"use client"

import React, { useState } from 'react';
import {
    Form,
    Button,
    TextField,
    Label,
    InputGroup,
    Card
} from '@heroui/react';

import {
    Person,
    Envelope,
    CloudArrowUpIn,
    Briefcase
} from '@gravity-ui/icons';

// আপনার অ্যাকশন ফাংশনটি ইম্পোর্ট করুন
import { submitApplications } from '@/lib/actions/applications';

const JobApply = ({ applicant, job }) => {
    const [formData, setFormData] = useState({
        fullName: applicant?.name || '',
        email: applicant?.email || '',
        experience: '',
        coverLetter: '',
        resume: null // এখানে ফাইলের নাম ও Base64 টেক্সট স্টোর হবে
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ফাইলকে Base64 টেক্সটে রূপান্তর করার হ্যান্ডেলার
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                resume: {
                    fileName: file.name,
                    fileType: file.type,
                    fileData: reader.result // সম্পূর্ণ Base64 ডাটা স্ট্রিং
                }
            }));
        };
        reader.readAsDataURL(file);
    };
    console.log({ job })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // আপনার এক্সপ্রেস ব্যাকএন্ড এবং মঙ্গোডিবি কালেকশনের কাঙ্খিত স্ট্রাকচার
        const applicationData = {
            jobId: job?._id || '',

            jobTitle: job?.title || 'Software Engineer',
            company: job?.company || 'Tech Company',
            companyName: job?.companyName,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            applicantId: applicant?.id,
            status: "applied",
            ...formData
        };


        try {
            // আপনার কাস্টম অ্যাকশন ফাংশন কল করা হলো
            const result = await submitApplications(applicationData);

            // এক্সপ্রেস থেকে response.send(result) এরinsertedId চেক করা
            if (result?.insertedId) {
                alert("Application submitted successfully!");
                handleReset();
            } else {
                alert("Failed to save application data.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Could not connect to the server!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            fullName: applicant?.name || '',
            email: applicant?.email || '',
            experience: '',
            coverLetter: '',
            resume: null
        });
    };

    return (
        <Card className="max-w-[600px] mx-auto my-10 p-6 shadow-lg bg-background border border-divider rounded-large">

            <div className="flex flex-col items-start gap-1 border-b border-divider pb-4 mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                    {job?.title || 'Software Engineer'}
                </h2>
                <div className="flex items-center gap-2 text-default-500 text-sm">
                    <Briefcase size={16} />
                    <span>{job?.company || 'Tech Company'}</span>
                    <span>•</span>
                    <span>{job?.location || 'Remote'}</span>
                </div>
            </div>

            <Form onSubmit={handleSubmit} onReset={handleReset} className="flex flex-col gap-6 w-full">

                {/* Full Name */}
                <TextField className="w-full">
                    <Label htmlFor="fullName">Full Name</Label>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <Person size={16} className="text-default-400" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </InputGroup>
                </TextField>

                {/* Email Address */}
                <TextField className="w-full">
                    <Label htmlFor="email">Email Address</Label>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <Envelope size={16} className="text-default-400" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                    </InputGroup>
                </TextField>

                {/* Experience Level */}
                <TextField className="w-full">
                    <Label htmlFor="experience">Experience Level</Label>
                    <InputGroup>
                        <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            className="w-full h-full bg-transparent outline-none px-3 py-2 text-sm text-foreground cursor-pointer"
                        >
                            <option value="" disabled className="text-default-400">Select your experience</option>
                            <option value="entry" className="text-foreground bg-background">Entry Level (0-1 years)</option>
                            <option value="mid" className="text-foreground bg-background">Mid Level (2-4 years)</option>
                            <option value="senior" className="text-foreground bg-background">Senior Level (5+ years)</option>
                        </select>
                    </InputGroup>
                </TextField>

                {/* Cover Letter */}
                <TextField className="w-full">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <InputGroup>
                        <InputGroup.TextArea
                            id="coverLetter"
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleChange}
                            placeholder="Write why you are a good fit..."
                            rows={4}
                        />
                    </InputGroup>
                </TextField>

                {/* File Upload */}
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-medium text-foreground">Upload CV/Resume</span>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-default-300 hover:border-primary rounded-xl p-6 cursor-pointer bg-default-50 transition-colors">
                        <CloudArrowUpIn size={28} className="text-default-500 mb-2" />
                        <span className="text-sm text-default-600 font-medium">
                            {formData.resume ? formData.resume.fileName : 'Click to upload PDF or DOCX'}
                        </span>
                        <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                        />
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-2 w-full">
                    <Button
                        type="reset"
                        variant="flat"
                        color="danger"
                        className="flex-1 font-semibold"
                        disabled={isSubmitting}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        className="flex-1 font-semibold"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Apply Now'}
                    </Button>
                </div>

            </Form>
        </Card>
    );
};

export default JobApply;