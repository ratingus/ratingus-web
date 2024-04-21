"use client";
import Image from "next/image";

import Schools from "./(pieces)/Schools";
import styles from "./page.module.scss";

import { getUserBirthdate } from "@/entity/User/helpers";
import { useUser } from "@/entity/User/hooks";
import Button from "@/shared/components/Button/Button";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Profile() {
  const { login, fio, birthdate } = useUser();
  return (
    <PageContainer isPanel>
      <div className={styles.image} />
      <div className={styles.panel}>
        <div className={styles.panelNavigation}>
          <Typography variant="h4" component="span">
            <Button variant="secondary">Ввести код приглашения</Button>
          </Typography>
          <div>
            <div className={styles.avatarWrapper}>
              <Image
                className={styles.avatar}
                src="https://i.ibb.co/1rR0fx2/Frame-242.png"
                width={128}
                height={128}
                alt="Аватар профиля"
              />
            </div>
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
        <Schools />
      </div>
    </PageContainer>
  );
}
