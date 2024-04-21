import React from "react";
import Link from "next/link";

import styles from "./Header.module.scss";

import {
  ADMIN_PANEL_PAGE_LINK,
  ANNOUNCEMENT_PAGE_LINK,
  CALENDAR_PAGE_LINK,
  DIARY_PAGE_LINK,
  JOURNAL_PAGE_LINK,
  PROFILE_PAGE_LINK,
  SETTINGS_PAGE_LINK,
} from "@/shared/api/links";
import { ButtonGroup } from "@/shared/components/ButtonGroup/ButtonGroup";
import AdminPanelIcon from "@/shared/icons/admin-panel.svg";
import AnnouncementIcon from "@/shared/icons/announcement.svg";
import CalendarIcon from "@/shared/icons/calendar.svg";
import DiaryIcon from "@/shared/icons/diary.svg";
import EmptyProfileIcon from "@/shared/icons/empty-profile.svg";
import HeaderIcon from "@/shared/icons/header.svg";
import JournalIcon from "@/shared/icons/journal.svg";
import SettingsIcon from "@/shared/icons/settings.svg";

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
              key: ANNOUNCEMENT_PAGE_LINK,
              children: (
                <Link href={ANNOUNCEMENT_PAGE_LINK}>
                  <AnnouncementIcon />
                </Link>
              ),
            },
            {
              key: DIARY_PAGE_LINK,
              children: (
                <Link href={DIARY_PAGE_LINK}>
                  <DiaryIcon />
                </Link>
              ),
            },
            {
              key: CALENDAR_PAGE_LINK,
              children: (
                <Link href={CALENDAR_PAGE_LINK}>
                  <CalendarIcon />
                </Link>
              ),
            },
            {
              key: JOURNAL_PAGE_LINK,
              children: (
                <Link href={JOURNAL_PAGE_LINK}>
                  <JournalIcon />
                </Link>
              ),
            },
            {
              key: SETTINGS_PAGE_LINK,
              children: (
                <Link href={SETTINGS_PAGE_LINK}>
                  <SettingsIcon />
                </Link>
              ),
            },
            {
              key: ADMIN_PANEL_PAGE_LINK,
              children: (
                <Link href={ADMIN_PANEL_PAGE_LINK}>
                  <AdminPanelIcon />
                </Link>
              ),
            },
            {
              key: PROFILE_PAGE_LINK,
              children: (
                <Link href={PROFILE_PAGE_LINK}>
                  <EmptyProfileIcon />
                </Link>
              ),
            },
          ]}
        />
      </nav>
    </header>
  );
};

export default Header;
