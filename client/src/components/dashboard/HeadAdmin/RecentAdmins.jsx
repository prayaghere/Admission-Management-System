import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { getAdmins } from "../../../services/headAdmin"; // Import the getFormSetters service

// Hardcoded data for demonstration

const RecentAdmins = () => {
  const [recentAdmins, setRecentAdmins] = useState([]);

  useEffect(() => {
    // Fetch latest form setters from API
    const fetchRecentAdmins = async () => {
      try {
        const response = await getAdmins(); // Call the getFormSetters service
        const admins = response.data.slice(0, 5); // Get the latest 5 form setters
        setRecentAdmins(admins);
      } catch (error) {
        console.error("Error fetching recent form setters:", error);
      }
    };

    fetchRecentAdmins(); // Call fetchRecentFormSetters when component mounts
  }, []);
  return (
    <div className="space-y-8">
      {recentAdmins.map((admin, index) => (
        <div
          key={index}
          className="flex items-center p-1 text-primaryText rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group hover:font-bold"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {admin.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {admin.firstname}
            </p>
            <p className="text-sm text-muted-foreground">Role: {admin.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentAdmins;
