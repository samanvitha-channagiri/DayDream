
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { EmojiPicker } from "./EmojiPicker";

const DiaryEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInsertEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your diary entry.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Entry Saved",
        description: "Your diary entry has been saved successfully.",
      });
      // In a real app, we would redirect to the entry page or clear the form
    }, 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's on your mind today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="border rounded-md overflow-hidden">
              <Textarea
                id="content"
                placeholder="Write your thoughts..."
                className="diary-editor min-h-[200px] border-none resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="flex justify-between items-center p-2 bg-muted/20 border-t">
                <EmojiPicker onSelect={handleInsertEmoji} />
                <div className="text-xs text-muted-foreground">
                  {content.length} characters
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="public" className="cursor-pointer">
              Make this entry public
            </Label>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {isPublic 
                ? "Public entries will be visible to everyone on the public feed. Others can like and comment on your entry."
                : "Private entries are only visible to you."}
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              className="bg-diary-purple hover:bg-diary-darkPurple"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Publish Entry"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiaryEditor;
