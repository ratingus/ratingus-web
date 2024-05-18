"use client";

import cl from "classnames";

import styles from "./page.module.scss";

import Button from "@/shared/components/Button/Button";
import { Label } from "@/shared/components/Label/Label";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";

export default function AdminPanel() {
  const schools = [
    {
      id: 0,
      schoolName: "Школа №31416",
      address: "г. Город, ул. Улица, д. 123",
      email: "school@school31416.edu",
      status: {
        type: "approved",
        code: "faposfkpqwf@r2",
      },
    },
    {
      id: 1,
      schoolName: "Школа №31417",
      address: "г. Город, ул. Улица, д. 256",
      email: "school@school31417.edu",
    },
    {
      id: 2,
      schoolName: "Школа №31418",
      address: "г. Город, ул. Улица, д. 512",
      email: "school@school31418.edu",
      status: {
        type: "cancelled",
      },
    },
  ];

  return (
    <PageContainer className={styles.panel} isPanel>
      <div className={styles.schools}>
        {schools.map(({ id, schoolName, address, email, status }) => (
          <div key={id} className={cl(styles.flex, styles.grid)}>
            <div className={styles.school}>
              <Typography variant="small" color="textHelper">
                Заявка №{id}
              </Typography>
              <div className={styles.flex}>
                <Typography variant="h2">{schoolName}</Typography>
                {status && (
                  <Label
                    variant={status.type === "approved" ? "ghost" : "error"}
                  >
                    {getTextByStatus(status.type)}
                  </Label>
                )}
              </div>
              <Typography variant="body" italic weight="lighter">
                {address}
              </Typography>
              <Typography variant="body">Почта для связи: {email}</Typography>
            </div>
            {status ? (
              status.type === "approved" && (
                <div
                  className={cl(
                    styles.additionalBlock,
                    styles.additionalBlockApprove,
                  )}
                >
                  <Typography weight="lighter">
                    Код приглашения локального администратора:
                  </Typography>
                  <Typography>{status.code}</Typography>
                  <Button variant="secondary">Пересоздать</Button>
                </div>
              )
            ) : (
              <div
                className={cl(
                  styles.additionalBlock,
                  styles.additionalBlockButtons,
                )}
              >
                <Button sizeVariant="big" variant="secondary">
                  Одобрить
                </Button>
                <Button variant="error">Отклонить</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

const getTextByStatus = (status: string) => {
  switch (status) {
    case "approved":
      return "Одобрено";
    case "cancelled":
      return "Отклонено";
    default:
      return "В обработке";
  }
};
