"use client";

import React, { useState } from "react";
import cl from "classnames";

import styles from "./page.module.scss";

import { UserCode } from "@/entity/School/model";
import {
  useApproveApplicationMutation,
  useGetApplicationsQuery,
  useRecreateCodeApplicationMutation,
  useRejectApplicationMutation,
} from "@/entity/School/query";
import { UserIdentity } from "@/entity/User/model";
import Button from "@/shared/components/Button/Button";
import { Label } from "@/shared/components/Label/Label";
import { Modal } from "@/shared/components/Modal/Modal";
import {
  actionShowModal,
  MAKE_USER_CODE_MODAL,
} from "@/shared/components/Modal/slice";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";
import MakeUserCodeModal from "@/widget/_modals/MakeUserCodeModal/MakeUserCodeModal";

export default function AdminPanel() {
  const dispatch = useAppDispatch();
  const { data: applications } = useGetApplicationsQuery(null);
  const [approveApplication] = useApproveApplicationMutation();
  const [rejectApplication] = useRejectApplicationMutation();
  const [recreateUserCode] = useRecreateCodeApplicationMutation();

  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);
  const [type, setType] = useState<"approve" | "recreate">("approve");
  const [selectedCode, setSelectedCode] = useState<UserCode | null>(null);

  if (!applications) return <div>loading...</div>;

  const handleOpenMakeUserCodeModal = (
    id: number | null,
    newType: "approve" | "recreate",
    code?: UserCode | null,
  ) => {
    if (!id) return;
    setSelectedCode(code || null);
    setSelectedApplicationId(id);
    setType(newType);
    dispatch(actionShowModal(MAKE_USER_CODE_MODAL));
  };

  const handleApproveApplication = (user: Omit<UserIdentity, "id">) => {
    if (selectedApplicationId === null) return;

    switch (type) {
      case "approve":
        approveApplication({ id: selectedApplicationId, ...user });
        return;
      case "recreate":
        recreateUserCode({ id: selectedApplicationId, ...user });
        return;
    }
  };

  const handleRejectApplication = (id: number) => {
    rejectApplication({ id });
  };

  return (
    <>
      <PageContainer className={styles.panel} isPanel>
        <div className={styles.schools}>
          {applications.map(
            ({ id, name, address, email, status, code, isActivated }) => (
              <div key={id} className={cl(styles.flex, styles.grid)}>
                <div className={styles.school}>
                  <Typography variant="small" color="textHelper">
                    Заявка №{id}
                  </Typography>
                  <div className={styles.flex}>
                    <Typography variant="h2">{name}</Typography>
                    {status && (
                      <Label
                        variant={status === "APPROVED" ? "ghost" : "error"}
                      >
                        {getTextByStatus(status)}
                      </Label>
                    )}
                  </div>
                  <Typography variant="body" italic weight="lighter">
                    {address}
                  </Typography>
                  <Typography variant="body">
                    Почта для связи: {email}
                  </Typography>
                </div>
                {status ? (
                  status === "APPROVED" &&
                  code && (
                    <div
                      className={cl(
                        styles.additionalBlock,
                        styles.additionalBlockApprove,
                      )}
                    >
                      <Typography weight="lighter">
                        Код приглашения локального администратора:
                      </Typography>
                      <Typography>
                        {code.code} {isActivated && "[Активирован]"}
                      </Typography>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleOpenMakeUserCodeModal(code.id, "recreate", code)
                        }
                      >
                        Пересоздать
                      </Button>
                    </div>
                  )
                ) : (
                  <div
                    className={cl(
                      styles.additionalBlock,
                      styles.additionalBlockButtons,
                    )}
                  >
                    <Button
                      sizeVariant="big"
                      variant="secondary"
                      onClick={() => handleOpenMakeUserCodeModal(id, "approve")}
                    >
                      Одобрить
                    </Button>
                    <Button
                      variant="error"
                      onClick={() => handleRejectApplication(id)}
                    >
                      Отклонить
                    </Button>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </PageContainer>
      <Modal modalName={MAKE_USER_CODE_MODAL} maxContent>
        <MakeUserCodeModal
          code={selectedCode}
          onSubmit={handleApproveApplication}
        />
      </Modal>
    </>
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
