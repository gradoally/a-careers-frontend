import { createEffect } from "effector";
import { URL_INDEXER } from "../../rest";

interface queryGetArgs {
  path: string;
  queryData: URLSearchParams;
}

export const queryGetFx = createEffect(async (args: queryGetArgs) => {
  const { queryData, path } = args;

  try {
    const queryParams = `?${queryData.toString()}`;

    let request = await fetch(`${URL_INDEXER}${path}${queryParams}`);
    request = await request.json();

    return request;
  } catch (err) {
    console.log(err);
  }
});
