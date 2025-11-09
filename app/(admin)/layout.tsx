import Loader from "@/components/Loader";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <Suspense fallback={<Loader />}>
       {children}
      </Suspense>
    </div>
  );
}