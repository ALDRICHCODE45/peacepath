import { UserIcon } from "@/components/meditation/icons/DasboardIcons";
import { Avatar } from "@/components/ui/avatar";

interface UserMessageProps {
  text: React.ReactNode;
}

export default function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="flex items-start gap-4 mb-4 justify-end ">
      <div className="grid gap-2 rounded-lg p-3 text-sm bg-primary text-white  sm:max-w-[800px]">
        <div>{text}</div>
      </div>
      <Avatar className="md:h-10 md:w-10 md:block hidden">
        <div className="rounded-lg flex items-center justify-center">
          <UserIcon className="text-black dark:text-white" />
        </div>
      </Avatar>
    </div>
  );
}
