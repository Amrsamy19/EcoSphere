"use client";

import CustomerProfile from "@/components/profile/CustomerProfile";
import { Provider } from "react-redux";
import { store } from "@/frontend/redux/store";

export default function CustomerProfileDemo() {
    return (
        <Provider store={store}>
            <div className="bg-background py-8">
                <div className="min-h-screen flex justify-center items-center w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-[80%]">
                        <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                            <p className="text-sm font-semibold">Demo Mode - Customer Profile</p>
                            <p className="text-xs">This is a demo page to view the Customer profile component without authentication.</p>
                        </div>
                        <CustomerProfile />
                    </div>
                </div>
            </div>
        </Provider>
    );
}
