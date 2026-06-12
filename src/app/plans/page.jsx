'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// HeroUI Components
import { Tabs, Card } from '@heroui/react';
// Gravity UI Icons
import { Check, ShieldCheck, TriangleExclamation } from '@gravity-ui/icons';

function PricingContent() {
    const [userType, setUserType] = useState('seeker');

    // আপনার সার্ভার কম্পোনেন্টের 'await searchParams' এর ক্লায়েন্ট সাইড বিকল্প
    const searchParams = useSearchParams();
    const isCanceled = searchParams.get('canceled') === 'true';

    if (isCanceled) {
        console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
        );
    }

    const seekerPlans = [
        {
            id: "seeker_free",
            name: "Free",
            price: "$0",
            period: "/forever",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic profile creation",
                "Standard email alerts"
            ],
            cta: "Get Started",
            isFree: true,
            href: "/auth/login",
            popular: false
        },
        {
            id: "seeker_pro", // আপনার আসল স্ট্রাইপ প্রাইস আইডি বসাবেন
            name: "Pro",
            price: "$19",
            period: "/month",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved jobs",
                "Real-time application tracking",
                "Salary & market insights"
            ],
            cta: "Upgrade to Pro",
            isFree: false,
            popular: true
        },
        {
            id: "seeker_premium", // আপনার আসল স্ট্রাইপ প্রাইস আইডি বসাবেন
            name: "Premium",
            price: "$39",
            period: "/month",
            features: [
                "Everything in Pro",
                "Unlimited applications",
                "Profile boost to top recruiters",
                "Early access to new job posts",
                "Priority customer support"
            ],
            cta: "Go Premium",
            isFree: false,
            popular: false
        }
    ];

    const recruiterPlans = [
        {
            id: "recruiter_free",
            name: "Free",
            price: "$0",
            period: "/forever",
            features: [
                "Up to 3 active job posts",
                "Basic applicant management",
                "Standard listing visibility",
                "Great for a company's first year of hiring"
            ],
            cta: "Start Posting",
            isFree: true,
            href: "/auth/login",
            popular: false
        },
        {
            id: "recruiter_growth", // আপনার আসল স্ট্রাইপ প্রাইস আইডি বসাবেন
            name: "Growth",
            price: "$49",
            period: "/month",
            features: [
                "Up to 10 active job posts",
                "Advanced applicant tracking",
                "Basic performance analytics",
                "Direct email support"
            ],
            cta: "Choose Growth",
            isFree: false,
            popular: true
        },
        {
            id: "recruiter_enterprise", // আপনার আসল স্ট্রাইপ প্রাইস আইডি বসাবেন
            name: "Enterprise",
            price: "$149",
            period: "/month",
            features: [
                "Up to 50 active job posts",
                "Advanced analytics dashboard",
                "Featured job listings boost",
                "Team collaboration tools",
                "Custom company branding",
                "Priority 24/7 support"
            ],
            cta: "Contact Enterprise",
            isFree: false,
            popular: false
        }
    ];

    const currentPlans = userType === 'seeker' ? seekerPlans : recruiterPlans;

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">

            {/* Stripe Cancelation Alert (UI Visual Notification) */}
            {isCanceled && (
                <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3 text-amber-500 text-sm max-w-2xl mx-auto backdrop-blur-sm">
                    <TriangleExclamation className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p>
                        Order canceled — continue to shop around and checkout when you're ready.
                    </p>
                </div>
            )}

            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
                    Transparent Plans for Everyone
                </h1>
                <p className="text-slate-500">
                    Choose the plan that fits your goals. Upgrade, downgrade, or cancel anytime.
                </p>

                {/* HeroUI Tabs Switcher */}
                <div className="mt-8 flex justify-center">
                    <Tabs
                        selectedKey={userType}
                        onSelectionChange={(key) => setUserType(key)}
                        variant="primary"
                    >
                        <Tabs.ListContainer>
                            <Tabs.List aria-label="Target Audience Plans">
                                <Tabs.Tab id="seeker">Seekers</Tabs.Tab>
                                <Tabs.Tab id="recruiter">Recruiters</Tabs.Tab>
                            </Tabs.List>
                        </Tabs.ListContainer>
                    </Tabs>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-12">
                {currentPlans.map((plan, index) => {

                    // মূল কার্ড কন্টেন্ট ডিজাইন
                    const renderCardBody = () => (
                        <Card
                            className={`h-full relative flex flex-col bg-white border rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-200 ${plan.popular
                                ? 'border-blue-600 ring-4 ring-blue-50/70'
                                : 'border-slate-200'
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10">
                                    Most Popular
                                </span>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                    <span className="text-sm font-medium text-slate-500">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-tight">
                                        {plan.popular ? (
                                            <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button Section */}
                            <div>
                                {plan.isFree ? (
                                    <Link
                                        href={plan.href}
                                        className="block w-full text-center font-semibold py-3 px-4 rounded-xl shadow-sm transition-all text-sm bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                                    >
                                        {plan.cta}
                                    </Link>
                                ) : (
                                    // আপনার দেয়া কোডের পিওর সাবমিট বাটন লজিক
                                    <button
                                        type="submit"
                                        role="link"
                                        className={`w-full text-center font-semibold py-3 px-4 rounded-xl shadow-sm transition-all text-sm ${plan.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5 active:translate-y-0'
                                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                )}
                            </div>
                        </Card>
                    );

                    // ফ্রি প্ল্যান হলে ফর্ম ছাড়া সাধারণ লিংকে যাবে
                    if (plan.isFree) {
                        return (
                            <div key={index} className="h-full">
                                {renderCardBody()}
                            </div>
                        );
                    }

                    return (
                        <form key={index} action="/api/checkout_sessions" method="POST" className="h-full">
                            {/* <input type="hidden" name="plan_id" value={plan.id} /> */}
                            <input type="hidden" name="plan_id" value={plan.id} />
                            <input type="hidden" name="planName" value={plan.name} />
                            {renderCardBody()}
                        </form>
                    );
                })}
            </div>

            {/* Footer Note */}
            <div className="text-center mt-12">
                <p className="text-xs text-slate-400">
                    All transactions are secure and encrypted via Stripe. Need a custom plan?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        Contact sales
                    </Link>.
                </p>
            </div>
        </div>
    );
}

// Next.js-এ ক্লায়েন্ট সাইড searchParams ব্যবহারের সর্বোত্তম নিয়ম অনুযায়ী Suspense র‍্যাপার দেওয়া হলো
export default function PricingPage() {
    return (
        <Suspense fallback={<div className="text-center text-slate-400 py-24">Loading Pricing Plans...</div>}>
            <PricingContent />
        </Suspense>
    );
}