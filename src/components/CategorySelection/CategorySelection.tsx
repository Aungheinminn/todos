import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import chevronRight from "@/assets/cheron_right.svg";
import { ScrollArea } from "../ui/scroll-area";
import { Categories } from "@/constants/categories";

type CategorySelectionProps = {
  category: {
    id: number;
    name: string;
    icon: string;
  };
  setCategory: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      icon: string;
    }>
  >;
};

const CategorySelection: React.FC<CategorySelectionProps> = ({
  category,
  setCategory,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full flex justify-between items-center gap-x-8 py-1 px-4">
        {category.icon ? (
          <Image className="w-8 h-7 mb-3" src={category.icon} alt="category" />
        ) : (
          <Skeleton className="w-8 h-7 mb-3 rounded-full" />
        )}
        <div className="w-full flex justify-between items-center border-b border-b-slate-500 pb-3">
          <p className="text-base">{category.name || "Select Category"}</p>

          <Image className="w-4 h-4" src={chevronRight} alt="chevron right" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-2/3 bg-gray-800">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose className="">Back</DrawerClose>
          <DrawerTitle className="font-medium">Select Category</DrawerTitle>
          <p className="opacity-0">Back</p>
        </DrawerHeader>
        <ScrollArea>
          <div className="w-full h-full flex flex-col gap-y-2 bg-gray-700">
            <div className=""></div>
            {Categories.map((category) => (
              <DrawerClose
                key={category.id}
                className="flex justify-start items-center gap-x-2 bg-gray-800 p-2 px-3"
                onClick={() => setCategory(category)}
              >
                <Image
                  className="w-8 h-8"
                  src={category.icon}
                  alt={category.name}
                />
                <p className="text-sm">{category.name}</p>
              </DrawerClose>
            ))}
            <div className=""></div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default CategorySelection;
