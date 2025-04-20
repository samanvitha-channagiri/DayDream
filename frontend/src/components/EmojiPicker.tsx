
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const emojis = [
    "😀", "😂", "😍", "🥰", "😊", "😎", "🤔", "😢", "😭", "😡", 
    "👍", "👎", "❤️", "🔥", "✨", "🎉", "🤣", "😌", "🙏", "👋",
    "💯", "💪", "🤦‍♂️", "🤷‍♀️", "🙌", "👏", "🤝", "🌟", "💫", "🌈"
  ];

  const handleEmojiClick = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Smile className="h-4 w-4 mr-1" />
          <span className="text-xs">Add Emoji</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="grid grid-cols-6 gap-1">
          {emojis.map((emoji, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-diary-lightPurple"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
