

import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Envelope, Briefcase, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard, Persons, BranchesDown, LayoutHeader } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Wallet } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {

    const user = await getUserSession();

    const recruiterNavlink = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company" },
        { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
        { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];

    const seekerNavlink = [
        { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
        { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
        { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" }, // 'CardPaper' or 'CreditCard' matches your design
        { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
    ];

    const adminNavlink = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Persons, href: "/dashboard/admin/users", label: "Users" },
        { icon: BranchesDown, href: "/dashboard/admin/companies", label: "Companies" }, // Alternately, use 'Nodes' or 'Changelog' based on exact aesthetic preferences
        { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: Wallet, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    const navLinkMap = {
        seeker: seekerNavlink,
        recruiter: recruiterNavlink,
        admin: adminNavlink
    }

    const navItems = navLinkMap[user?.role || 'seeker']

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>;

    return (
        <>
            <aside className="hidden lg:flex flex-col gap-3 w-64 p-4 border-r border-white/10">
                {navContent}
            </aside>
            <Drawer>
                <Button className='lg:hidden' variant="secondary">
                    <LayoutSideContentLeft />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>

        </>
    );
}