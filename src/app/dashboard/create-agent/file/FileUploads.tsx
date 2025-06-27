"use client";
import { FileText, Ellipsis } from "lucide-react";
import { useUploader } from "@/components/upload/uploader-provider";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FileUploads = () => {
  const { fileStates, isUploading, removeFile } = useUploader();
  console.log(fileStates);

  console.log("isUploading", isUploading);
  // const t = useSonner();
  // console.log(t);
  if (isUploading) {
    toast.loading("Uploading file..");
  }

  if (fileStates.length === 0) {
    return <></>;
  }

  const handleDeleteFile = (file: string) => {
    console.log(file);
    // toast.loading("Deleting file..");
    removeFile(file);
  };

  return (
    <>
      <div className="mt-10">
        <h3 className="font-semibold text-lg text-zinc-700 mb-4 ">
          File Sources
        </h3>
        <hr />
        {fileStates.map((file) => (
          <div
            key={file.key}
            className="mt-4 flex justify-between items-center p-2 font-semibold text-zinc-700"
          >
            <p className="flex gap-2">
              <FileText />
              {file.file.name}
            </p>
            <Popover>
              <PopoverTrigger>
                <Ellipsis />
              </PopoverTrigger>
              <PopoverContent className="p-1 w-fit rounded-lg">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"}>Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteFile(file.key)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </>
  );
};

export default FileUploads;
