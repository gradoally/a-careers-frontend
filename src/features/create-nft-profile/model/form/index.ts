import { factoryInput } from "@/shared/lib/factory-input";
import { createEvent, createStore } from "effector";
import uniqid from "uniqid";

export const { $input: $telegram_id, changedInput: changedTelegram_id } =
  factoryInput();

export const {
  $input: $telegram_nickname,
  changedInput: changedTelegram_nickname,
} = factoryInput();

export const { $input: $about_yorself, changedInput: changedAbout_yorself } =
  factoryInput();

export const { $input: $link_site, changedInput: changedLink_site } =
  factoryInput();

export const { $input: $link_portfolio, changedInput: changedLink_portfolio } =
  factoryInput();

export const $resume = createStore<File | null>(null);
export const changedResume = createEvent<File | null>();

$resume.on(changedResume, (_, file) => file);

// export const $specializations = createStore<string[]>(['FunC', 'FIFT']);
// export const addedSpecialization = createEvent<string>();
// export const deleteSpecialization = createEvent<number>();
// export const modifiedSpecialization = createEvent<{key: number, value: string}>();

// $specializations
//   .on(addedSpecialization, (specializations, value) => [...specializations, value])
//   .on(modifiedSpecialization, (specializations, specialization) => {
//     const copy = [...specializations];
//     copy[specialization.key] = specialization.value;

//     return copy
//   })
//   .on(deleteSpecialization, (specializations, key) => {
//     const copy = [...specializations];
//     delete copy[key];

//     return copy;
//   });

export interface specialization {
  key: string;
  value: string;
}

export const $specializations = createStore<Record<string, string>>({});
export const modifedSpecialization = createEvent<specialization>();
export const deleteSpecialization = createEvent<{ key: string }>();

$specializations
  .on(modifedSpecialization, (specializations, specialization) => {
    const copy = { ...specializations };
    copy[specialization.key] = specialization.value;

    return copy;
  })
  .on(deleteSpecialization, (specializations, { key }) => {
    const copy = { ...specializations };
    delete copy[key];

    return copy;
  });

export const addedSpecialization = () => {
  modifedSpecialization({
    key: uniqid(),
    value: "",
  });
};
