"use client";

import React, { useState, useRef } from "react";
import {
    Form,
    TextField,
    Input,
    Label,
    Select,
    ListBox,
    TextArea,
    Button,
    Badge,
    Toast
} from "@heroui/react"; // Adjusted imports based on your component snippet
import { ArrowUpToLine, Pencil, Globe, MapPin, Person, Layers, FileText } from "@gravity-ui/icons";
// import { createCompany } from "@/lib/actions/companys";
import { toast } from "react-toastify";
import { cteateCompany } from "@/lib/actions/companys";
import Image from "next/image";

export default function CompanyProfile({ recruiter, recruiterCompany }) {

    // 1. STATE MANAGEMENT
    const [company, setCompany] = useState(recruiterCompany); // Null means "No company registered yet"
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    // Controlled Select components state matches your style
    const [industry, setIndustry] = useState("");
    const [employeeCount, setEmployeeCount] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    const fileInputRef = useRef(null);

    // 2. IMGBB IMAGE UPLOAD HANDLER
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingLogo(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            // Replace with your environment variable process.env.NEXT_PUBLIC_IMGBB_API_KEY
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setLogoUrl(data.data.url);
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading logo:", error);
        } finally {
            setUploadingLogo(false);
        }
    };

    // 3. FORM SUBMISSION (CREATE/UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const companyData = {
            name: formData.get("name"),
            websiteUrl: formData.get("websiteUrl"),
            location: formData.get("location"),
            description: formData.get("description"),
            industry: formData.get("industry") || "Technology", // Default value if not selected
            employeeCount: formData.get("employeeCount") || "1-10 employees", // Default value if not selected
            logo: logoUrl,
            status: company && company.status ? company.status : "Pending", // New companies start with "Pending Approval"
            recruiterId: recruiter?.id, // Include the recruiter's ID
        };

        // console.log("Submitting Company Data:", companyData);
        // Simulated API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setCompany(companyData);

        console.log("Create the company before the data", companyData)

        const result = await cteateCompany(companyData);

        if (result?.insertedId) {
            const saveCompany = { ...company, _id: result.insertedId }
            setCompany(saveCompany),
                toast.success("Company details saved successfully!");
        } else {
            toast.error("Failed to save company details.");
        }


        setIsEditing(false);
        setLoading(false);
    };

    // Helper color maps for the Admin Status Badge
    const getBadgeColor = (status) => {
        switch (status) {
            case "Approved": return "success";
            case "Rejected": return "danger";
            default: return "warning";
        }
    };

    // --- CONDITION 1: NO COMPANY REGISTERED AND NOT IN EDIT/CREATE MODE ---
    if (!company?._id && !isEditing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full space-y-6">
                    <div className="text-zinc-400 text-5xl flex justify-center">
                        <Layers size={48} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-white">No Company Profile Found</h2>
                        <p className="text-sm text-zinc-400">
                            You need to register your company details before you can start publishing job listings on HireLoop.
                        </p>
                    </div>
                    <Button
                        className="w-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                        onClick={() => {
                            setIndustry("Technology");
                            setEmployeeCount("1-10 employees");
                            setIsEditing(true);
                        }}
                    >
                        Register Company
                    </Button>
                </div>
            </div>
        );
    }

    // --- CONDITION 2: SHOWING REGISTERED COMPANY DETAILS ---
    if (company?._id && !isEditing) {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {company.logo ? (
                            <Image
                                src={company.logo}
                                alt={company.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-lg object-cover bg-zinc-800 border border-zinc-700"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500">
                                <Layers size={24} />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                                <Badge color={getBadgeColor(company.status)} variant="flat" className="text-xs uppercase font-semibold">
                                    {company.status}
                                </Badge>
                            </div>
                            <p className="text-zinc-400 text-sm flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1"><Layers size={14} /> {company.industry}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {company.location}</span>
                            </p>
                        </div>
                    </div>
                    <Button
                        startContent={<Pencil size={16} />}
                        className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700"
                        onClick={() => {
                            setIndustry(company.industry);
                            setEmployeeCount(company.employeeCount);
                            setLogoUrl(company.logo);
                            setIsEditing(true);
                        }}
                    >
                        Edit Details
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-lg font-medium text-white flex items-center gap-2">
                            <FileText size={18} /> About Company
                        </h3>
                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {company.description || "No description provided."}
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 h-fit">
                        <h3 className="text-lg font-medium text-white">Company Meta</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-zinc-800">
                                <span className="text-zinc-400 flex items-center gap-2"><Globe size={16} /> Website</span>
                                <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate max-w-[150px]">
                                    {company.websiteUrl || "N/A"}
                                </a>
                            </div>
                            <div className="flex justify-between py-2 border-b border-zinc-800">
                                <span className="text-zinc-400 flex items-center gap-2"><Person size={16} /> Company Size</span>
                                <span className="text-white">{company.employeeCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- CONDITION 3: REGISTRATION & EDIT FORM (MATCHES THE PROVIDED IMAGE DESIGN) ---
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-black/50">
            <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            {company ? "Edit Company Details" : "Register New Company"}
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                            Enter your business details to start.
                        </p>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* ROW 1: COMPANY NAME & INDUSTRY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField isRequired name="name" defaultValue={company?.name || ""}>
                            <Label className="text-zinc-300 text-sm font-medium">Company Name</Label>
                            <Input
                                placeholder="e.g. Acme Corp"
                                className="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg mt-1.5 focus:border-zinc-500"
                            />
                        </TextField>

                        <div>
                            <Label className="text-zinc-300 text-sm font-medium">Industry / Category</Label>
                            <Select
                                selectedKey={industry}
                                onSelectionChange={setIndustry}
                                className="mt-1.5"
                            >
                                <Select.Trigger className="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg">
                                    <Select.Value placeholder="Select industry" />
                                </Select.Trigger>
                                <Select.Popover className="bg-zinc-900 border border-zinc-800 text-white">
                                    <ListBox>
                                        <ListBox.Item key="Technology" className="hover:bg-zinc-800">Technology</ListBox.Item>
                                        <ListBox.Item key="Healthcare" className="hover:bg-zinc-800">Healthcare</ListBox.Item>
                                        <ListBox.Item key="Finance" className="hover:bg-zinc-800">Finance</ListBox.Item>
                                        <ListBox.Item key="Education" className="hover:bg-zinc-800">Education</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    {/* ROW 2: WEBSITE URL & LOCATION */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField name="websiteUrl" defaultValue={company?.websiteUrl || ""}>
                            <Label className="text-zinc-300 text-sm font-medium">Website URL</Label>
                            <Input
                                placeholder="www.company.com"
                                className="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg mt-1.5"
                            />
                        </TextField>

                        <TextField name="location" defaultValue={company?.location || ""}>
                            <Label className="text-zinc-300 text-sm font-medium">Location</Label>
                            <Input
                                placeholder="City, Country"
                                className="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg mt-1.5"
                            />
                        </TextField>
                    </div>

                    {/* ROW 3: EMPLOYEE COUNT RANGE & LOGO UPLOAD */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-zinc-300 text-sm font-medium">Employee Count Range</Label>
                            <Select
                                selectedKey={employeeCount}
                                onSelectionChange={setEmployeeCount}
                                className="mt-1.5"
                            >
                                <Select.Trigger className="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg">
                                    <Select.Value placeholder="Select size" />
                                </Select.Trigger>
                                <Select.Popover className="bg-zinc-900 border border-zinc-800 text-white">
                                    <ListBox>
                                        <ListBox.Item key="1-10 employees">1-10 employees</ListBox.Item>
                                        <ListBox.Item key="11-50 employees">11-50 employees</ListBox.Item>
                                        <ListBox.Item key="51-200 employees">51-200 employees</ListBox.Item>
                                        <ListBox.Item key="201+ employees">201+ employees</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* LOGO UPLOAD FIELD CONTAINER ACCORDING TO DESIGN */}
                        <div>
                            <Label className="text-zinc-300 text-sm font-medium">Company Logo</Label>
                            <div className="mt-1.5 flex items-center gap-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleLogoUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-12 h-12 bg-zinc-800/50 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:border-zinc-500 transition-colors"
                                >
                                    <ArrowUpToLine size={16} />
                                </button>
                                <div className="text-left">
                                    <p className="text-xs font-medium text-zinc-300">
                                        {uploadingLogo ? "Uploading..." : logoUrl ? "Logo Added!" : "Upload image"}
                                    </p>
                                    <p className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: BRIEF DESCRIPTION */}
                    <TextField name="description" defaultValue={company?.description || ""}>
                        <Label className="text-zinc-300 text-sm font-medium">Brief Description</Label>
                        <TextArea
                            placeholder="Tell us about your company's mission and culture..."
                            className="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg mt-1.5 min-h-[100px]"
                        />
                    </TextField>

                    {/* FORM FOOTER ACTION BUTTONS */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                        <Button
                            type="button"
                            className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isDisabled={loading || uploadingLogo}
                            className="bg-white text-black font-medium hover:bg-zinc-200"
                        >
                            {loading ? "Saving..." : company ? "Update Details" : "Register Company"}
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}