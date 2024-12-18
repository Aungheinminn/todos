"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Image from "next/image";
import Link from "next/link";
import back from "@/assets/arrow_left_black.svg";
import { Button } from "@/components/ui/button";
import AccountSwitcher from "@/components/AccountSwitcher/AccountSwitcher";
import { useCurrentUserStore } from "@/lib/userStore";
import { getCurrentUser } from "@/lib/users.service";
import { UserType } from "@/lib/types/user.type";
import { getLinkedUsers } from "@/lib/linkedUsers.service";
import { AccountMutationProvider } from "./accountMutationProvider";
import reload from "@/assets/reload.svg";
import { SocketAddress } from "net";
import { Socket } from "@/lib/singleton/socketService";

const useLinkingInfo = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  return {
    open,
    setOpen,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  };
};

const AccountHeader = () => {
  return (
    <div className="relative z-50 w-full flex justify-start items-center gap-x-2 px-2 py-3 bg-gray-800">
      <Link
        href="/settings"
        className="flex justify-center items-center gap-x-2"
      >
        <Image src={back} alt="back" className="w-4 h-4" />
      </Link>
      <h3 className="text-white">Account</h3>
    </div>
  );
};

const Reload = ({
  isLiveNoti,
  setIsLiveNoti,
}: {
  isLiveNoti: boolean;
  setIsLiveNoti: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleReload = () => {
    setIsLiveNoti(!isLiveNoti);
    window.location.reload();
  };
  return (
    <div
      onClick={handleReload}
      className={`transition-all z-14 duration-500 ease-in-out cursor-pointer absolute w-full h-[20px] bg-sky-400 flex justify-center items-start rounded-b-2xl ${isLiveNoti ? "top-12" : "top-[-30px]"}`}
    >
      <p className="text-[8px] pt-[1px] pb-[1px] z-10">Updates Here</p>
      <div className="absolute top-[7px] w-6 h-6 flex justify-center items-center rounded-full bg-sky-400">
        <Image src={reload} alt="reload" className="h-4 w-4" />
      </div>
    </div>
  );
};

const AccountFooter = () => {
  return (
    <div className="w-full flex flex-col gap-y-1 px-2">
      <Button className="w-full bg-red-500">Delete Account</Button>
      <Button className="w-full bg-gray-600">Logout</Button>
    </div>
  );
};

const Account = () => {
  const socketIo = Socket.getInstance();
  useEffect(() => {
    socketIo.connect("account");
    socketIo.join(currentUser?._id || "");
    socketIo.getLinkingStatus((data: any) => {
      if (data) {
        setIsLiveNoti(true);
      }
    });
  });
  const queryClient = useQueryClient();
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );
  const { createMutation, declineMutation, acceptMutation } =
    AccountMutationProvider();
  const [isLiveNoti, setIsLiveNoti] = useState<boolean>(false);

  const {
    open,
    setOpen,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  } = useLinkingInfo();
  useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      updateCurrentUser(data.data.currentUser);
    },
  });

  const { data: linkedUsers } = useQuery({
    queryKey: ["linkedUsers"],
    queryFn: () => getLinkedUsers(currentUser?._id || ""),
    enabled: !!currentUser?._id,
  });

  const handleLinking = async (id: string, email: string, password: string) => {
    try {
      createMutation.mutate(
        { id: id, email: email, password: password },
        {
          onError: (error: any) => {
            console.log(error);
          },
          onSuccess: async (data) => {
            console.log(data);
            if (data.success) {
              await queryClient.cancelQueries("linkedUsers");

              const previousItems = queryClient.getQueryData("linkedUsers");

              queryClient.setQueryData("linkedUsers", (old: any) =>
                old ? [...old, data.data] : [],
              );

              setEmail("");
              setPassword("");
              setOpen(false);

              return { previousItems };
            } else {
              setErrorMessage(data.message);
            }
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptLinking = async (
    currentUserId: string,
    primaryUserId: string,
    linkedUserId: string,
    newStatus: string,
  ) => {
    console.log(currentUserId, primaryUserId, linkedUserId, newStatus);
    try {
      acceptMutation.mutate(
        {
          currentUserId: currentUserId,
          primaryUserId: primaryUserId,
          linkedUserId: linkedUserId,
          newStatus: newStatus,
        },
        {
          onError: (error: any) => {
            console.log(error);
          },
          onSuccess: async (data) => {
            if (data.success) {
              await queryClient.cancelQueries("linkedUsers");

              const previousItems = queryClient.getQueryData("linkedUsers");

              queryClient.setQueryData("linkedUsers", (old: any) =>
                old
                  ? old.map((item: any) =>
                      item._id === data.data._id ? data.data : item,
                    )
                  : [],
              );

              setEmail("");
              setPassword("");
              setOpen(false);

              return { previousItems };
            } else {
              setErrorMessage(data.message);
            }
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineLinking = async (
    currentUserId: string,
    primaryUserId: string,
    linkedUserId: string,
    declinedBy: string,
  ) => {
    try {
      console.log(currentUserId, primaryUserId, linkedUserId, declinedBy);
      declineMutation.mutate(
        {
          currentUserId: currentUserId,
          primaryUserId: primaryUserId,
          linkedUserId: linkedUserId,
          declinedBy: declinedBy,
        },
        {
          onError: (error: any) => {
            console.log(error);
          },
          onSuccess: async (data) => {
            if (data.success) {
              await queryClient.cancelQueries("linkedUsers");

              const previousItems = queryClient.getQueryData("linkedUsers");

              queryClient.setQueryData("linkedUsers", (old: any) =>
                old
                  ? old.filter((item: any) => item._id !== data.data._id)
                  : [],
              );

              return { previousItems };
            } else {
              setErrorMessage(data.message);
            }
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log("currentUser", currentUser);
  return (
    <div className="w-full relative">
      <AccountHeader />
      <Reload isLiveNoti={isLiveNoti} setIsLiveNoti={setIsLiveNoti} />
      <AccountSwitcher
        open={open}
        setOpen={setOpen}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleLinking={handleLinking}
        handleAcceptLinking={handleAcceptLinking}
        handleDeclineLinking={handleDeclineLinking}
        currentUser={currentUser}
        addedUsers={linkedUsers}
      />
      <AccountFooter />
    </div>
  );
};
export default Account;
