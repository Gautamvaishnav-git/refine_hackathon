import * as NextError from "next/error";
import { toast } from "react-toastify";

export class Logger {
  error: unknown;
  constructor(error: unknown) {
    this.error = error;
  }

  toastMsg() {
    if (this.error instanceof Error) {
      toast.error(this.error.message);
    }
  }
}
