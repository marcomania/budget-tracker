'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteCategory } from "@/lib/actions";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  trigger: ReactNode,
  category: Category
}

const DeleteCategoryDialog = ({trigger, category}: Props) => {
  const categoryIdentifier = `${category.name}-${category.type}`
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () =>  {
      toast.success("Category deleted succesfully", { id: categoryIdentifier });
      await queryClient.invalidateQueries({ 
        queryKey: ["categories"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", { id: categoryIdentifier })
    }

  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will be permanently delete you category</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            toast.loading("Deleting category...", { id: categoryIdentifier });
            deleteMutation.mutate({
              name: category.name,
              type: category.type as TransactionType,
            });
          }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> 
  )
}

export default DeleteCategoryDialog