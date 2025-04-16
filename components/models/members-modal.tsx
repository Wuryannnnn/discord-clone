"use client";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerwithMembersWithProfiles } from "@/types";



export const MembersModal = () => {
    const {isOpen, onOpen ,onClose, type, data} = useModal();

    const {server} = data as { server: ServerwithMembersWithProfiles};




    return (
        <Dialog open={isOpen && type === "members"} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    Hello Members
                </div>
            </DialogContent>
        </Dialog>
    )
}