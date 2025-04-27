"use client";

import { useEffect } from "react";
import { CreateServerModal } from "@/components/models/create-server-modal";
import { useModal } from "@/hooks/use-modal-store";
import { InviteModal } from "@/components/models/invite-modal";
import { EditServerModal } from "@/components/models/edit-server-modal";
import { MembersModal } from "@/components/models/members-modal";
import { CreateChannelModal } from "@/components/models/create-channel-model";

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


  return (
    <>
      {isCreateServerModalOpen && <CreateServerModal />}
      {isInviteModalOpen && <InviteModal />}
      {isEditServerModalOpen && <EditServerModal />}
      {isMembersModalOpen && <MembersModal />}
      {isCreateChannelModalOpen && <CreateChannelModal />}
    </>
  );
};
