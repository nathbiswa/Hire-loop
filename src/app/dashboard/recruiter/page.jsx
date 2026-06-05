"use client";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidbar";
import DashboardStatGrid from "@/components/dashboard/DashboardStatGrid";
import { authClient } from "@/lib/auth-client";


const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <div>Loading...</div>;
    }

    const user = session?.user || null;
    console.log("Current User:", user);

    return (
        <div>
            <h1 className="text-4xl  text-white my-10">
                Welcome Back, {user.name}!
            </h1>
            <DashboardStatGrid />
        </div>
    );
};

export default RecruiterDashboardHomePage;