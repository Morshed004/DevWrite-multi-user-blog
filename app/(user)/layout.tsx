import Loader from "@/components/Loader";
import { Suspense } from "react";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
    <Suspense fallback={<Loader />}>
        {children}
    </Suspense>
    </>
  );
}