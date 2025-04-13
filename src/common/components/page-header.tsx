import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageCircleIcon, WalletCards } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader() {
  return (
    <div className="bg-white border-b">
      <div className="container px-4 py-6 flex items-center justify-end gap-3">
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {description && <p className="mt-1 text-gray-500">{description}</p>}
          </div>
          {actions && <div className="mt-4 md:mt-0">{actions}</div>}
        </div> */}
        <WalletCards className="h-6 w-6 text-gray-500 cursor-pointer" />
        <Avatar>
          <AvatarImage src="" alt="User Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
