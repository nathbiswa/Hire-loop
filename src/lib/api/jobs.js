import { serverFetch } from "../core/sever";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {

    const res = await fetch(`${API_BASE_URL}/api/jobs?companyId=${companyId}&status=${status}`);

    return res.json();
}


export const getJobs = async () => {
    return serverFetch("/api/jobs");
}