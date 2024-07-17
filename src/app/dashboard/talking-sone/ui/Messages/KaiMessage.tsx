import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface KaiMessageProps {
  text: React.ReactNode;
}

export default function KaiMessage({ text }: KaiMessageProps) {
  return (
    <div className="flex items-start gap-4 mb-4 justify-start">
      <Avatar className="h-14 w-14">
        <AvatarImage src="/koala_profile.jpg" />
        <AvatarFallback>KA</AvatarFallback>
      </Avatar>
      <div className="grid gap-2 rounded-lg p-3 text-sm max-w-[800px] bg-muted dark:bg-[#27272a] text-black dark:text-white">
        <div>{text}</div>
      </div>
    </div>
  );
}
