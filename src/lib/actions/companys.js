"use server";


import { revalidatePath } from "next/cache";
import { serverMutations } from "../core/sever";


export const cteateCompany = async (newCompanyData) => {
    return serverMutations("/api/companies", newCompanyData);


}

export const updateCompany = async (id, data) => {
    const result = serverMutations(`/api/companies/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/companies');
    return result;
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newCompanyData)
//     });

//     if (!res.ok) {
//         throw new Error("Failed to create company");
//     }

//     return res.json();
// };