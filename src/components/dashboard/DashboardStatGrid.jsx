import { StatCard } from "./StatCard";
import { CircleCheckFill, FileText, Person, Thunderbolt } from "@gravity-ui/icons";

export default function DashboardStatGrid() {
    const dashboardData = [
        { id: "p1", label: "Total Job Posts", value: "48", icon: FileText },
        { id: "p2", label: "Total Applicants", value: "1,284", icon: Person },
        { id: "p3", label: "Active Jobs", value: "18", icon: Thunderbolt },
        { id: "p4", label: "Jobs Closed", value: "32", icon: CircleCheckFill },
    ];

    return (

        <div className="w-full px-4 sm:px-6 md:px-8 py-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardData.map((data) => (
                        <StatCard
                            key={data.id}
                            label={data.label}
                            value={data.value}
                            icon={data.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}