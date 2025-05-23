"use client";

import qs from "query-string"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerwithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent,DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}

export const MembersModal = () => {

    const router = useRouter();
    const {isOpen, onOpen ,onClose, type, data} = useModal();

    const [loadingId, setLoadingId] = useState("");

    const {server} = data as { server: ServerwithMembersWithProfiles};


    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query:{
                    serverId: server?.id,
                }
            });

            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", {server: response.data});
        }catch(error){
            console.log(error);
        }finally{
            setLoadingId("");
        }
    }
    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query:{
                    serverId: server?.id,
                }
            });

            const response = await axios.patch(url, {role});
            router.refresh();
            onOpen("members", {server: response.data});
        }catch(error){
            console.log(error);
        }finally{
            setLoadingId("");
        }
    }


    return (
        <Dialog open={isOpen && type === "members"} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    
                        <DialogTitle className="text-2xl text-center">
                            <VisuallyHidden>
                                Manage Members
                            </VisuallyHidden>
                        </DialogTitle>
                    
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-zinc-500"/>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center">
                                                        <ShieldQuestion className="w-4 h-4 mr-2"/>
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem className="flex items-center gap-x-2" onClick={() => {
                                                                onRoleChange(member.id, "GUEST")
                                                            }}>
                                                                <Shield className="h-4 w-4 mr-2"/>
                                                                Guest
                                                                {member.role === "GUEST" && (
                                                                    <Check className="h-4 w-4 mr-2 ml-auto"/>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex items-center gap-x-2" onClick={() => {
                                                                onRoleChange(member.id, "MODERATOR")
                                                            }}>
                                                                <Shield className="h-4 w-4 mr-2"/>
                                                                Moderator
                                                                {member.role === "MODERATOR" && (
                                                                    <Check className="h-4 w-4 mr-2 ml-auto"/>
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => {
                                                    onKick(member.id)
                                                }} className="flex items-center">
                                                    <Gavel className="w-4 h-4 mr-2"/>
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}