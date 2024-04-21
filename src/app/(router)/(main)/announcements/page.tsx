"use client";
import { useState } from "react";

import styles from "./page.module.scss";

import { getDateTime } from "@/entity/Announcement/helpers";
import { useGetAnnouncementsQuery } from "@/entity/Announcement/query";
import { selectAnnouncementMode } from "@/entity/Announcement/store";
import AnnouncementCard from "@/entity/Announcement/ui/AnnouncementCard";
import AnnouncementSwitch from "@/feature/AnnouncementSwitch/ui/AnnouncementSwitch";
import CreateAnnouncement from "@/feature/CreateAnnouncement/ui/CreateAnnouncement";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppSelector } from "@/shared/hooks/rtk";

export default function Announcements() {
  const selectedOption = useAppSelector(selectAnnouncementMode);
  const [classId, setClassId] = useState<number>();
  const { data: announcements = [], isLoading } = useGetAnnouncementsQuery(
    { classId },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <PageContainer isPanel className={styles.base}>
      <Typography className={styles.tabs} variant="h3" component="div">
        <AnnouncementSwitch isLoading={isLoading} setClassId={setClassId} />
      </Typography>
      <div className={styles.announcements}>
        {selectedOption.value === "add" ? (
          <CreateAnnouncement />
        ) : (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={
                announcement.authorFio +
                announcement.title +
                getDateTime(announcement.date)
              }
              {...announcement}
            />
          ))
        )}
      </div>
    </PageContainer>
  );
}
