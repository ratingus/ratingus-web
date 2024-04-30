import SingleLogo from "@icons/single-logo.svg";

import styles from "../page.module.scss";

import { Typography } from "@/shared/components/Typography/Typography";

export default function DefaultDetailed() {
  return (
    <div className={styles.emptyDayWrapper}>
      <div className={styles.emptyDay}>
        <div className={styles.logoWrapper}>
          <SingleLogo />
        </div>
        <div className={styles.textWrapper}>
          <Typography variant="h4" className={styles.text}>
            Выберите нужный день в списке слева, чтобы посмотреть подробную
            информацию.
          </Typography>
        </div>
      </div>
    </div>
  );
}
