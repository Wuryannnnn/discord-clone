"use client";

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const DeleteServerModal = () => {
    const {isOpen, onOpen ,onClose, type, data} = useModal();
    const router = useRouter();

    const {server} = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/servers/${server?.id}`);

            onClose();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Dialog open={isOpen && type === "deleteServer"} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
          
                        <DialogTitle className="text-2xl text-center">
                            <VisuallyHidden>
                                Delete Server
                            </VisuallyHidden>
                        </DialogTitle>
               
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button variant="ghost" disabled={isLoading} onClick={onClose} className="text-xs text-zinc-500">
                            Cancel
                        </Button>
                        <Button variant="primary" disabled={isLoading} onClick={onClick} >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}