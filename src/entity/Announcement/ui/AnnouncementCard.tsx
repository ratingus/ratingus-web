import React from "react";

import { getDateTime } from "../helpers";

import styles from "./AnnouncementCard.module.scss";

import { Announcement } from "@/entity/Announcement/model";
import { useDeleteAnnouncementMutation } from "@/entity/Announcement/query";
import { RoleEnum } from "@/entity/User/model";
import Button from "@/shared/components/Button/Button";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";
import { useUser } from "@/shared/hooks/useUser";
import ViewIcon from "@/shared/icons/view.svg";

type AnnouncementCardProps = Announcement;

const AnnouncementCard = ({
  id,
  creator,
  classes,
  content,
  createDate,
  name,
  views,
}: AnnouncementCardProps) => {
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();
  const { userRoleId, role } = useUser();

  const handleDelete = () => {
    deleteAnnouncement({ id });
  };
  return (
    <article className={styles.base}>
      <header className={styles.header}>
        <div>
          <Typography color="textHelper" component="div">
            {creator.fio}
          </Typography>
          <Typography color="textHelper" component="div">
            {getDateTime(createDate)}
          </Typography>
        </div>
        <div>
          <div className={styles.classes}>
            {classes.map(({ id, name: className }) => (
              <Label key={id}>{className}</Label>
            ))}
          </div>
          <Typography color="textHelper" component="div">
            {views} <ViewIcon />
          </Typography>
        </div>
      </header>
      <Typography variant="h2" component="div">
        {name}
      </Typography>
      {content && (
        <Typography className={styles.content} variant="body" component="div">
          {content}
        </Typography>
      )}
      {((role === RoleEnum.TEACHER && creator.id === userRoleId) ||
        role === RoleEnum.LOCAL_ADMIN ||
        role === RoleEnum.MANAGER) && (
        <div className={styles.deleteButton}>
          <Button variant="error" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      )}
    </article>
  );
};

export default AnnouncementCard;
