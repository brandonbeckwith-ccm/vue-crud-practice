import axios from "axios";
import { PostResponse, PostsResponse, CodeResponse, TaskInfo } from "./types";
import { BASE_URL } from "./shared";

function buildURL(id: string) {
  return BASE_URL + "/" + id;
}

export async function getPosts() {
  console.log(`Making a GET request to ${BASE_URL}`);
  try {
    const { data: posts } = await axios.get<PostsResponse>(BASE_URL);
    console.log("Success!");
    return posts;
  } catch (error) {
    console.log("Failed!");
    console.dir(error);
    return null;
  }
}

export async function getPost(taskInfo: TaskInfo) {
  const url = buildURL(taskInfo._id);
  console.log(`Making a GET request to ${url}`);
  console.dir(taskInfo);
  try {
    const { data: post } = await axios.get<PostResponse>(url);
    console.log("Success!");
    return post;
  } catch (error) {
    console.log("Failed!");
    console.dir(error);
    return null;
  }
}

export async function deletePost(taskInfo: TaskInfo) {
  const url = buildURL(taskInfo._id);
  console.log(`Making a POST request to ${url}`);
  try {
    await axios.delete<CodeResponse>(url);
    console.log("Success!");
    return true;
  } catch (error) {
    console.log("Failed!");
    console.dir(taskInfo);
    console.dir(error);
    return false;
  }
}

export async function updatePost(taskInfo: TaskInfo) {
  const url = buildURL(taskInfo._id);
  console.log(`Making a POST request to ${url}`);
  try {
    await axios.put<CodeResponse>(url, taskInfo)
    console.log("Success!")
    return true
  } catch (error) {
    console.log("Failed!");
    console.dir(taskInfo);
    console.dir(error);
    return false;
  }
}

export async function postPost(taskInfo: TaskInfo) {
  console.log(`Making a POST request to ${BASE_URL}`);
  try {
    await axios.post<CodeResponse>(BASE_URL, taskInfo);
    console.log("Success!")
    return true
  } catch (error) {
    console.log("Failed!");
    console.dir(taskInfo);
    console.dir(error);
    return false;
  }
}