
import { describe, expect, it, vi } from "vitest"
import axios from "axios"
import { DataResponse, PostsResponse } from "../../util/types"
import { deletePost, getPost, getPosts, postPost, updatePost } from "../../util/httpRequests"

vi.mock('axios')

const mockPostData1: DataResponse = {
  _id: "ekm1324mkdaell5321d",
  todoName: "Learn more vue",
  isComplete: true,
  createdAt: "exampleData",
  updatedAt: "anotherDate"
}

const mockPostData2: DataResponse = {
  _id: "mk24;ku9401nxus13kn65da",
  todoName: "Learn more about testing",
  isComplete: false,
  createdAt: "exampleData19",
  updatedAt: "anotherDate34"
}

const mockPostsData: PostsResponse = {
  code: '200',
  data: [mockPostData1, mockPostData2]

}

describe("Get Posts", () => {

  it("Returns all posts", async () => {
    vi.mocked(axios, true).get.mockResolvedValue({data: mockPostsData})

    const posts = await getPosts()
    expect(posts).toBe(mockPostsData)
  })

  it("Returns null on failure", async() =>{

    vi.mocked(axios, true).get.mockRejectedValue(null)

    const posts = await getPosts()
    expect(posts).toBe(null)
  })
})

describe("Get Post", () => {
  it("Returns valid post data", async () => {
    vi.mocked(axios, true).get.mockResolvedValue({data: mockPostData1})
    const post = await getPost(mockPostData1)
    expect(post).toBe(mockPostData1)
  })

  it("Returns null on failure", async() => {
    vi.mocked(axios, true).get.mockRejectedValue("Apple")
    const post = await getPost(mockPostData1)
    expect(post).toBe(null)
  })
})

describe("Delete Post", () => {
  it("Deletes a post", async () => {
    vi.mocked(axios, true).delete.mockResolvedValue(true)
    const response = await deletePost(mockPostData1)
    expect(response).toBe(true)
  })

  it("Returns false on failure", async() => {
    vi.mocked(axios, true).delete.mockRejectedValue(null)
    const response = await deletePost(mockPostData1)
    expect(response).toBe(false)
  })
})

describe("Post Post", () => {
  it("Uploads task info", async () => {
    vi.mocked(axios, true).post.mockResolvedValue("yes!")
    const response = await postPost(mockPostData2)
    expect(response).toBe(true)
  })

  it("Returns false on failure", async () => {
    vi.mocked(axios, true).post.mockRejectedValue("Nope!")
    const response = await postPost(mockPostData2)
    expect(response).toBe(false)
  })
})

describe("update Post", () => {
  it("Updates task info", async () => {
    vi.mocked(axios, true).put.mockResolvedValue("Mhmm!")
    const response = await updatePost(mockPostData2)
    expect(response).toBe(true)
  })

  it("Returns false on failure", async () => {
    vi.mocked(axios, true).put.mockRejectedValue("Nmmmn!")
    const response = await updatePost(mockPostData2)
    expect(response).toBe(false)
  })
})