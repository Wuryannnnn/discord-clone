import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: {
    params: Promise<ChannelIdPageProps["params"]>
}) => {
    const profile = await currentProfile();
    if(!profile){
        const {redirectToSignIn} = await auth();
        return redirectToSignIn();
    }
    
    const { serverId, channelId } = await params;
    
    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
    });

    if(!channel || !member){
        return redirect("/");
    }
    
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={channel.name}
                serverId={serverId}
                type="channel"
            />
            <ChatMessages 
                name={channel.name}
                member={member}
                chatId={channel.id}
                apiUrl="/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                    channelId: channel.id,
                    serverId: serverId,
                }}
                paramKey="channelId"
                paramValue={channel.id}
                type="channel"
            />
            <ChatInput 
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: serverId,
                }}
            />
        </div>
    )
}

export default ChannelIdPage;