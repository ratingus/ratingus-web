import React from "react";
import Link from "next/link";

import styles from "./Header.module.scss";

import {
  ANNOUNCEMENT_PAGE_LINK,
  CALENDAR_PAGE_LINK,
  DIARY_PAGE_LINK,
  JOURNAL_PAGE_LINK,
  PROFILE_PAGE_LINK,
} from "@/shared/api/links";
import { ButtonGroup } from "@/shared/components/ButtonGroup/ButtonGroup";
import AnnouncementIcon from "@/shared/icons/announcement.svg";
import CalendarIcon from "@/shared/icons/calendar.svg";
import DiaryIcon from "@/shared/icons/diary.svg";
import EmptyProfileIcon from "@/shared/icons/empty-profile.svg";
import HeaderIcon from "@/shared/icons/header.svg";
import JournalIcon from "@/shared/icons/journal.svg";

const Header = () => {
  return (
    <header className={styles.base}>
      <Link href="/" className={styles.iconWrapper}>
        <HeaderIcon className={styles.icon} />
      </Link>
      <nav className={styles.nav}>
        <ButtonGroup
          buttons={[
            {
              link: ANNOUNCEMENT_PAGE_LINK,
              children: <AnnouncementIcon />,
            },
            {
              link: DIARY_PAGE_LINK,
              children: <DiaryIcon />,
            },
            {
              link: CALENDAR_PAGE_LINK,
              children: <CalendarIcon />,
            },
            {
              link: JOURNAL_PAGE_LINK,
              children: <JournalIcon />,
            },
            // {
            //   link: SETTINGS_PAGE_LINK,
            //   children: <SettingsIcon />,
            // },
            // {
            //   link: ADMIN_PANEL_PAGE_LINK,
            //   children: <AdminPanelIcon />,
            // },
            {
              link: PROFILE_PAGE_LINK,
              children: <EmptyProfileIcon />,
            },
          ]}
        />
      </nav>
    </header>
  );
};

export default Header;
