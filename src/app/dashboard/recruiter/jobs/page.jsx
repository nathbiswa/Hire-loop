import { Table } from "@heroui/react";
import { getCompanyJobs } from "@/lib/api/jobs";

const RecruiterJobsPage = async () => {
    const companyId = "company_123";
    const jobs = await getCompanyJobs(companyId);

    return (
        <div className="p-6 bg-[#0a0a0a] min-h-screen text-white">

            <h2 className="text-xl mb-4 font-semibold">
                Recruiter Jobs
            </h2>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Company Jobs Table"
                        className="min-w-[900px]"
                    >

                        {/* HEADER */}
                        <Table.Header>
                            <Table.Column isRowHeader>Name</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Location</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Website</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        {/* BODY */}
                        <Table.Body>
                            {jobs?.map((job) => (
                                <Table.Row key={job._id}>

                                    <Table.Cell>{job.name}</Table.Cell>

                                    <Table.Cell>{job.category}</Table.Cell>

                                    <Table.Cell>{job.location}</Table.Cell>

                                    <Table.Cell>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${job.status === "active"
                                                ? "bg-green-600"
                                                : "bg-gray-600"
                                                }`}
                                        >
                                            {job.status}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <a
                                            href={job.website}
                                            target="_blank"
                                            className="text-blue-400 underline"
                                        >
                                            Visit
                                        </a>
                                    </Table.Cell>

                                    {/* ACTIONS */}
                                    <Table.Cell>
                                        <div className="flex gap-2">

                                            <a
                                                href={`/dashboard/recruiter/${job._id}`}
                                                className="px-2 py-1 text-xs bg-gray-700 rounded"
                                            >
                                                View
                                            </a>

                                            <a
                                                href={`/dashboard/recruiter/edit/${job._id}`}
                                                className="px-2 py-1 text-xs bg-blue-600 rounded"
                                            >
                                                Edit
                                            </a>

                                            <button
                                                className="px-2 py-1 text-xs bg-red-600 rounded"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

        </div>
    );
};

export default RecruiterJobsPage;