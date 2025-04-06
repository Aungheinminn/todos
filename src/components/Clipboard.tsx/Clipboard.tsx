import Image from "next/image";
import { Button } from "@/components/ui/button";
import copy from "@/assets/copy.svg";
import add2 from "@/assets/add_2.svg";

type ClipboardProps = {
  text: string;
  type: string;
  handleCopy: (text: string) => void;
  handleCreateRefId?: () => void;
};

const Clipboard: React.FC<ClipboardProps> = ({
  text,
  type,
  handleCopy,
  handleCreateRefId,
}) => {
  return (
    <div className="bg-gray-500 p-2 rounded-md">
      <p className="capitalize">{type}</p>
      <div className="w-full  flex justify-between items-center">
        <p className="text-slate-400">
          {text ? text : type === "email" ? "NA" : "(Empty) Create Ref ID"}
        </p>
        <Button
          onClick={() => handleCopy(text)}
          className={`p-0 w-8 h-8 ${text === "" && type === "refId" ? "hidden" : ""}`}
        >
          <Image className="object-cover w-5 h-5" src={copy} alt="copy" />
        </Button>
        <Button
          onClick={handleCreateRefId}
          className={`p-0 w-8 h-8 ${text === "" && type === "refId" ? "" : "hidden"}`}
        >
          <Image className="object-cover w-5 h-5" src={add2} alt="copy" />
        </Button>
      </div>
    </div>
  );
};

export default Clipboard;
