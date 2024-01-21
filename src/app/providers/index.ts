import compose from "compose-function";

import { withSuspense } from "./with-suspense";
import { withTon } from "./with-ton";

export const withProviders = compose(withSuspense, withTon);
