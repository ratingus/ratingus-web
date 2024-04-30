// import { http, HttpResponse, HttpResponseResolver } from "msw";
//
// const classesMapping: { [key: number]: string } = {
//   0: "Класс 9а",
//   1: "Класс 9б",
// };
//
// const announcements = [
//   {
//     authorFio: "Федоров Иван Олегович",
//     classes: ["Класс 9а", "Класс 9б"],
//     title: "Физры на 3 уроке сегодня не будет",
//     content: "В связи с соревнованиями стрельбы по голубям и баскской пелоты.",
//     date: new Date(Date.UTC(2024, 1, 30, 20, 49)),
//     views: 23,
//   },
//   {
//     authorFio: "Федоров Иван Олегович",
//     classes: ["Класс 9а", "Класс 9б"],
//     title: "На 4 уроке соберитесь в актовом зале.",
//     content:
//       "Будет проходить награждение грамотами за участие в олимпиадах “Русский медвежонок” и “ЭМУ”, а также важное объявление от директора.",
//     date: new Date(Date.UTC(2024, 1, 30, 11, 32)),
//     views: 128,
//   },
//   {
//     authorFio: "Федорова Изабелла Орнаментовна",
//     classes: ["Класс 9а"],
//     title: "Контрольная по химии переносится на следующую неделю",
//     date: new Date(Date.UTC(2024, 1, 29, 9, 55)),
//     views: 11,
//   },
//   {
//     authorFio: "Федорова Изабелла Орнаментовна",
//     classes: ["Класс 9а"],
//     title: "Контрольная по химии переносится на следующую неделю",
//     date: new Date(Date.UTC(2024, 1, 29, 9, 52)),
//     views: 11,
//   },
//   {
//     authorFio: "Федорова Изабелла Орнаментовна",
//     classes: ["Класс 9а"],
//     title: "Контрольная по химии переносится на следующую неделю",
//     date: new Date(Date.UTC(2024, 1, 29, 9, 51)),
//     views: 11,
//   },
//   {
//     authorFio: "Федорова Изабелла Орнаментовна",
//     classes: ["Класс 9а"],
//     title: "Контрольная по химии переносится на следующую неделю",
//     date: new Date(Date.UTC(2024, 1, 29, 9, 46)),
//     views: 11,
//   },
//   {
//     authorFio: "Федорова Изабелла Орнаментовна",
//     classes: ["Класс 9а"],
//     title: "Контрольная по химии переносится на следующую неделю",
//     date: new Date(Date.UTC(2024, 1, 29, 9, 43)),
//     views: 11,
//   },
// ];
//
// const getAnnouncementsResolver: HttpResponseResolver<
//   never,
//   never,
//   Announcement[] | { error: string }
// > = async ({ request }) => {
//   const url = new URL(request.url);
//   const classId = url.searchParams.get("classId");
//   if (classId) {
//     const classIdNumber = parseInt(classId);
//     if (classIdNumber > 1 || classIdNumber < 0)
//       return HttpResponse.json({ error: "Invalid classId" }, { status: 400 });
//     return HttpResponse.json(
//       announcements.filter(({ classes }) =>
//         classes.includes(classesMapping[classIdNumber]),
//       ),
//     );
//   }
//   return HttpResponse.json(announcements);
// };
//
// const getAnnouncementsHandler = http.get(
//   `${process.env.NEXT_PUBLIC_API_URL}${ANNOUNCEMENTS_PATH}`,
//   getAnnouncementsResolver,
// );
//
// export default [getAnnouncementsHandler];

import { DayLessonDetailed } from "@/entity/Lesson/model";

export const generateDayLessonDetailed = (day: number): DayLessonDetailed => ({
  dateTime: new Date(Date.UTC(2024, 3, 29 + day - 1)),
  studies: [
    {
      id: 1 + 8 * day,
      studyId: 0,
      subject: "Математика",
      teacher: {
        id: 1,
        name: "Иван",
        surname: "Иванов",
        patronymic: "Иванович",
      },
      timetableNumber: 1,
      mark: "5",
      attendance: "was",
      homework: "Подготовиться к контрольной работе",
      note: "Повторить деепричастия и причастия.",
    },
    {
      id: 2 + 8 * day,
      studyId: 1,
      subject: "Физика",
      teacher: {
        id: 2,
        name: "Петр",
        surname: "Петров",
        patronymic: "Петрович",
      },
      timetableNumber: 2,
      mark: "4",
      attendance: "was",
      note: "Не понял пункт 2.3 при ответе на вопрос 3.2 у доски, надо прорешать похожие.",
    },
    {
      id: 3 + 8 * day,
      studyId: 2,
      subject: "Химия",
      teacher: {
        id: 3,
        name: "Сидор",
        surname: "Сидоров",
        patronymic: "Сидорович",
      },
      timetableNumber: 3,
      mark: "3",
      attendance: "was",
      homework: "Подготовиться к контрольной работе",
    },
    {
      id: 4 + 8 * day,
      studyId: 2,
      subject: "Химия",
      teacher: {
        id: 3,
        name: "Сидор",
        surname: "Сидоров",
        patronymic: "Сидорович",
      },
      timetableNumber: 4,
      mark: "2",
    },
    {
      id: 5 + 8 * day,
      studyId: 2,
      subject: "Химия",
      teacher: {
        id: 3,
        name: "Сидор",
        surname: "Сидоров",
        patronymic: "Сидорович",
      },
      timetableNumber: 5,
      attendance: "was",
    },
    {
      id: 6 + 8 * day,
      studyId: 2,
      subject: "Химия",
      teacher: {
        id: 3,
        name: "Сидор",
        surname: "Сидоров",
        patronymic: "Сидорович",
      },
      timetableNumber: 6,
      attendance: "validAbsent",
    },
    {
      id: 7 + 8 * day,
      studyId: 2,
      subject: "Химия",
      teacher: {
        id: 3,
        name: "Сидор",
        surname: "Сидоров",
        patronymic: "Сидорович",
      },
      timetableNumber: 7,
      attendance: "invalidAbsent",
    },
    {
      id: 8 + 8 * day,
      studyId: 2,
      subject: "Химия",
      teacher: {
        id: 3,
        name: "Сидор",
        surname: "Сидоров",
        patronymic: "Сидорович",
      },
      timetableNumber: 8,
    },
  ],
});