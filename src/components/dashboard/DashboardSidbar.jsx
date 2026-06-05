

import { LayoutSideContentLeft, Bell, Envelope, Briefcase, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company" },
        { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
        { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];

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