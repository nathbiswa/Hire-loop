import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoginRecruiterCompany } from '@/lib/api/companies';


const PostJobPage = async () => {

    const company = await getLoginRecruiterCompany();
    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobPage;