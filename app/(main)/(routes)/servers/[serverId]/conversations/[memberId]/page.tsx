import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";


const MemberIdPage = async ({params}: {params : Promise<{serverId: string, memberId: string}>}) => {
    const {serverId, memberId} = await params;

    const profile = await currentProfile();

    if (!profile) {
        const {redirectToSignIn} = await auth();
        return redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        }
    })

    if (!currentMember) {
        return redirect("/");
    }
    
    const conversation = await getOrCreateConversation(currentMember.id, memberId);

    if (!conversation) {
        return redirect(`/servers/${serverId}`);
    }

    const {memberOne, memberTwo} = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={serverId}
                type="conversation"
            />
        </div>
    )
}

export default MemberIdPage;