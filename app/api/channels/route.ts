import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";

import { db } from "@/lib/db";

export async function POST(req: Request) {
    try{
        const {searchParams} = new URL(req.url);
        const serverId = searchParams.get("serverId");
        const {name, type} = await req.json();
        
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        if (!serverId) {
            return new NextResponse("Server ID missing", {status: 400});
        }

        if (name === "general") {
            return new NextResponse("Name cannot be general", {status: 400});
        }
        
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type
                    }
                }
            }
        }); 

        return NextResponse.json(server);
        
    }
    catch(error){
        console.log("[CHANNELS_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}