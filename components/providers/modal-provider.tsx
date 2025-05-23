"use client";

import { useEffect } from "react";
import { CreateServerModal } from "@/components/models/create-server-modal";
import { useModal } from "@/hooks/use-modal-store";
import { InviteModal } from "@/components/models/invite-modal";
import { EditServerModal } from "@/components/models/edit-server-modal";
import { MembersModal } from "@/components/models/members-modal";
import { CreateChannelModal } from "@/components/models/create-channel-model";
import { LeaveServerModal } from "@/components/models/leave-server-modal";
import { DeleteServerModal } from "@/components/models/delete-server-modal";
import { DeleteChannelModal } from "@/components/models/delete-channel-modal";
import { EditChannelModal } from "@/components/models/edit-channel-modal";
import { MessageFileModal } from "@/components/models/message-file-modal";

export const ModalProvider = () => {
  const { type, isOpen, mounted, setMounted } = useModal();

  useEffect(() => {
    setMounted();
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  const isCreateServerModalOpen = isOpen && type === "createServer";
  const isInviteModalOpen = isOpen && type === "invite";
  const isEditServerModalOpen = isOpen && type === "editServer";
  const isMembersModalOpen = isOpen && type === "members";
  const isCreateChannelModalOpen = isOpen && type === "createChannel";
  const isLeaveServerModalOpen = isOpen && type === "leaveServer";
  const isDeleteServerModalOpen = isOpen && type === "deleteServer";
  const isDeleteChannelModalOpen = isOpen && type === "deleteChannel";
  const isEditChannelModalOpen = isOpen && type === "editChannel";
  const isMessageFileModalOpen = isOpen && type === "messageFile";

  return (
    <>
      {isCreateServerModalOpen && <CreateServerModal />}
      {isInviteModalOpen && <InviteModal />}
      {isEditServerModalOpen && <EditServerModal />}
      {isMembersModalOpen && <MembersModal />}
      {isCreateChannelModalOpen && <CreateChannelModal />}
      {isLeaveServerModalOpen && <LeaveServerModal />}
      {isDeleteServerModalOpen && <DeleteServerModal />}
      {isDeleteChannelModalOpen && <DeleteChannelModal />}
      {isEditChannelModalOpen && <EditChannelModal />}
      {isMessageFileModalOpen && <MessageFileModal />}
    </>
  );
};
