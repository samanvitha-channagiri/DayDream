
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";

export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  isPublic: boolean;
  likes: number;
  comments: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
};

interface DiaryCardProps {
  entry: DiaryEntry;
}

const DiaryCard = ({ entry }: DiaryCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(entry.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
    // In a real app, we would also send this to the server
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  return (
    <Card className="w-full mb-4 overflow-hidden animate-fadeIn hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={entry.author.avatar} />
              <AvatarFallback>{entry.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/profile/${entry.author.id}`} className="font-medium hover:underline">
                {entry.author.name}
              </Link>
              <p className="text-xs text-muted-foreground">{entry.date}</p>
            </div>
          </div>
          {entry.isPublic && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              Public
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Link to={`/entry/${entry.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-diary-purple transition-colors">
            {entry.title}
          </h3>
          <div className="text-muted-foreground diary-content">
            {truncateContent(entry.content)}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 flex items-center ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className="h-4 w-4 mr-1" fill={liked ? "currentColor" : "none"} />
            {likeCount}
          </Button>
          <Link to={`/entry/${entry.id}#comments`} className="flex items-center px-2">
            <MessageCircle className="h-4 w-4 mr-1" />
            {entry.comments}
          </Link>
        </div>
        <Button variant="ghost" size="sm" className="px-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiaryCard;
