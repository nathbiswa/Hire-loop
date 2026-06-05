import { DashboardSidebar } from "@/components/dashboard/DashboardSidbar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-black">
            <DashboardSidebar />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
                <div className="py-6">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;