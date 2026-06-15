import { getUserSession } from "../core/session";
import { protectedFetch, serverFetch } from "../core/sever";

export const getRecruiterCompanies = async (recruiterId) => {
    return serverFetch(`/api/my/company?recruiterId=${recruiterId}`);
}


export const getCompanies = async () => {
    return protectedFetch(`/api/companies`)
}


export const getLoginRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompanies(user?.id);
}