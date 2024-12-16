import { CirclePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function InventoryLayout({
  title,
  isDialogOpen,
  handleDialogChange,
  handleAddClick,
  DialogComponent,
  SearchComponent,
  TableComponent,
  PaginationComponent,
  isLoading,
}) {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">{title}</h1>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500 sm:w-40 hover:bg-green-600 ml-1"
              onClick={handleAddClick}
              disabled={isLoading}
            >
              <CirclePlusIcon />
              <span>Add</span>
            </Button>
          </DialogTrigger>

          {DialogComponent}
        </Dialog>
      </div>
      <div className="relative w-full mb-2 flex items-center">
        {SearchComponent}
      </div>
      {TableComponent}
      <div className="mt-4">{PaginationComponent}</div>
    </div>
  );
}
