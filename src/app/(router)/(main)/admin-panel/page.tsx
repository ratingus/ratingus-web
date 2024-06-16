"use client";

import cl from "classnames";

import styles from "./page.module.scss";

import { useGetApplicationsQuery } from "@/entity/School/query";
import Button from "@/shared/components/Button/Button";
import { Label } from "@/shared/components/Label/Label";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";

export default function AdminPanel() {
  const { data: applications } = useGetApplicationsQuery(null);

  if (!applications) return <div>loading...</div>;

  return (
    <PageContainer className={styles.panel} isPanel>
      <div className={styles.schools}>
        {applications.map(({ id, name, address, email, status, code }) => (
          <div key={id} className={cl(styles.flex, styles.grid)}>
            <div className={styles.school}>
              <Typography variant="small" color="textHelper">
                Заявка №{id}
              </Typography>
              <div className={styles.flex}>
                <Typography variant="h2">{name}</Typography>
                {status && (
                  <Label variant={status === "APPROVED" ? "ghost" : "error"}>
                    {getTextByStatus(status)}
                  </Label>
                )}
              </div>
              <Typography variant="body" italic weight="lighter">
                {address}
              </Typography>
              <Typography variant="body">Почта для связи: {email}</Typography>
            </div>
            {status ? (
              status === "APPROVED" && (
                <div
                  className={cl(
                    styles.additionalBlock,
                    styles.additionalBlockApprove,
                  )}
                >
                  <Typography weight="lighter">
                    Код приглашения локального администратора:
                  </Typography>
                  <Typography>{code}</Typography>
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
    case "APPROVED":
      return "Одобрено";
    case "REJECTED":
      return "Отклонено";
    default:
      return "В обработке";
  }
};
