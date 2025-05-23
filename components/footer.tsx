import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="h-5 w-5 text-green-700" />
            <span className="text-lg font-semibold text-green-800">
              Pet Health
            </span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
            <Link href="#" className="hover:text-green-700">
              About Us
            </Link>
            <Link href="#" className="hover:text-green-700">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-green-700">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-green-700">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2023 Pet Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
