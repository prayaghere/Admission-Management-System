import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { getFormSetters } from "../../../services/headAdmin"; // Import the getFormSetters service

const RecentFormsetter = () => {
  const [RecentFormSetters, setRecentFormSetters] = useState([]);

  useEffect(() => {
    // Fetch latest form setters from API
    const fetchRecentFormSetters = async () => {
      try {
        const response = await getFormSetters(); // Call the getFormSetters service
        const formSetters = response.data.slice(0, 5); // Get the latest 5 form setters
        setRecentFormSetters(formSetters);
      } catch (error) {
        console.error("Error fetching recent form setters:", error);
      }
    };

    fetchRecentFormSetters(); // Call fetchRecentFormSetters when component mounts
  }, []);

  return (
    <div className="space-y-8">
      {RecentFormSetters.map((formsetter, index) => (
        <div
          key={index}
          className="flex items-center p-1 text-primaryText rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group hover:font-bold"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {formsetter.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {formsetter.firstname}
            </p>
            <p className="text-sm text-muted-foreground">
              Role: {formsetter.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentFormsetter;
