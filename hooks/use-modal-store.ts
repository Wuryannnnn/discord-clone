import { Channel, ChannelType, Server } from "@prisma/client";
import {create} from "zustand"

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile";

interface ModalData {
    server? : Server;
    channelType? : ChannelType;
    channel? : Channel;
    apiUrl? : string;
    query? : Record<string, any>;
}

interface ModalStore {
    mounted: boolean;
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
    setMounted: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    mounted: false,
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
    setMounted: () => set({ mounted: true })
}));