
import NavBar from "@/components/NavBar";
import DiaryEditor from "@/components/DiaryEditor";

const WritePage = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4">
        <DiaryEditor />
      </div>
    </div>
  );
};

export default WritePage;
