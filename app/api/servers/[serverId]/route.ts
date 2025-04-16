import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ serverId: string }> }
){
    try{
        const { serverId } = await params;
        const profile = await currentProfile();
        const {name, imageUrl} = await req.json();
        if(!profile){
            return new NextResponse("Unauthorized", {status : 401});
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                profileId: profile.id,
            },
            data:{
                name,
                imageUrl,
            }
        })

        return NextResponse.json(server);
    }catch(error){
        console.log("[SERVER_ID_PATCH", error);
        return new NextResponse("Internal Error", {status : 500});
    }
}