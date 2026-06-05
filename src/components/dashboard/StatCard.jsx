import React from "react";
import { Card } from "@heroui/react";

export const StatCard = ({ icon: Icon, label, value }) => {
    return (
        <Card

            className="bg-[#121212] border border-neutral-800 p-5 min-h-[150px] flex flex-col justify-between shadow-sm"
            radius="lg"
        >
            {/* Icon Box */}
            <div className="bg-[#222222] w-10 h-10 rounded-lg flex items-center justify-center">

                <Icon className="text-neutral-300 w-5 h-5" strokeWidth={2} />
            </div>

            {/* Text Content */}
            <div className="space-y-1">
                <p className="text-neutral-500 text-[13px] font-medium tracking-wide uppercase">
                    {label}
                </p>
                <h2 className="text-white text-3xl font-semibold tracking-tight">
                    {value}
                </h2>
            </div>
        </Card>
    );
};