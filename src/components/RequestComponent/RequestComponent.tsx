import { Button } from "@/components/ui/button";
import { SharedWalletRequestType } from "@/lib/types/sharedWalletRequest.type";

type RequestComponent = {
  request: SharedWalletRequestType;
  type: string;
};

const Invite = () => {
  return (
    <div className="h-full w-full flex justify-between items-center">
      <div className="h-full flex flex-col justify-start items-start">
        <p className="text-base">Shared wallet Invitation from This</p>
        <span className="text-sm opacity-90">By This</span>
        <span className="mt-5 text-sm">status</span>
      </div>
      <div className="h-full flex justify-end items-end gap-x-1">
        <Button className="bg-sky-500">Accept</Button>
        <Button className="bg-red-500">Decline</Button>
      </div>
    </div>
  );
};

const Request = () => {
  return (
    <div className="h-full w-full flex justify-between items-center">
      <div className="h-full flex flex-col justify-start items-start">
        <p className="text-base">Shared wallet Request to This</p>
        <span className="text-sm opacity-90">By This</span>
        <span className="mt-5 text-sm">status</span>
      </div>
      <div className="h-full flex justify-end items-end gap-x-1">
        <Button className="bg-red-500">Delete</Button>
      </div>
    </div>
  );
};

const RequestComponent = ({ request, type }: RequestComponent) => {
  return (
    <div className="h-24 bg-slate-500 px-2 py-1 rounded-md">
	{type === "invitee_id" && <Invite />}
			{type === "inviter_id" && <Request />}
    </div>
  );
};

export default RequestComponent;
