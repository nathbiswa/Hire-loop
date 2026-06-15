'use client';

import { Button, Card } from '@heroui/react';
import { ShieldExclamation, ArrowLeft, House } from '@gravity-ui/icons';

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen bg-content2 flex flex-col items-center justify-center p-6">
            <Card className="max-w-md w-full shadow-lg border-small border-default-100 p-6 text-center space-y-6 overflow-visible">

                {/* Animated GravityUI Guard Icon */}
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-danger-50 text-danger rounded-full dark:bg-danger-950/30 animate-pulse">
                        <ShieldExclamation width={48} height={48} />
                    </div>

                    <h1 className="text-7xl font-extrabold text-foreground tracking-tight">
                        403
                    </h1>
                    <h2 className="text-2xl font-bold text-default-800">
                        Access Forbidden
                    </h2>
                </div>

                {/* User-friendly message */}
                <p className="text-sm text-default-500 leading-relaxed">
                    Hold on a second! You don't have the necessary clearance or roles to view this page.
                    If you think this is a mistake, please reach out to your system administrator.
                </p>

                {/* HeroUI Action Buttons Layout */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button
                        variant="bordered"
                        color="default"
                        onPress={() => window.history.back()}
                        startContent={<ArrowLeft width={16} height={16} />}
                        className="font-medium"
                    >
                        Go Back
                    </Button>

                    <Button
                        color="primary"
                        as="a"
                        href="/"
                        startContent={<House width={16} height={16} />}
                        className="font-medium shadow-md"
                    >
                        Back to Dashboard
                    </Button>
                </div>

            </Card>
        </div>
    );
}