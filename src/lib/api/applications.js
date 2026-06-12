import { serverFetch } from "../core/sever"

export const getApplicationByApplicantId = async (applicantId) => {
    return serverFetch(`/api/applications?applicantId=${applicantId}`);
}