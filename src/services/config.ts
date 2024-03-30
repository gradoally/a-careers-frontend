import { APIs } from "@/config/api.config";
import { get } from "@/lib/utils/request";

import { BackendConfig } from "@/openapi/client";

export async function getConfig() {
  return await get<BackendConfig>({ url: APIs.config.get });
}
