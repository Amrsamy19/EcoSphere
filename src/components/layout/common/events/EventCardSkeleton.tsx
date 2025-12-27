"use client";

export default function EventCardSkeleton() {
    return (
        <div className="col-span-1 flex h-full justify-center">
            <div className="w-full h-full flex flex-col max-w-sm overflow-hidden border border-primary/20 bg-background shadow-md rounded-xl animate-pulse">

                {/* Image Header */}
                <div className="relative h-52 bg-muted" />

                {/* Content */}
                <div className="p-5 flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2 text-sm">
                        <div className="h-8 w-28 rounded-full bg-muted" />
                        <div className="h-8 w-36 rounded-full bg-muted" />
                        <div className="h-8 w-40 rounded-full bg-muted" />
                        <div className="h-8 w-32 rounded-full bg-muted" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex m-2 gap-3 mt-auto">
                    <div className="h-10 w-full rounded-full bg-muted" />
                    <div className="h-10 w-full rounded-full bg-muted" />
                </div>
            </div>
        </div>
    );
}
