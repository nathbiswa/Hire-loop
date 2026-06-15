'use client';

import React, { useState } from 'react';
import { Avatar, Pagination, Button } from '@heroui/react';
import { ChevronLeft, ChevronRight, Briefcase, Person } from '@gravity-ui/icons';
import { updateUserRole } from '@/lib/actions/users';

export default function UserManagementTable({ initialUsers }) {
    // নিশ্চিত হচ্ছি যে ডেটা যেন সবসময় অ্যারে থাকে
    const [users, setUsers] = useState(Array.isArray(initialUsers) ? initialUsers : []);

    // মোডাল/ডায়ালগ স্টেটস
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState(null); // { userId, userName, currentRole, newRole }
    const [isUpdating, setIsUpdating] = useState(false);

    // Status Toggle
    const handleToggleStatus = (id) => {
        setUsers(users.map(user => {
            const currentId = user.id || user._id?.$oid || user._id;
            if (currentId === id) {
                return { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' };
            }
            return user;
        }));
    };

    // বাটনে ক্লিক করলে সরাসরি আপডেট না হয়ে প্রথমে ডায়ালগ ওপেন হবে
    const handleOpenConfirmModal = (userId, userName, currentRole) => {
        const newRole = currentRole?.toLowerCase() === 'recruiter' ? 'seeker' : 'recruiter';
        setPendingUpdate({ userId, userName, currentRole, newRole });
        setIsModalOpen(true);
    };

    // ডায়ালগ বক্সে "Confirm" এ ক্লিক করলে এই ফাংশনটি রান হবে (FIXED)
    const handleConfirmRoleChange = async () => {
        if (!pendingUpdate) return;

        setIsUpdating(true);
        const { userId, newRole } = pendingUpdate;

        try {
            // ১. ব্যাকএন্ড ডাটাবেজ আপডেট কল
            await updateUserRole(userId, newRole);

            // ২. ফ্রন্টএন্ড ক্লায়েন্ট স্টেট আপডেট
            setUsers(prevUsers => prevUsers.map(user => {
                const currentId = user.id || user._id?.$oid || user._id;
                if (currentId === userId) {
                    return { ...user, role: newRole };
                }
                return user;
            }));

            // মোডাল বন্ধ করা এবং স্টেট ক্লিয়ার করা
            setIsModalOpen(false);
            setPendingUpdate(null);
        } catch (error) {
            console.error("Failed to update role:", error);
            alert("Something went wrong while updating the role!");
        } finally {
            setIsUpdating(false);
        }
    };

    // Delete Interaction
    const handleDelete = (id) => {
        setUsers(users.filter(user => {
            const currentId = user.id || user._id?.$oid || user._id;
            return currentId !== id;
        }));
    };

    return (
        <div className="w-full bg-[#0d0d0d] text-white p-4 font-sans antialiased relative">

            {/* --- CORE USER DATA TABLE --- */}
            <div className="bg-[#121212] border border-neutral-800/80 rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#181818] border-b border-neutral-800/60">
                            <th className="text-neutral-400 font-semibold text-xs uppercase py-4 pl-6">User Name</th>
                            <th className="text-neutral-400 font-semibold text-xs uppercase py-4">Email Address</th>
                            <th className="text-neutral-400 font-semibold text-xs uppercase py-4">Role</th>
                            <th className="text-neutral-400 font-semibold text-xs uppercase py-4">Join Date</th>
                            <th className="text-neutral-400 font-semibold text-xs uppercase py-4">Status</th>
                            <th className="text-neutral-400 font-semibold text-xs uppercase py-4 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-sm text-neutral-500">
                                    No user accounts found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => {
                                const userId = user.id || user._id?.$oid || user._id || index;
                                const isRecruiter = user.role?.toLowerCase() === 'recruiter';
                                const isActive = user.status !== 'Suspended';

                                return (
                                    <tr key={userId} className="hover:bg-neutral-900/30 border-b border-neutral-800/40 last:border-none transition-colors">

                                        {/* ১. Name */}
                                        <td className="py-4 pl-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : "US"}
                                                    src={user.image || user.avatar || undefined}
                                                    className="w-8 h-8 text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700/50"
                                                />
                                                <span className="font-medium text-neutral-100">{user.name || 'Anonymous User'}</span>
                                            </div>
                                        </td>

                                        {/* ২. Email */}
                                        <td className="py-4 text-sm text-neutral-400 align-middle">
                                            {user.email}
                                        </td>

                                        {/* ৩. Role */}
                                        <td className="py-4 align-middle">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1a1a1a] text-neutral-300 text-xs font-medium rounded-full border border-neutral-800">
                                                {isRecruiter ? (
                                                    <Briefcase width={12} height={12} className="text-neutral-400" />
                                                ) : (
                                                    <Person width={12} height={12} className="text-neutral-400" />
                                                )}
                                                {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Seeker'}
                                            </span>
                                        </td>

                                        {/* ৪. Join Date */}
                                        <td className="py-4 text-sm text-neutral-400 align-middle">
                                            {(() => {
                                                const dateTarget = user.createdAt?.$date || user.createdAt;
                                                if (!dateTarget) return user.joinDate || 'Recent Member';
                                                try {
                                                    return new Date(dateTarget).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    });
                                                } catch (e) {
                                                    return 'Recent Member';
                                                }
                                            })()}
                                        </td>

                                        {/* ৫. Status */}
                                        <td className="py-4 align-middle">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${isActive ? 'text-green-500' : 'text-red-500'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                                {isActive ? 'Active' : 'Suspended'}
                                            </span>
                                        </td>

                                        {/* ৬. Actions */}
                                        <td className="py-4 pr-6 text-right align-middle">
                                            <div className="flex items-center justify-end gap-4">
                                                <button
                                                    onClick={() => handleOpenConfirmModal(userId, user.name, user.role)}
                                                    className="text-neutral-400 hover:text-white text-xs font-medium transition-colors"
                                                >
                                                    Make {isRecruiter ? 'Seeker' : 'Recruiter'}
                                                </button>

                                                {isActive ? (
                                                    <button
                                                        onClick={() => handleToggleStatus(userId)}
                                                        className="text-red-500 hover:text-red-400 text-xs font-semibold transition-colors"
                                                    >
                                                        Suspend
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleToggleStatus(userId)}
                                                            className="text-green-500 hover:text-green-400 text-xs font-semibold transition-colors"
                                                        >
                                                            Activate
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(userId)}
                                                            className="text-neutral-500 hover:text-neutral-300 text-xs font-semibold transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- FOOTER PAGINATION BAR --- */}
            <footer className="flex justify-between items-center mt-5 px-2">
                <span className="text-xs text-neutral-500">
                    Showing 1 to {users.length} of {users.length} users
                </span>

                <div className="flex items-center gap-1">
                    <Button isIconOnly variant="light" size="sm" className="text-neutral-500 hover:text-white min-w-8 h-8 rounded-lg">
                        <ChevronLeft width={16} />
                    </Button>

                    <Pagination
                        total={1}
                        initialPage={1}
                        size="sm"
                        variant="flat"
                        classNames={{
                            wrapper: "gap-1 bg-transparent shadow-none",
                            item: "bg-transparent text-neutral-400 hover:bg-neutral-900 min-w-8 h-8 rounded-md text-xs font-medium border border-transparent",
                            cursor: "bg-white text-black font-semibold rounded-md min-w-8 h-8 text-xs shadow-none"
                        }}
                    />

                    <Button isIconOnly variant="light" size="sm" className="text-neutral-500 hover:text-white min-w-8 h-8 rounded-lg">
                        <ChevronRight width={16} />
                    </Button>
                </div>
            </footer>

            {/* --- CUSTOM CONFIRMATION DIALOGUE MODAL --- */}
            {isModalOpen && pendingUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                        <h3 className="text-lg font-bold text-neutral-100 mb-2">
                            Confirm Role Change
                        </h3>

                        <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                            Are you sure you want to change the role of <span className="text-white font-semibold">"{pendingUpdate.userName}"</span> from{' '}
                            <span className="text-yellow-500 font-semibold capitalize">{pendingUpdate.currentRole || 'seeker'}</span> to{' '}
                            <span className="text-green-500 font-semibold capitalize">{pendingUpdate.newRole}</span>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                disabled={isUpdating}
                                onClick={() => { setIsModalOpen(false); setPendingUpdate(null); }}
                                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={handleConfirmRoleChange}
                                className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
                            >
                                {isUpdating ? 'Updating...' : 'Confirm Change'}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}