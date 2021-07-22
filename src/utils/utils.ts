import { useEffect } from "react";

export function getRandomId(): number {
  return Math.ceil(Math.random() * 10000);
}

export const useDocumentEvent = (events: any[]) => {
  useEffect(() => {
    events.forEach((event) => {
      document.addEventListener(event.type, event.callback);
    });
    return () =>
      events.forEach((event) => {
        document.removeEventListener(event.type, event.callback);
      });
  }, [events]);
};

export function formatDate(date: string) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const newDate = new Date(date);
  return `${newDate.getDate()} ${
    monthNames[newDate.getMonth()]
  } ${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
}

export function compare(a: any, b: any, prop: string = "order") {
  if (a[prop] < b[prop]) {
    return -1;
  }
  if (a[prop] > b[prop]) {
    return 1;
  }
  return 0;
}

export function orderItems(
  items: any[],
  item: any,
  target: any,
  prop: string = "id"
) {
  const sorted = [...items];
  sorted.map((i, index) => (i.order = i.order || index + 1));
  sorted.sort(compare);
  const itemIndex = sorted.findIndex((i) => i[prop] === item);
  if (itemIndex === -1) {
    return null;
  }
  const toBeMovedItem = sorted.splice(itemIndex, 1)[0];
  const targetIndex = sorted.findIndex((i) => i[prop] === target);
  if (targetIndex === -1) {
    return null;
  }
  sorted.splice(targetIndex, 0, toBeMovedItem);
  sorted.map((i, index) => (i.order = index + 1));
  return sorted;
}
