import React from 'react';
import { getCompanies } from '@/lib/api/companies';
import CompanyTable from '@/components/dashboard/CompanyTable';

const AdminCompaniesPage = async () => {
    const companies = await getCompanies();

    return (
        <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-white">
                        Review Companies
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Manage pending registrations and access rights for {companies.length} entries.
                    </p>
                </div>

                {/* Render the clean UI custom table */}
                <CompanyTable initialCompanies={companies} />
            </div>
        </div>
    );
};

export default AdminCompaniesPage;