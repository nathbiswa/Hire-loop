
import { serverMutations } from "../core/sever";
export const createSubscription = async (subInfo) => {
    return serverMutations("/api/subscriptions", subInfo);
}