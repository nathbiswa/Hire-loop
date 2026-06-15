import { protectedFetch } from "../core/sever"

export const getApplicationByApplicantId = async (applicantId) => {
    return protectedFetch(`/api/applications?applicantId=${applicantId}`);
}