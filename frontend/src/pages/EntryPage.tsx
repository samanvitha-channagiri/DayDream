
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
import { DiaryEntry } from "@/components/DiaryCard";
import { EmojiPicker } from "@/components/EmojiPicker";
import NavBar from "@/components/NavBar";
import { Calendar, Eye, Heart, MessageCircle, Share2 } from "lucide-react";

const EntryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  
  // Mock data - in a real app, this would come from an API based on the ID
  const entry: DiaryEntry = {
    id: id || "1",
    title: "Finding peace in the chaos",
    content: `Today was a whirlwind of emotions. I started my morning with a peaceful meditation session, which helped center my thoughts. Work was hectic as usual, but I managed to stay calm throughout the day.

In the evening, I went for a long walk in the park and watched the sunset. Nature has a way of putting things into perspective.

I've been thinking a lot about the concept of balance lately. How do we maintain equilibrium when life is constantly throwing new challenges our way? Perhaps the key isn't to avoid the chaos but to find moments of stillness within it.

Tomorrow, I'm going to try to incorporate more mindful breaks throughout my day. Even just a few minutes of deep breathing can make a difference.`,
    date: "April 16, 2025",
    isPublic: true,
    likes: 24,
    comments: 5,
    author: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  };

  const comments = [
    {
      id: "c1",
      content: "This really resonated with me. I've been practicing meditation for years and it's been transformative.",
      date: "April 16, 2025",
      author: {
        id: "user2",
        name: "Marcus Chen",
        avatar: "https://i.pravatar.cc/150?img=8"
      }
    },
    {
      id: "c2",
      content: "I love your perspective on finding balance. It's something I struggle with daily.",
      date: "April 16, 2025",
      author: {
        id: "user3",
        name: "Priya Mehta",
        avatar: "https://i.pravatar.cc/150?img=5"
      }
    },
    {
      id: "c3",
      content: "The sunset at the park is amazing this time of year. Great choice for some peaceful reflection.",
      date: "April 16, 2025",
      author: {
        id: "user4",
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?img=12"
      }
    }
  ];

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
    // In a real app, we would also send this to the server
  };

  const handleInsertEmoji = (emoji: string) => {
    setComment(prev => prev + emoji);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to the server
    console.log("Submitting comment:", comment);
    setComment("");
  };

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={entry.author.avatar} />
                    <AvatarFallback>{entry.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link to={`/profile/${entry.author.id}`} className="font-medium hover:underline">
                      {entry.author.name}
                    </Link>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {entry.date}
                    </div>
                  </div>
                </div>
                {entry.isPublic && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="h-3 w-3 mr-1" />
                    Public
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
            </CardHeader>
            
            <CardContent className="pt-4 pb-6">
              <div className="diary-content whitespace-pre-line">
                {entry.content}
              </div>
            </CardContent>
            
            <CardFooter className="border-t py-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 flex items-center ${liked ? 'text-red-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className="h-4 w-4 mr-1" fill={liked ? "currentColor" : "none"} />
                  {likeCount} likes
                </Button>
                <Button variant="ghost" size="sm" className="px-2 flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {comments.length} comments
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="px-2">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </CardFooter>
          </Card>

          <div id="comments" className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            
            <div className="mb-6">
              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <div className="flex">
                  <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="rounded-r-none"
                  />
                  <EmojiPicker onSelect={handleInsertEmoji} />
                  <Button 
                    type="submit" 
                    className="rounded-l-none bg-diary-purple hover:bg-diary-darkPurple"
                    disabled={!comment.trim()}
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Link to={`/profile/${comment.author.id}`} className="font-medium text-sm hover:underline">
                          {comment.author.name}
                        </Link>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
