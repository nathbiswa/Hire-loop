
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (jobData) => {

    const res = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    });

    return res.json();
}