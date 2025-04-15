import { Button } from "@/components/ui/button";
import { useSharedWalletRequestMutation } from "@/lib/mutations/sharedWalletRequestMutation";
import { SharedWalletRequestResponseType } from "@/lib/types/sharedWalletRequest.type";
import Lottie from "react-lottie-player";
import loadingAnimation from "@/lottle/loading.json";

type RequestComponent = {
  request: SharedWalletRequestResponseType;
  type: string;
};

type RequestComponentProps = {
  request: SharedWalletRequestResponseType;
  handleDelete: () => void;
  isLoading: boolean;
};

type InviteComponentProps = {
  request: SharedWalletRequestResponseType;
  handleAccept: () => void;
  handleDecline: () => void;
  isAcceptLoading: boolean;
  isDeclineLoading: boolean;
};

const MutateLoading = () => {
  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      play
      style={{
        width: "78px",
        height: "40px",
      }}
    />
  );
};

const Invite: React.FC<InviteComponentProps> = ({
  request,
  handleAccept,
  handleDecline,
  isAcceptLoading,
  isDeclineLoading,
}) => {
  return (
    <div className="flex items-start flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
            <p>{request.wallet_data.wallet_name.slice(0, 2).toUpperCase()}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Invitation From {request.wallet_data.wallet_name}
          </h3>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="ml-16">
          <p className="text-sm text-gray-600">
            From {request.inviter_data.username || request.inviter_data.email}
          </p>
          <div className="mt-2 flex items-center">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                request.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : request.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {request.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div
          className={`flex space-x-2 ${request.status !== "pending" && "hidden"}`}
        >
          <button
            onClick={handleAccept}
            disabled={isAcceptLoading}
            className="w-[78px] h-[40px] flex items-center justify-center text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 "
          >
            {isAcceptLoading ? <MutateLoading /> : "Accept"}
          </button>
          <button
            onClick={handleDecline}
            disabled={isDeclineLoading}
            className="w-[78px] h-[40px] flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {isDeclineLoading ? <MutateLoading /> : "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Request: React.FC<RequestComponentProps> = ({
  request,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className=" flex items-start flex-col p-4 gap-x-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
            <p>{request.wallet_data.wallet_name.slice(0, 2).toUpperCase()}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {request.wallet_data.wallet_name} Wallet
          </h3>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="ml-16">
          <p className="text-sm text-gray-600">
            Invitation sent to{" "}
            {request.invitee_data.username || request.invitee_data.email}
          </p>
          <div className="mt-2 flex items-center">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                request.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : request.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {request.status.toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={`w-[78px] h-[40px] flex items-center justify-center text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 ${request.status !== "pending" && "hidden"}`}
        >
          {isLoading ? <MutateLoading /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

const RequestComponent = ({ request, type }: RequestComponent) => {
  const { acceptMutation, declineMutation, deleteMutation } =
    useSharedWalletRequestMutation();

  const handleAccept = () => {
    acceptMutation.mutate({
      id: request.invitee_data._id,
      walletId: request.wallet_data._id,
    });
  };
  const handleDecline = () => {
    declineMutation.mutate(request._id || "");
  };

  const handleDelete = () => {
    deleteMutation.mutate(request._id || "");
  };

  return (
    <div className="w-full">
      {type === "invitee_id" && (
        <Invite
          request={request}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
          isAcceptLoading={acceptMutation.isPending}
          isDeclineLoading={declineMutation.isPending}
        />
      )}
      {type === "inviter_id" && (
        <Request
          request={request}
          handleDelete={handleDelete}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default RequestComponent;
