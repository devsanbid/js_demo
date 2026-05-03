// api response examples
const res = {
  status: 200,
  success: true,
  message: "Products fetched successfully",
  data: [],
  meta: {
    page: 1,
    limit: 10,
    total: 100
  }
}

import { Response } from "express"

export interface PaginationMeta {
  page: number
  limit: number
  total: number
}

export interface ApiResponse<T> {
  status: number
  success: boolean
  message: string
  data: T
  meta?: PaginationMeta
}

export class ApiResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    message: string = "success",
    meta?: PaginationMeta,
    status: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      status,
      success: true,
      message,
      data,
      meta
    }
    return res.status(status).json(response)
  }

  static error(
    res: Response,
    message: string = "success",
    status: number = 200
  ): Response {
    const response: ApiResponse<null> = {
      status,
      success: true,
      message,
    }
    return res.status(status).json(response)
  }

}
