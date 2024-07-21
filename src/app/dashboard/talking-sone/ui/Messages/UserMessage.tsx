import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserMessageProps {
  text: React.ReactNode;
}

export default function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="flex items-start gap-4 mb-4 justify-end max-w-full sm:max-w-[800px]">
      <div className="grid gap-2 rounded-lg p-3 text-sm bg-primary text-white">
        <div>{text}</div>
      </div>
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.png" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
    </div>
  );
}
