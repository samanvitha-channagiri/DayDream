
import { Link } from "react-router-dom";
import { LoginForm } from "@/components/AuthForms";
import NavBar from "@/components/NavBar";
import { BookText } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto text-center mb-8">
          <Link to="/" className="inline-flex items-center">
            <BookText className="h-8 w-8 text-diary-purple" />
            <span className="font-bold text-2xl ml-2 text-diary-darkPurple dark:text-diary-purple">DayDream</span>
          </Link>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
