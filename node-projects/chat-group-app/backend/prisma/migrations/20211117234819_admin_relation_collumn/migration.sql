-- CreateTable
CREATE TABLE "ChannelOnUserAdmin" (
    "userID" INTEGER NOT NULL,
    "channelID" INTEGER NOT NULL,

    CONSTRAINT "ChannelOnUserAdmin_pkey" PRIMARY KEY ("userID","channelID")
);

-- AddForeignKey
ALTER TABLE "ChannelOnUserAdmin" ADD CONSTRAINT "ChannelOnUserAdmin_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelOnUserAdmin" ADD CONSTRAINT "ChannelOnUserAdmin_channelID_fkey" FOREIGN KEY ("channelID") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
