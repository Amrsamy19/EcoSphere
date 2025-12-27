"use client";

export default function EventListCardSkeleton() {
    return (
        <div className="col-span-1 flex h-full justify-center">
            <div
                className="
          w-full h-full max-w-sm flex flex-col
          overflow-hidden border border-primary/20
          bg-background shadow-md
          ltr:rounded-tr-4xl ltr:rounded-bl-4xl
          rtl:rounded-tl-4xl rtl:rounded-br-4xl
          animate-pulse
        "
            >
                {/* Image Header */}
                <div className="relative h-52 bg-muted">
                    {/* status pill placeholder */}
                    <div className="absolute top-4 ltr:left-4 rtl:right-4 h-6 w-20 rounded-full bg-muted-foreground/30" />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2 text-sm">
                        <div className="h-8 w-32 rounded-full bg-muted" />
                        <div className="h-8 w-40 rounded-full bg-muted" />
                        <div className="h-8 w-36 rounded-full bg-muted" />
                        <div className="h-8 w-28 rounded-full bg-muted" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex m-2 gap-3 mt-auto">
                    <div className="h-10 flex-1 rounded-full bg-muted" />
                    <div className="h-10 flex-1 rounded-full bg-muted" />
                </div>
            </div>
        </div>
    );
}
