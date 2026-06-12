import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center text-white">
            <div className="space-y-4">
                {/* Shield / Lock Icon simulation */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    401 - Unauthorized
                </h1>

                <p className="mx-auto max-w-md text-zinc-400">
                    Oops! You don't have permission to access this page. Please sign in with an authorized account or head back to the dashboard.
                </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                    href="/login"
                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                >
                    Sign In
                </Link>
                <Link
                    href="/"
                    className="rounded-lg border border-zinc-8 text-sm font-semibold text-zinc-300 px-5 py-2.5 transition hover:bg-zinc-900"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}