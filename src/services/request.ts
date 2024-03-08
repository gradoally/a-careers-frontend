import axios from "axios";

interface IRequestProps {
  url: string;
  progress?: (progress: number) => void;
}

interface IResponse<T> {
  status: string;
  data: T | null;
  message: string;
}

export async function get<T>(option: IRequestProps): Promise<IResponse<T>> {
  try {
    const res = await axios.get(option.url, {
      headers: {
        Accept: "application/json",
      },
    });
    return {
      status: "success",
      data: res.data,
      message: "",
    };
  } catch (err: any) {
    let message = (err as Error).message;
    if (err.res?.data) {
      message = err.res.data.message;
    }
    return {
      status: "fail",
      message,
      data: null,
    };
  }
}
