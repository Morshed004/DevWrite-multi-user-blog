import BlogContentWrapper from "@/components/homeComponent/BlogContentWrapper";
import Footer from "@/components/Footer";
import HeaderSkeleton from "@/components/Skeleton/HeaderSkeleton";
import Hero from "@/components/homeComponent/Hero";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default async function Home() {

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<HeaderSkeleton />}>
        <Navbar />
      </Suspense>
      <Hero />
      <BlogContentWrapper />
      <Footer />
    </div>
  );
}