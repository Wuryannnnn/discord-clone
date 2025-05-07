import { db } from "@/lib/db";

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
  let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

  if (conversation) {
    return conversation;
  }

  return createNewConversation(memberOneId, memberTwoId);
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
    //@ts-ignore
  const conversation = await db.conversation.findFirst({
    where: {
      AND: [{ memberOneId }, { memberTwoId }],
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo: {
        include: {
          profile: true,
        },
      },
    },
  });

  return conversation;
};

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    //@ts-ignore
    const newConversation = await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    return newConversation;
  } catch (error) {
    return null;
  }
};
