import { Server, Member,Profile } from "@prisma/client"
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export type ServerwithMembersWithProfiles = Server & {
    members: (Member & {profile: Profile})[]
};

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIO;
        };
    };
};

