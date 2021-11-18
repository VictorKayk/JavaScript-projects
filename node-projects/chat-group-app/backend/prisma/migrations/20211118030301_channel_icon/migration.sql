-- CreateTable
CREATE TABLE "ChannelIcon" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT E'Channel icon',
    "url" TEXT DEFAULT E'channel_icon_default.jpg',
    "size" DOUBLE PRECISION DEFAULT 0,
    "channelID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChannelIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChannelIcon_channelID_key" ON "ChannelIcon"("channelID");

-- AddForeignKey
ALTER TABLE "ChannelIcon" ADD CONSTRAINT "ChannelIcon_channelID_fkey" FOREIGN KEY ("channelID") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
