"use client";
import Image from "next/image";

import Schools from "./(pieces)/Schools";
import styles from "./page.module.scss";

import { getUserBirthdate } from "@/entity/User/helpers";
import { useGetProfileQuery } from "@/entity/User/query/profile.api";
import Avatar from "@/entity/User/ui/Avatar";
import Button from "@/shared/components/Button/Button";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Profile() {
  const { data: profile, isLoading } = useGetProfileQuery(null);
  if (!profile || isLoading) return "loading...";

  const { login, birthdate, fio, schools } = profile;
  return (
    <PageContainer isPanel>
      <Image
        width={1370}
        height={186}
        src="/images/profile_empty_back_image.png"
        className={styles.image}
        alt="fas"
      />
      <div className={styles.panel}>
        <div className={styles.panelNavigation}>
          <Typography variant="h4" component="span">
            <Button variant="secondary">Ввести код приглашения</Button>
          </Typography>
          <div>
            <Avatar avatarClassName={styles.avatar} />
            <div className={styles.profileDataWrapper}>
              <Typography variant="h2" component="div">
                {login}
              </Typography>
              <Typography variant="h2" component="div">
                {fio}
              </Typography>
              <Typography variant="h4" component="div" color="textHelper">
                {getUserBirthdate(birthdate)}
              </Typography>
            </div>
          </div>
          <Typography variant="h4" component="span">
            <Button variant="secondary">Редактировать</Button>
          </Typography>
        </div>
        <Schools schools={schools} />
      </div>
    </PageContainer>
  );
}
