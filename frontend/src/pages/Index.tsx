
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiaryCard, { DiaryEntry } from "@/components/DiaryCard";
import NavBar from "@/components/NavBar";
import { BookText, Edit } from "lucide-react";

const Index = () => {
  // Mock data - in a real app, this would come from an API
  const [entries] = useState<DiaryEntry[]>([
    {
      id: "1",
      title: "Finding peace in the chaos",
      content: "Today was a whirlwind of emotions. I started my morning with a peaceful meditation session, which helped center my thoughts. Work was hectic as usual, but I managed to stay calm throughout the day. In the evening, I went for a long walk in the park and watched the sunset. Nature has a way of putting things into perspective.",
      date: "April 16, 2025",
      isPublic: true,
      likes: 24,
      comments: 5,
      author: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=1"
      }
    },
    {
      id: "2",
      title: "A new recipe adventure",
      content: "I tried making homemade pasta from scratch today! It was my first attempt, and though it wasn't perfect, the sense of accomplishment was amazing. I mixed flour and eggs, kneaded the dough for what felt like forever, and then rolled it out. The sauce was a simple tomato basil, but the fresh pasta made all the difference. Next time, I'll try adding herbs to the dough.",
      date: "April 15, 2025",
      isPublic: true,
      likes: 17,
      comments: 3,
      author: {
        id: "user2",
        name: "Marcus Chen",
        avatar: "https://i.pravatar.cc/150?img=8"
      }
    },
    {
      id: "3",
      title: "Reflections on turning thirty",
      content: "Today's my birthday, and I've officially entered my thirties. It's strange how society makes such a big deal out of age milestones. I don't feel dramatically different than I did yesterday, but there's a subtle shift in perspective. I'm more comfortable with who I am, less concerned with others' opinions, and clearer about what I want from life. Maybe that's the gift of aging - clarity.",
      date: "April 14, 2025",
      isPublic: true,
      likes: 42,
      comments: 12,
      author: {
        id: "user3",
        name: "Priya Mehta",
        avatar: "https://i.pravatar.cc/150?img=5"
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-diary-darkPurple dark:text-diary-purple mb-4 flex items-center justify-center">
            <BookText className="h-10 w-10 mr-2 text-diary-purple dark:text-diary-purple" />
            DayDream Diary
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            Document your journey, share your thoughts, and connect with others.
            Your personal space to reflect, remember, and grow.
          </p>
          <div className="mt-6">
            <Link to="/write">
              <Button className="bg-diary-purple hover:bg-diary-darkPurple dark:bg-diary-purple dark:hover:bg-diary-darkPurple">
                <Edit className="h-4 w-4 mr-2" />
                Write New Entry
              </Button>
            </Link>
          </div>
        </header>

        <section className="max-w-4xl mx-auto">
          <Tabs defaultValue="public" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 dark:bg-gray-900">
              <TabsTrigger value="public" className="dark:data-[state=active]:bg-gray-700">Public Feed</TabsTrigger>
              <TabsTrigger value="featured" className="dark:data-[state=active]:bg-gray-700">Featured Stories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="public" className="space-y-4 animate-fadeIn">
              {entries.map((entry) => (
                <DiaryCard key={entry.id} entry={entry} />
              ))}
            </TabsContent>
            
            <TabsContent value="featured" className="animate-fadeIn">
              <div className="text-center py-8">
                <p className="text-muted-foreground dark:text-gray-500">
                  Featured stories will appear here soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

export default Index;
