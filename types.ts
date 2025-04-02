import { Server, Member,Profile } from "@prisma/client"
export type ServerwithMembersWithProfiles = Server & {
    members: (Member & {profile: Profile})[]
};