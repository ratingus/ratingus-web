import React from "react";
import cl from "classnames";

import styles from "./Users.module.scss";

import { Typography } from "@/shared/components/Typography/Typography";

const Other = () => {
  return (
    <div className={cl(styles.wrapper, styles.otherWrapper)}>
      <Typography variant="h4">Длительность занятий:</Typography>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Промежуток</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>8:00 - 8:40</th>
          </tr>
          <tr>
            <th>2</th>
            <th>8:50 - 9:30</th>
          </tr>
          <tr>
            <th>3</th>
            <th>9:45 - 10:25</th>
          </tr>
          <tr>
            <th>4</th>
            <th>10:45 - 11:25</th>
          </tr>
          <tr>
            <th>5</th>
            <th>11:40 - 12:20</th>
          </tr>
          <tr>
            <th>6</th>
            <th>12:35 - 13:15</th>
          </tr>
          <tr>
            <th>5</th>
            <th>13:25 - 14:05</th>
          </tr>
          <tr>
            <th>6</th>
            <th>14:15 - 14:55</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Other;
