'use client';

import React, { useState } from 'react';
import { Table, Button } from '@heroui/react';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { updateCompany } from '@/lib/actions/companys';
import Image from 'next/image';

export default function CompanyTable({ initialCompanies }) {

    // ✅ Use local state instead of props directly
    const [companies, setCompanies] = useState(initialCompanies);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ✅ APPROVE
    const handleApprove = async (id) => {
        const result = await updateCompany(id, { status: "Approved" });

        if (result?.modifiedCount) {
            setCompanies(prev =>
                prev.map(c =>
                    (c._id === id || c._id?.$oid === id)
                        ? { ...c, status: "Approved" }
                        : c
                )
            );
        }
    };

    // ✅ REJECT (fixed typo: status)
    const handleReject = async (id) => {
        const result = await updateCompany(id, { status: "Rejected" });

        if (result?.modifiedCount) {
            setCompanies(prev =>
                prev.map(c =>
                    (c._id === id || c._id?.$oid === id)
                        ? { ...c, status: "Rejected" }
                        : c
                )
            );
        }
    };

    // ✅ STATUS UI FIXED
    const renderStatus = (status) => {
        const normalized = status?.toLowerCase();

        if (normalized === 'pending') {
            return (
                <span className="flex items-center gap-2 text-sm text-amber-500 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Pending
                </span>
            );
        }

        if (normalized === 'approved') {
            return (
                <span className="flex items-center gap-2 text-sm text-emerald-500 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Approved
                </span>
            );
        }

        if (normalized === 'rejected') {
            return (
                <span className="flex items-center gap-2 text-sm text-rose-500 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Rejected
                </span>
            );
        }

        return null;
    };

    const getInitials = (name) => {
        if (!name) return 'CO';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="w-full bg-[#121212] rounded-xl border border-[#1f1f1f] p-6 text-[#a3a3a3]">
            <Table className="w-full border-collapse">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company review matrix">

                        {/* HEADER */}
                        <Table.Header>
                            <Table.Column isRowHeader className="py-4 px-4 text-xs text-[#737373] border-b">
                                Company Name
                            </Table.Column>
                            <Table.Column className="py-4 px-4 text-xs text-[#737373] border-b">
                                Recruiter ID
                            </Table.Column>
                            <Table.Column className="py-4 px-4 text-xs text-[#737373] border-b">
                                Industry
                            </Table.Column>
                            <Table.Column className="py-4 px-4 text-xs text-[#737373] border-b">
                                Jobs Counts
                            </Table.Column>
                            <Table.Column className="py-4 px-4 text-xs text-[#737373] border-b">
                                Status
                            </Table.Column>
                            <Table.Column className="py-4 px-4 text-xs text-[#737373] border-b">
                                Location
                            </Table.Column>
                            <Table.Column className="py-4 px-4 text-xs text-right text-[#737373] border-b">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* BODY */}
                        <Table.Body>
                            {companies.map((company) => {
                                const id = company._id?.$oid || company._id;
                                const statusLower = company.status?.toLowerCase();

                                return (
                                    <Table.Row key={id} className="hover:bg-[#161616]/50">

                                        {/* NAME */}
                                        <Table.Cell className="py-5 px-4 border-b">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 flex items-center justify-center rounded-md bg-[#262626] text-white text-xs">
                                                    {company.logo ? (
                                                        <Image src={company.logo} alt="" width={300} height={300} className="h-full w-full object-contain" />
                                                    ) : getInitials(company.name)}
                                                </div>
                                                <span className="text-white text-sm">{company.name}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* ID */}
                                        <Table.Cell className="py-5 px-4 border-b text-xs text-neutral-400">
                                            {company.recruiterId?.slice(-8) || "N/A"}
                                        </Table.Cell>

                                        {/* INDUSTRY */}
                                        <Table.Cell className="py-5 px-4 border-b">
                                            {company.industry}
                                        </Table.Cell>

                                        {/* JOB COUNT */}
                                        <Table.Cell className="py-5 px-4 border-b">
                                            {company.jobsCount}
                                        </Table.Cell>

                                        {/* STATUS */}
                                        <Table.Cell className="py-5 px-4 border-b">
                                            {renderStatus(company.status)}
                                        </Table.Cell>

                                        {/* LOCATION */}
                                        <Table.Cell className="py-5 px-4 border-b">
                                            {company.location || "Remote"}
                                        </Table.Cell>

                                        {/* ACTIONS */}
                                        <Table.Cell className="py-5 px-4 border-b text-right">
                                            <div className="flex justify-end gap-2">

                                                {(statusLower === 'pending' || statusLower === 'rejected') && (
                                                    <Button onClick={() => handleApprove(id)}>
                                                        Approve
                                                    </Button>
                                                )}

                                                {(statusLower === 'pending' || statusLower === 'approved') && (
                                                    <Button onClick={() => handleReject(id)}>
                                                        Reject
                                                    </Button>
                                                )}

                                            </div>
                                        </Table.Cell>

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                {/* FOOTER */}
                <Table.Footer>
                    <div className="flex justify-between pt-6 text-xs text-neutral-500">
                        <div>
                            Showing {companies.length} companies
                        </div>

                        <div className="flex gap-2">
                            <ChevronLeft />
                            <ChevronRight />
                        </div>
                    </div>
                </Table.Footer>

            </Table>
        </div>
    );
}