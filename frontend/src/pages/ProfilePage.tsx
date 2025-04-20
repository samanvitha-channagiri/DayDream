
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiaryCard, { DiaryEntry } from "@/components/DiaryCard";
import NavBar from "@/components/NavBar";
import { Calendar, Edit, MapPin, Settings, User } from "lucide-react";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  
  // Mock data - in a real app, this would come from an API based on the userID
  const profile = {
    id: userId || "user1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Writer, dreamer, and avid coffee drinker. Documenting life one day at a time.",
    location: "San Francisco, CA",
    joinedDate: "January 2025",
    isCurrentUser: true,
  };

  // Mock entries data
  const [publicEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      title: "Finding peace in the chaos",
      content: "Today was a whirlwind of emotions. I started my morning with a peaceful meditation session, which helped center my thoughts. Work was hectic as usual, but I managed to stay calm throughout the day. In the evening, I went for a long walk in the park and watched the sunset. Nature has a way of putting things into perspective.",
      date: "April 16, 2025",
      isPublic: true,
      likes: 24,
      comments: 5,
      author: {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar
      }
    },
    {
      id: "4",
      title: "Weekend hiking adventure",
      content: "Spent the weekend hiking in the mountains. The views were absolutely breathtaking, and I feel refreshed and recharged for the week ahead.",
      date: "April 10, 2025",
      isPublic: true,
      likes: 18,
      comments: 2,
      author: {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar
      }
    }
  ]);

  const [privateEntries] = useState<DiaryEntry[]>([
    {
      id: "5",
      title: "Personal goals for the quarter",
      content: "I've been reflecting on what I want to accomplish in the next three months. Here's my personal roadmap...",
      date: "April 12, 2025",
      isPublic: false,
      likes: 0,
      comments: 0,
      author: {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar
      }
    },
    {
      id: "6",
      title: "Therapy session insights",
      content: "Today's therapy session was really productive. We discussed my anxiety triggers and developed some new coping strategies.",
      date: "April 8, 2025",
      isPublic: false,
      likes: 0,
      comments: 0,
      author: {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {profile.joinedDate}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {profile.isCurrentUser ? (
                <>
                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                  </Link>
                  <Link to="/write">
                    <Button size="sm" className="bg-diary-purple hover:bg-diary-darkPurple">
                      <Edit className="h-4 w-4 mr-1" />
                      Write
                    </Button>
                  </Link>
                </>
              ) : (
                <Button size="sm" className="bg-diary-purple hover:bg-diary-darkPurple">
                  <User className="h-4 w-4 mr-1" />
                  Follow
                </Button>
              )}
            </div>
          </div>
        </Card>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={profile.isCurrentUser ? "all" : "public"} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="public">Public</TabsTrigger>
              {profile.isCurrentUser && (
                <TabsTrigger value="private">Private</TabsTrigger>
              )}
              <TabsTrigger value="all">All Entries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="public" className="space-y-4 animate-fadeIn">
              {publicEntries.length > 0 ? (
                publicEntries.map((entry) => (
                  <DiaryCard key={entry.id} entry={entry} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No public entries yet.</p>
                </div>
              )}
            </TabsContent>
            
            {profile.isCurrentUser && (
              <TabsContent value="private" className="space-y-4 animate-fadeIn">
                {privateEntries.length > 0 ? (
                  privateEntries.map((entry) => (
                    <DiaryCard key={entry.id} entry={entry} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No private entries yet.</p>
                  </div>
                )}
              </TabsContent>
            )}
            
            <TabsContent value="all" className="space-y-4 animate-fadeIn">
              {profile.isCurrentUser ? (
                [...publicEntries, ...privateEntries].map((entry) => (
                  <DiaryCard key={entry.id} entry={entry} />
                ))
              ) : (
                publicEntries.map((entry) => (
                  <DiaryCard key={entry.id} entry={entry} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
