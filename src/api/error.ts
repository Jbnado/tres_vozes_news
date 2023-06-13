import { AxiosError } from "axios";

function handleError(error: unknown): void{
  if(error instanceof AxiosError){
    if(error.response) {
      const { status, data } = error.response;
      throw new Error(`${status} - ${data.error}`);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }

  throw new Error("Unknown error");
}

export default handleError;