export type TaskInfo = {
  _id: string;
  todoName: string;
  isComplete: boolean;
};

export const BASE_URL = "https://calm-plum-jaguar-tutu.cyclic.app/todos";

export type RequestType = "get" | "post" | "put" | "delete";

export type Events = "updateEvent" | "deleteEvent" | "addEvent" | "editEvent";

export type ResponseData = {
  createdAt: string;
  updatedAt: string;
} & TaskInfo;

export const debounce = (callback: Function, wait: number) => {
  let timeoutId: number; // Holds a timer

  return (...args: any) => {
    // Passes all arguments to the callback function
    window.clearTimeout(timeoutId); // Clear the previous timeout
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args); // Call the callback
    }, wait);
  }; // Returns a function that when called will execute the callback after a period of time
};
