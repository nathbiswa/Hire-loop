import { requireRole } from '@/lib/core/session';

const AdminDashboardlayout = async ({ children }) => {
    await requireRole('admin')
    return children;
};

export default AdminDashboardlayout;