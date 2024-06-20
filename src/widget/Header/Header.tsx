"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import styles from "./Header.module.scss";

import {
  ADMIN_PANEL_PAGE_LINK,
  ANNOUNCEMENT_PAGE_LINK,
  CALENDAR_PAGE_LINK,
  DIARY_PAGE_LINK,
  JOURNAL_PAGE_LINK,
  LOGIN_PAGE_LINK,
  PROFILE_PAGE_LINK,
  SETTINGS_PAGE_LINK,
} from "@/shared/api/links";
import Button, { ButtonProps } from "@/shared/components/Button/Button";
import { ButtonGroup } from "@/shared/components/ButtonGroup/ButtonGroup";
import { Typography } from "@/shared/components/Typography/Typography";
import AdminPanelIcon from "@/shared/icons/admin-panel.svg";
import AnnouncementIcon from "@/shared/icons/announcement.svg";
import CalendarIcon from "@/shared/icons/calendar.svg";
import DiaryIcon from "@/shared/icons/diary.svg";
import EmptyProfileIcon from "@/shared/icons/empty-profile.svg";
import HeaderIcon from "@/shared/icons/header.svg";
import JournalIcon from "@/shared/icons/journal.svg";
import SettingsIcon from "@/shared/icons/settings.svg";

const logoutButton = {
  link: LOGIN_PAGE_LINK,
  children: (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="important"
    >
      Выйти
    </Button>
  ),
};
const adminButton = {
  link: ADMIN_PANEL_PAGE_LINK,
  children: (
    <div>
      <AdminPanelIcon />
      <Typography variant="caption">Заявки</Typography>
    </div>
  ),
};
const profileButton = {
  link: PROFILE_PAGE_LINK,
  children: (
    <div>
      <EmptyProfileIcon />
      <Typography variant="caption">Профиль</Typography>
    </div>
  ),
};
const announcementsButton = {
  link: ANNOUNCEMENT_PAGE_LINK,
  children: (
    <div>
      <AnnouncementIcon />
      <Typography variant="caption">Объявления</Typography>
    </div>
  ),
};
const calendarButton = {
  link: CALENDAR_PAGE_LINK,
  children: (
    <div>
      <CalendarIcon />
      <Typography variant="caption">Расписание</Typography>
    </div>
  ),
};
const journalButton = {
  link: JOURNAL_PAGE_LINK,
  children: (
    <div>
      <JournalIcon />
      <Typography variant="caption">Журнал</Typography>
    </div>
  ),
};

const Header = () => {
  const { data: session, status } = useSession();

  const buttonsHeader = (): (ButtonProps | null)[] => {
    if (status !== "authenticated" || !session) {
      return [
        {
          link: LOGIN_PAGE_LINK,
          children: <Button variant="important">Войти</Button>,
        },
      ];
    }

    if (session.role === "GUEST") {
      return [
        session.is_admin ? adminButton : null,
        profileButton,
        logoutButton,
      ];
    }
    if (session.role === "STUDENT") {
      return [
        announcementsButton,
        {
          link: DIARY_PAGE_LINK,
          children: (
            <div>
              <DiaryIcon />
              <Typography variant="caption">Дневник</Typography>
            </div>
          ),
        },
        calendarButton,
        session.is_admin ? adminButton : null,
        profileButton,
        logoutButton,
      ];
    }
    if (session.role === "TEACHER") {
      return [
        announcementsButton,
        calendarButton,
        journalButton,
        session.is_admin ? adminButton : null,
        profileButton,
        logoutButton,
      ];
    }
    if (session.role === "LOCAL_ADMIN") {
      return [
        announcementsButton,
        calendarButton,
        journalButton,
        {
          link: SETTINGS_PAGE_LINK,
          children: (
            <div>
              <SettingsIcon />
              <Typography variant="caption">Админ-панель</Typography>
            </div>
          ),
        },
        session.is_admin ? adminButton : null,
        profileButton,
        logoutButton,
      ];
    }
    return [
      {
        link: LOGIN_PAGE_LINK,
        children: <Button variant="important">Войти</Button>,
      },
    ];
  };

  return (
    <header className={styles.base}>
      <Link href="/" className={styles.iconWrapper}>
        <HeaderIcon className={styles.icon} />
      </Link>
      <nav className={styles.nav}>
        <ButtonGroup
          buttons={buttonsHeader().filter((v) => v !== null) as ButtonProps[]}
        />
      </nav>
    </header>
  );
};

export default Header;
