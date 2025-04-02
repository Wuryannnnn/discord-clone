import { currentProfile } from "@/lib/current-profile";
import {auth} from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {ServerSidebar} from "@/components/server/server-sidebar"

const ServerIdLayout = async ({
    children,
    params,
} : {children: React.ReactNode; params: Promise<{ serverId: string }>;}) => {
    const { redirectToSignIn } = await auth()
    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();
    const { serverId } = await params;
    const server = await db.server.findUnique({
        where:{
            id: serverId,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(!server){
        return redirect('/');
    }

    return (
        <div className="h-full">
            <div className="md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId = {(await params).serverId} />
            </div>
            <main className="h-full md:pl-60">
            {children}
            </main>
        </div>
    )
}

export default ServerIdLayout;