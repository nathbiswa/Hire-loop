// app/admin/users/page.js
import React from 'react';
import { getUsersList } from '@/lib/api/users';
import UserManagementTable from './UserManagementTable';

const AdminUserPage = async () => {
    // Fetch data directly on the server
    const data = await getUsersList();
    const initialUsers = data?.users || [];

    return <UserManagementTable initialUsers={initialUsers} />;
};

export default AdminUserPage;