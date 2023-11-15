import { TZDate } from '@toast-ui/calendar';

import { addDate, addHours, subtractDate } from './utils';

const today = new TZDate();

export const events = [
  {
    id: '1',
    calendarId: '0',
    title: '子涛技术方案评审',
    category: 'time',
    start: today,
    end: addHours(today, 3),
  },
  {
    id: '4',
    calendarId: '3',
    title: '斯韵分享会',
    category: 'time',
    start: '2023-11-13 13:00',
    end: '2023-11-13 15:00',
  },
  {
    id: '5',
    calendarId: '2',
    title: '孝羽座谈会',
    category: 'time',
    start: '2023-11-14 11:30',
    end: '2023-11-14 16:30',
  },
  {
    id: '6',
    calendarId: '0',
    title: '子涛茶话会',
    category: 'time',
    start: '2023-11-13 15:30',
    end: '2023-11-13 18:30',
  },
  {
    id: '2',
    calendarId: '1',
    title: '华东的OKR沟通',
    category: 'milestone',
    start: addDate(today, 1),
    end: addDate(today, 1),
    isReadOnly: true,
  },
  {
    id: '3',
    calendarId: '2',
    title: '奇奇怪怪的会议',
    category: 'allday',
    start: subtractDate(today, 2),
    end: subtractDate(today, 1),
    isReadOnly: true,
  },
  {
    id: '4',
    calendarId: '2',
    title: '报表',
    category: 'time',
    start: addHours(today, -3),
    end: addHours(today, -1),
  },
];
