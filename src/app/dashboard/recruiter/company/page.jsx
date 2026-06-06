import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompanies } from '@/lib/api/companies';

const CompanyPage = async () => {

    const user = await getUserSession();

    const company = await getRecruiterCompanies(user?.id);
    // console.log("User in CompanyPage:", user);   
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyPage;