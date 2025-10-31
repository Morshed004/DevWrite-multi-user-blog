"use cache";
import { cacheLife } from "next/cache";

export default async function Footer() {

  cacheLife("max")
  return (
    <footer className="bg-gray-900 border-t border-gray-100 text-gray-300 py-12 mt-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <p className="text-base">
              &copy; {new Date().getFullYear()} DevWrite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}