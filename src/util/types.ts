
export type Events = "updateEvent" | "deleteEvent" | "addEvent" | "editEvent";

export type TaskInfo = {
  _id: string;
  todoName: string;
  isComplete: boolean;
};

// HTTP Types

export type DataResponse = {
  createdAt: string;
  updatedAt: string;
} & TaskInfo;

export type PostsResponse = {
  code: string;
  data: Array<DataResponse>;
};

export type PostResponse = {
  code: string;
  data: DataResponse
}

export type CodeResponse = {
  code: string
}