import Content from "./Content";

import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Tabs } from "@/shared/components/Tabs/Tabs";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Home() {
  return (
    <PageContainer
      ignoreHeader
      isPanel
      actionSlot={
        <Tabs
          sizeVariant="big"
          options={[
            {
              value: "students",
              label: "Ученики",
            },
            {
              value: "lessons",
              label: "Занятия",
            },
          ]}
        />
      }
    >
      <Typography variant="h3" component="div">
        Добро пожаловать в
      </Typography>
      <Typography variant="h1" component="div">
        Ratingus
      </Typography>
      <Content />
      <Typography variant="caption" weight="bold" component="div">
        Всем привееет!
      </Typography>
    </PageContainer>
  );
}
