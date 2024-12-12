import Heading from "@/app/components/heading";
import Subheading from "@/app/components/sub_heading";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6">
      <Heading text="Welcome to the admin dashboard" color="text-gray-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-4xl">
        <Link href="/admin/dashboard/messages">
          <div className="flex items-center justify-center bg-yellow-700 p-6 rounded-lg cursor-pointer hover:bg-yellow-600 transition">
            <Subheading text="Messages" color="text-white" />
          </div>
        </Link>

        <Link href="/admin/dashboard/about">
          <div className="flex items-center justify-center bg-green-700 p-6 rounded-lg cursor-pointer hover:bg-green-600 transition">
            <Subheading text="About" color="text-white" />
          </div>
        </Link>

        <Link href="/admin/dashboard/destinations">
          <div className="flex items-center justify-center bg-blue-700 p-6 rounded-lg cursor-pointer hover:bg-blue-600 transition">
            <Subheading text="Destinations" color="text-white" />
          </div>
        </Link>

        <Link href="/admin/dashboard/packages">
          <div className="flex items-center justify-center bg-red-700 p-6 rounded-lg cursor-pointer hover:bg-red-600 transition">
            <Subheading text="Packages" color="text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
