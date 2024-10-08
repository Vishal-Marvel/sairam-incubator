import { useSession } from "@/components/providers/context/SessionContext";
import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import qs from "query-string";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

const DeleteMOUData = () => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();
  const { token, isTokenExpired } = useSession();
  const isModalOpen = isOpen && type === "deleteMOUData";
  const { mou } = data;
  const onSubmit = async () => {
    try {
      if (!token && isTokenExpired()) {
        toast("Sesstion Expired");
        handleClose();
      }
      const url = qs.stringifyUrl({
        url: "/api/components/mou",
        query: {
          id: mou?.id,
        },
      });

      const response = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        // router.refresh();
        onClose();
      }
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data) {
        toast(
          <>
            <AlertCircle />
            {error.response.data}
          </>
        );
      }
    }
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete file and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMOUData;
