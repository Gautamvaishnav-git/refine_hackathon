"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Page = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const logout = async () => {
    const { error } = await toast.promise(supabase.auth.signOut(), {
      pending: "Logging out...",
    });
    if (!error) {
      router.push("/auth/login");
    } else {
      alert(`"error": ${error}}`);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-0">
        <div className="bg-white p-8 shadow-md rounded-md w-full sm:w-1/2 md:w-1/3 xl:w-80">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Logout</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to log out?
          </p>
          <Button
            className="bg-red-500 text-white py-2 px-4 mr-2"
            onClick={logout}
            variant={"outline"}
          >
            logout
          </Button>
          <Button
            variant={"outline"}
            className="bg-primary text-white py-2 px-4"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
