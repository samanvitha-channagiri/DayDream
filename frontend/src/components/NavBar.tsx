
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookText, Home, LogIn, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = () => {
  // For demo purposes, we'll consider the user as not logged in by default
  const isLoggedIn = false;

  return (
    <nav className="border-b py-3 px-4 bg-background dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookText className="h-6 w-6 text-diary-purple" />
          <span className="font-bold text-xl text-diary-darkPurple dark:text-diary-purple">DayDream</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-foreground hover:text-diary-purple flex items-center">
            <Home className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/write" className="hidden sm:block">
                <Button variant="outline" className="border-diary-purple text-diary-purple hover:bg-diary-lightPurple dark:border-diary-purple dark:text-diary-purple dark:hover:bg-gray-800">
                  Write new entry
                </Button>
              </Link>
              <Link to="/profile" className="text-foreground hover:text-diary-purple">
                <User className="h-5 w-5" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-foreground hover:text-diary-purple flex items-center">
                <LogIn className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button className="bg-diary-purple hover:bg-diary-darkPurple dark:bg-diary-purple dark:hover:bg-diary-darkPurple">Sign Up</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
