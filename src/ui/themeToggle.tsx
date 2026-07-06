import { Sun } from "lucide-react";
import { useTheme } from "../context/themeContext";
import { LuSunMoon } from "react-icons/lu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      console.log("Theme changed to dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? (
        <LuSunMoon className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
      ) : (
        <Sun className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500" />
      )}
    </button>
  );
}