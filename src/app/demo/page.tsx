"use client";

import Link from "next/link";

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
            <div className="max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
                    Profile Components Demo
                </h1>
                <p className="text-center text-muted-foreground mb-8">
                    Select a profile type to view the component without authentication
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href="/demo/customer-profile"
                        className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all hover:scale-105"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-card-foreground mb-2">
                                Customer Profile
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                View the customer profile component
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/demo/organizer-profile"
                        className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all hover:scale-105"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-card-foreground mb-2">
                                Organizer Profile
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                View the organizer profile component
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/demo/restaurant-profile"
                        className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all hover:scale-105"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-card-foreground mb-2">
                                Restaurant Profile
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                View the restaurant profile component
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                        <strong>Note:</strong> These demo pages show the profile components without requiring authentication.
                        The components will display with empty data since no user is logged in.
                    </p>
                </div>
            </div>
        </div>
    );
}
