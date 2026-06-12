import { serverFetch } from "../core/sever";

export const getPlansById = async (planId) => {
    return serverFetch(`/api/plans?plan_id=${planId}`);
}