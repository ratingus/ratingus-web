import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import styles from "./page.module.scss";

import JoinOrganizationButton from "@/feature/JoinOrganization/JoinOrganizationButton";
import { Modal } from "@/shared/components/Modal/Modal";
import { INFO_ABOUT_ORGANIZATION_MODAL } from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import HeaderIcon from "@/shared/icons/header.svg";

const InfoAboutOrganizationModal = dynamic(
  () =>
    import(
      "@/widget/_modals/InfoAboutOrganizationModal/InfoAboutOrganizationModal"
    ),
);

const list = [
  {
    text:
      "Школьный опыт формирует отношение к обучению в целом. Обрести уверенность в своих силах и сформировать адекватную самооценку — получить представление о своих способностях, ограничениях и личностных особенностях: «Это я могу, а это мне даётся с трудом».\n" +
      "Учёба — большая часть жизни любого ребёнка; школьные успехи и неудачи, а также отношение взрослых сильно отражается на самооценке, с которой ребёнок выйдет в жизнь.\n" +
      'Ведь как сказал Малькольм Форбс - "Обучение - это карта к успеху."',
  },
  {
    text:
      "Школа является одним из самых важных этапов в жизни каждого человека. Это место, где мы не только получаем знания, но и формируем свой характер, развиваем навыки общения и социализации. Именно в школьные годы закладывается фундамент для дальнейшего развития личности.\n" +
      "Образование является ключом к успешному будущему. Чем больше знаний мы получаем в школе, тем легче нам будет адаптироваться к меняющимся условиям современного мира. Кроме того, школа учит нас дисциплине, ответственности и умению управлять своим временем. Эти навыки пригодятся нам в дальнейшей жизни, независимо от выбранной профессии.",
  },
  {
    text:
      "Школа – это не только место, где мы получаем академические знания, но и уникальная среда для развития социальных навыков. Здесь мы учимся общаться со сверстниками, работать в команде, уважать других и разрешать конфликты. Эти навыки имеют огромное значение для успешной жизни в обществе.\n" +
      "Кроме того, школа помогает нам раскрыть наши таланты и увлечения. Участвуя в различных кружках, спортивных секциях и творческих мероприятиях, мы имеем возможность найти свое призвание и развивать свои способности. Это позволяет нам стать более разносторонними и интересными личностями.",
  },
];

export default function Home() {
  return (
    <>
      <div>
        {list.map(({ text }, index) => (
          <div className={styles.block} key={index}>
            <Image
              className={styles.imageBack}
              alt="Рейтингус"
              src={`/images/landing-${index + 1}.jpg`}
              width={1920}
              height={1080}
            />
            <div className={styles.shape} data-index={index}>
              <div className={styles.shapeLBig}></div>
              <div className={styles.shapeLMed}></div>
              <div className={styles.shapeLSmall}>
                <div className={styles.shapeText}>
                  <Image
                    className={styles.image}
                    alt="Рейтингус"
                    src={`/images/landing-${index + 1}.jpg`}
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
            <Typography variant="h4" className={styles.text}>
              {text}
            </Typography>
          </div>
        ))}
        <div className={styles.block}>
          <Image
            className={styles.imageBack}
            alt="Рейтингус"
            src={`/images/landing-end.jpeg`}
            width={1920}
            height={1080}
          />
          <HeaderIcon />
          <div className={styles.textBlock}>
            <Typography variant="h3" className={styles.textInBlock}>
              Давайте направим учебный процесс на учёбу, а не на заполнение
              дневников и журналов!
            </Typography>
            <JoinOrganizationButton />
          </div>
        </div>
      </div>
      <Modal modalName={INFO_ABOUT_ORGANIZATION_MODAL} className={styles.modal}>
        <InfoAboutOrganizationModal />
      </Modal>
    </>
  );
}
