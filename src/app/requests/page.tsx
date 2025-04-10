"use client";
import RequestsLoading from "@/app/requests/loading";
import RequestComponent from "@/components/RequestComponent/RequestComponent";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSharedWalletRequestsByUserId } from "@/lib/services/sharedWalletRequest.service";
import { useCurrentUserStore } from "@/lib/stores/userStore";
import { SharedWalletRequestType } from "@/lib/types/sharedWalletRequest.type";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

type RequestHeaderProps = {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
};

type RequestBodyProps = {
  type: string;
  requests: SharedWalletRequestType[];
  isLoading: boolean;
};

const RequestHeader: React.FC<RequestHeaderProps> = ({ toggle, setToggle }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-gray-900 rounded-lg  p-1 flex justify-center items-center gap-x-1">
        <Button
          onClick={() => setToggle("invitee_id")}
          className={`${toggle === "invitee_id" ? "bg-sky-500 hover:bg-sky-500" : "bg-transparent"} w-1/2 h-8 text-sm font-normal  rounded-md`}
        >
          Invites
        </Button>
        <Button
          onClick={() => setToggle("inviter_id")}
          className={`${toggle === "inviter_id" ? "bg-sky-500 hover:bg-sky-500" : "bg-transparent"} w-1/2 h-8 text-sm font-normal rounded-md`}
        >
          Requests
        </Button>
      </div>
    </div>
  );
};

const RequestBody: React.FC<RequestBodyProps> = ({
  type,
  requests,
  isLoading,
}) => {
  if (isLoading) return <RequestsLoading />;
  return (
    <ScrollArea style={{ height: "calc(100vh - 146px)" }}>
      <div className="flex flex-col gap-y-3 px-1">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <RequestComponent type={type} key={request._id} request={request} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <p className="text-sm text-gray-400">No requests</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

const Requests = () => {
  const { currentUser } = useCurrentUserStore((state) => state);
  const [toggle, setToggle] = useState<string>("invitee_id");

  const { data: requests, isLoading } = useQuery({
    queryKey: ["requests", toggle],
    queryFn: () =>
      getSharedWalletRequestsByUserId(currentUser?._id || "", toggle),
    enabled: !!currentUser,
  });
  return (
    <Suspense fallback={<RequestsLoading />}>
      <div className="w-full flex flex-col gap-y-3 pt-[55px]">
        <RequestHeader toggle={toggle} setToggle={setToggle} />
        <RequestBody type={toggle} requests={requests} isLoading={isLoading} />
      </div>
    </Suspense>
  );
};

export default Requests;
