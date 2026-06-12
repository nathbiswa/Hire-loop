import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
    const session_id = searchParams?.session_id;

    // ✅ FIX: no crash, safe redirect
    if (!session_id) {
        return redirect('/plans');
    }

    let session;

    try {
        session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (error) {
        console.error("Stripe error:", error);
        return redirect('/plans');
    }

    // ❌ invalid or incomplete session
    if (!session || session.status !== 'complete') {
        return redirect('/plans');
    }

    const email = session.customer_details?.email;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">

                {/* Success Icon */}
                <div className="text-green-500 text-5xl mb-4">
                    ✓
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Successful 🎉
                </h1>

                {/* Message */}
                <p className="text-gray-600 mb-2">
                    Confirmation sent to:
                </p>

                {/* Email */}
                <p className="font-semibold text-gray-800 mb-6">
                    {email}
                </p>

                {/* Button */}
                <Link
                    href="/plans"
                    className="inline-block w-full bg-black text-white py-3 rounded-lg"
                >
                    Go Back to Plans
                </Link>
            </div>
        </div>
    );
}