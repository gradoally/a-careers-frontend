import { createEvent, createStore } from "effector";
import { filterToggleValue } from "../../../config";

export const $orderBy = createStore<filterToggleValue>("createdAt");

export const switchedOrderBy = createEvent<filterToggleValue>();
$orderBy.on(switchedOrderBy, (_, paylod) => paylod);
1;
