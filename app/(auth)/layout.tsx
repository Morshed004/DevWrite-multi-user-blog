import { Suspense } from "react";
import AuthSkeleton from "./AuthSkeleton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <Suspense fallback={<AuthSkeleton />}>
                {children}
            </Suspense>
        </>
    );
}