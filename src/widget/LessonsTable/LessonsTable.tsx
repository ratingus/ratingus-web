import React from "react";
import cl from "classnames";

import styles from "./LessonsTable.module.scss";

import Button from "@/shared/components/Button/Button";
import { getDateString } from "@/shared/helpers/date";

// import styles from './LessonsTable.module.scss';

type LessonsTableProps = {};

type Lesson = {
  date: string;
  theme: string;
  homework: string;
  was?: boolean;
};

const lessons = [
  {
    date: new Date(Date.UTC(2024, 3, 29)),
    theme: "1.1 Введение в программирование (ветвление)",
    homework: "Задание 1.4 - 1.7",
    was: true,
  },
  {
    date: new Date(Date.UTC(2024, 3, 1)),
    theme: "1.2 Введение в программирование (циклы)",
    homework: "Задание 1.8 - 1.10",
    was: true,
  },
  {
    date: new Date(Date.UTC(2024, 4, 3)),
    theme: "1.3 Введение в программирование (функции)",
    homework: "Задание 1.11 - 1.13",
    was: true,
  },
  {
    date: new Date(Date.UTC(2024, 4, 5)),
    theme: "1.4 Введение в программирование (массивы)",
    homework: "Задание 1.14 - 1.16",
    was: true,
  },
  {
    date: new Date(Date.UTC(2024, 4, 8)),
    theme: "1.5 Введение в программирование (строки)",
    homework: "Задание 1.17 - 1.19",
    was: true,
  },
  {
    date: new Date(Date.UTC(2024, 4, 10)),
    theme: "1.6 Введение в программирование (объекты)",
    homework: "Задание 1.20 - 1.22",
  },
  {
    date: new Date(Date.UTC(2024, 4, 12)),
    theme: "1.7 Введение в программирование (классы)",
    homework: "Задание 1.23 - 1.25",
  },
  {
    date: new Date(Date.UTC(2024, 4, 13)),
    theme: "1.8 Введение в программирование (рекурсия)",
    homework: "Задание 1.26 - 1.28",
  },
  {
    date: new Date(Date.UTC(2024, 4, 15)),
    theme: "2.1 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
    homework: "Задание 2.3 - 2.6",
  },
  {
    date: new Date(Date.UTC(2024, 4, 17)),
    theme: "2.2 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
    homework: "Задание 2.7 - 2.10",
  },
  {
    date: new Date(Date.UTC(2024, 4, 19)),
    theme: "2.3 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
    homework: "Задание 2.11 - 2.14",
  },
  {
    date: new Date(Date.UTC(2024, 4, 21)),
    theme: "2.4 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 22)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 23)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 24)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 25)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 26)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 27)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 28)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 29)),
    theme: "2.5 Введение в серверную разработку (Spring Boot + Kafka + K8s)",
  },
  {
    date: new Date(Date.UTC(2024, 4, 30)),
    theme:
      "3.1 Делаем небольшой пет проект для резюме (Kittenx, PHP, Elastic, Celery, SendGrid, Tramvai, ClickHouse, Podman, Node.js, Express.js, MongoDB, Docker, Kubernetes, React Native, Vue.js, Angular, GraphQL, Apollo, Webpack, Babel, TypeScript, Redux, Jest, Cypress, Selenium, AWS Lambda, Google Cloud Functions, Azure Functions, Firebase, PostgreSQL, MySQL, SQLite, Redis, RabbitMQ, Kafka, Hadoop, Spark, ElasticSearch, Jenkins, Git, SVN, Mercurial, Bash, PowerShell, Nginx, Apache, IIS, Flask, Django, Ruby on Rails, Laravel, .NET Core, Java Spring Boot, Go, Rust, Swift, Kotlin, Dart, Flutter, Xamarin, Cordova, Ionic, Electron, TensorFlow, PyTorch, Keras, Pandas, NumPy)",
    homework: "Выжить",
  },
];

const LessonsTable = ({}: LessonsTableProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тема</th>
            <th className={styles.fullsize}>Домашнее задание</th>
            <th>Проведено</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={getDateString(lesson.date.toString(), "DD.MM")}>
              <td>{getDateString(lesson.date.toString(), "DD.MM")}</td>
              <td className={styles.fullsize}>{lesson.theme}</td>
              <td>{lesson.homework}</td>
              <td>
                <input type="checkbox" checked={lesson.was} />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className={cl(styles.fullsize, styles.addWrapper)}>
              <Button variant="important" className={styles.add}>
                +
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LessonsTable;
