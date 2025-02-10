import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const ConfirmBudgetPopup = () => {
  return (
    <Drawer
      open={(type === "create" || type === "edit") && open}
      onOpenChange={setOpen}
    >
      <DrawerContent className="w-full flex flex-col items-center justify-center bg-gray-800 py-2 gap-y-4">
        <DrawerHeader className="w-full flex justify-between items-center border-b border-b-slate-500">
          <DrawerClose onClick={handleClose} className="">
            Cancel
          </DrawerClose>
          <DrawerTitle className="font-medium">
            {type === "create" ? "Add" : "Edit"} transaction
          </DrawerTitle>
          <p className="opacity-0">cancel</p>
        </DrawerHeader>
        <div className={`w-full flex flex-col bg-gray-700 gap-y-3 py-3 `}>
          <AmountInput amount={amount} setAmount={setAmount} />
          <CategorySelection category={category} setCategory={setCategory} />
          <NoteInput note={note} setNote={setNote} />
          <Calendar date={date} setDate={setDate} />
          <WalletSelection
            wallets={wallets}
            seletedWallet={wallet}
            setSeletedWallet={setWallet}
          />
        </div>
        <Button
          disabled={!amount || !category.name || !wallet || !date}
          className="bg-gray-700 hover:bg-sky-600 w-[80%] py-2 rounded-2xl text-sm"
          onClick={handleTransaction}
        >
          Save
        </Button>
        <div></div>
      </DrawerContent>{" "}
    </Drawer>
  );
};
