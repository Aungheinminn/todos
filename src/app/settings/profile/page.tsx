"use client";

import { useCurrentUserStore } from "@/lib/stores/userStore";
import { Suspense } from "react";
import ProfileLoading from "@/app/settings/profile/loading";
import Clipboard from "@/components/Clipboard.tsx/Clipboard";
import { useUserMutation } from "@/lib/mutations/userMutation";
import { UserType } from "@/lib/types/user.type";

const Profile = () => {
  const { currentUser, updateCurrentUser } = useCurrentUserStore(
    (state) => state,
  );
  const { createRefIdMutation } = useUserMutation();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text || "");
  };

  const handleCreateRefId = () => {
    try {
      createRefIdMutation.mutate(currentUser?._id || "", {
        onSettled(data) {
          if (data.success) {
            updateCurrentUser({
              ...currentUser,
              refId: data.data,
            } as UserType);
          }
        },
      });
    } catch (e) {}
  };

  return (
    <Suspense fallback={<ProfileLoading />}>
      <div className="w-full flex justify-center items-start pt-[60px]">
        <div className="w-[95%] bg-gray-700 px-2 py-5 flex flex-col rounded-md gap-y-2">
          <p className="text-slate-400">User Details</p>
          <p className="text-[40px]">{currentUser?.username || "NA"}</p>
          <Clipboard
            text={currentUser?.email || ""}
            type="email"
            handleCopy={handleCopy}
          />
          <Clipboard
            text={currentUser?.refId || ""}
            type="refId"
            handleCopy={handleCopy}
            handleCreateRefId={handleCreateRefId}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Profile;
