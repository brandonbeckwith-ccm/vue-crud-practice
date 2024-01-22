import axios from "axios";
import { BASE_URL, ResponseData, TaskInfo } from "../util/shared";


export type ResponsePosts = {
  code: string;
  data: Array<ResponseData>;
};

export type ResponsePost = {
  code: string;
  data: ResponseData
}

export type CodeResponse = {
  code: string
}

function buildURL(id: string){
  return BASE_URL + "/" + id
}

export async function getPosts() {
  console.log(`Making a GET request to ${BASE_URL}`);
  return await axios.get<ResponsePosts>(BASE_URL);
}

export async function getPost(taskInfo: TaskInfo){
  const url = buildURL(taskInfo._id)
  console.log(`Making a GET request to ${url}`);
  console.dir(taskInfo)
  return axios.get<ResponsePost>(url);
}

export async function deletePost(taskInfo: TaskInfo) {
  const url = buildURL(taskInfo._id)
  console.log(`Making a POST request to ${url}`);
  console.dir(taskInfo)
  return axios.delete<CodeResponse>(url);
}

export async function updatePost(taskInfo: TaskInfo) {
  const url = buildURL(taskInfo._id)
  console.log(`Making a POST request to ${url}`);
  console.dir(taskInfo)
  return axios.put<CodeResponse>(url, taskInfo);
}

export async function postPost(taskInfo: TaskInfo){
  console.log(`Making a POST request to ${BASE_URL}`);
  console.dir(taskInfo)
  return axios.post<CodeResponse>(BASE_URL, taskInfo);
}