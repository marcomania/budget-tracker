'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteTransaction } from "@/lib/actions";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  transactionId: string;
}

const DeleteTransactionDialog = ({ open, setOpen, transactionId }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async () =>  {
      toast.success("Transaction deleted succesfully", { id: transactionId });
      await queryClient.invalidateQueries({ 
        queryKey: ["transactions"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", { id: transactionId })
    }
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will be permanently delete you transaction</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            toast.loading("Deleting transaction...", { id: transactionId });
            deleteMutation.mutate(transactionId);
          }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> 
  )
}

export default DeleteTransactionDialog