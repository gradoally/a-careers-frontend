import { useScreen } from "@/lib/provider/screen.provider";
import { useRef } from "react";

type RequestFunc = (successCB: () => void) => Promise<void>;
type CheckTxProgressFunc = (request: RequestFunc, options?: IOptions) => void;

interface IOptions {
  timeoutInMs?: number;
  retryInMs?: number;
}

interface ITxCheckerHook {
  checkTxProgress: CheckTxProgressFunc;
}

export default function useTxChecker(): ITxCheckerHook {
  const { toggleTxProgress, toggleFailScreen } = useScreen();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimer() {
    intervalRef.current && clearInterval(intervalRef.current);
  }

  function showFailure() {
    resetTimer();
    toggleTxProgress(false);
    toggleFailScreen(true);
  }

  /**
   * @description reset timer and close progress screen
   */
  function successCB() {
    //On success, reset timer and close screen
    resetTimer();
    toggleTxProgress(false);
  }

  function checkTxProgress(request: RequestFunc, options?: IOptions) {
    let timeoutInMs = options?.timeoutInMs || 60000;
    let retryInMs = options?.retryInMs || 3000;

    toggleTxProgress(true);
    intervalRef.current = setInterval(async () => {
      try {
        await request(successCB);
      } catch (err) {
        //On internet disconnection and error from backend, show failure screen
        showFailure();
      }
      //On each run,decrement total seconds
      timeoutInMs -= retryInMs;
      //On timeout, reset timer and show failure screen
      if (timeoutInMs <= 0) showFailure();
    }, retryInMs);
  }

  return {
    checkTxProgress,
  };
}
