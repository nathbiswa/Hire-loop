'use client'

import { serverMutations } from "../core/sever"

export const submitApplications = async (newApplications) => {
    return serverMutations("/api/applications", newApplications)
}

