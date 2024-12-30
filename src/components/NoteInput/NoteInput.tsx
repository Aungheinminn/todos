import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import chevronRight from "@/assets/cheron_right.svg";
import noteIcon from "@/assets/note.svg";

type NoteInputProps = {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
};
const NoteInput: React.FC<NoteInputProps> = ({ note, setNote }) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        <Image className="w-6 h-6 mb-3" src={noteIcon} alt="note" />
        <div className="w-full flex justify-between items-center gap-x-2 border-b border-b-slate-500 ml-1 pb-3">
          <p className="text-base">{note || "Note"}</p>

          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose className="">Back</DrawerClose>
          <DrawerTitle className="font-medium">Note</DrawerTitle>
          <p className="opacity-0">Back</p>
        </DrawerHeader>
        <textarea
          placeholder="Enter note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-full bg-gray-800 text-slate-500 outline-0 px-4 py-2"
        ></textarea>
      </DrawerContent>
    </Drawer>
  );
};

export default NoteInput;
