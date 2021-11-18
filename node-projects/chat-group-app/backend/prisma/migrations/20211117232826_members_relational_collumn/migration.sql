/*
  Warnings:

  - You are about to drop the `_Group admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Group admin" DROP CONSTRAINT "_Group admin_A_fkey";

-- DropForeignKey
ALTER TABLE "_Group admin" DROP CONSTRAINT "_Group admin_B_fkey";

-- DropForeignKey
ALTER TABLE "_Groups" DROP CONSTRAINT "_Groups_A_fkey";

-- DropForeignKey
ALTER TABLE "_Groups" DROP CONSTRAINT "_Groups_B_fkey";

-- DropTable
DROP TABLE "_Group admin";

-- DropTable
DROP TABLE "_Groups";

-- CreateTable
CREATE TABLE "ChannelOnUserMember" (
    "userID" INTEGER NOT NULL,
    "channelID" INTEGER NOT NULL,

    CONSTRAINT "ChannelOnUserMember_pkey" PRIMARY KEY ("userID","channelID")
);

-- AddForeignKey
ALTER TABLE "ChannelOnUserMember" ADD CONSTRAINT "ChannelOnUserMember_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelOnUserMember" ADD CONSTRAINT "ChannelOnUserMember_channelID_fkey" FOREIGN KEY ("channelID") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
