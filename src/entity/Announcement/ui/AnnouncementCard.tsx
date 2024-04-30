import React from "react";

import { getDateTime } from "../helpers";

import styles from "./AnnouncementCard.module.scss";

import { Announcement } from "@/entity/Announcement/model";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";
import ViewIcon from "@/shared/icons/view.svg";

type AnnouncementCardProps = Announcement;

const AnnouncementCard = ({
  authorFio,
  classes,
  content,
  date,
  title,
  views,
}: AnnouncementCardProps) => {
  return (
    <article className={styles.base}>
      <header className={styles.header}>
        <div>
          <Typography color="textHelper" component="div">
            {authorFio}
          </Typography>
          <Typography color="textHelper" component="div">
            {getDateTime(date)}
          </Typography>
        </div>
        <div>
          <div className={styles.classes}>
            {classes.map((className) => (
              <Label key={className}>{className}</Label>
            ))}
          </div>
          <Typography color="textHelper" component="div">
            {views} <ViewIcon />
          </Typography>
        </div>
      </header>
      <Typography variant="h2" component="div">
        {title}
      </Typography>
      {content && (
        <Typography className={styles.content} variant="body" component="div">
          {content}
        </Typography>
      )}
    </article>
  );
};

export default AnnouncementCard;
