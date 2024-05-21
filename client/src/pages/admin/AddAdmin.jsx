import React, { useState } from "react";
import { addAdmin } from "@/services/headAdmin";
import { useToast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "@/components/ui/input";
const AddAdmin = ({ onSave }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adminData = { firstname, lastname, email, password };

    try {
      await addAdmin(adminData);
      onSave(adminData);
      toast({
        title: "Admin added successfully",
      });
    } catch (error) {
      console.error("Error adding admin:", error);
      toast({
        variant: "destructive",
        title: "Error adding admin",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="sm:w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {/* Firstname Field */}
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">
                First Name
              </label>
              <Input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-3 py-2 border rounded-md "
                required
              />
            </div>
            {/* Lastname Field */}
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">
                Last Name
              </label>
              <Input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block mb-1 font-bold">
                Password
              </label>
              <Input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-primaryText text-white border-none focus:outline-none"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAdmin;
