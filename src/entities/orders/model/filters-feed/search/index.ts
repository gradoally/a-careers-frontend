import { factoryInput } from "@/shared/lib/factory-input";

export const {
  $input: $search,
  changedInput: changedSearch,
  debouncedInput: debouncedSearch,
} = factoryInput();
