"use client";
import Schools from "./(pieces)/Schools";
import styles from "./page.module.scss";

import { getUserBirthdate } from "@/entity/User/helpers";
import { useUser } from "@/entity/User/hooks";
import Avatar from "@/entity/User/ui/Avatar";
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
            <Avatar />
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
