import type { ToastOptions } from "react-toastify";
import { toast as baseToast } from "react-toastify";
import { format, parseISO } from "date-fns";
import type { FormikProps } from "formik";

import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";
import { DEFAULT_LOCALE } from "@/lib/constants";

const localeMap: any = {
  en: enLocale,
  ru: ruLocale,
};

const toastOptions: ToastOptions = {
  // autoClose: 5000,
  position: "top-center",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  closeButton: true,
  pauseOnFocusLoss: false,
};
export const toastLoading = (message: string) => {
  return baseToast.loading(message, toastOptions);
};

export const toastUpdate = (
  toastId: any,
  message: string,
  toastType: any = "success"
) => {
  baseToast.update(toastId, {
    render: message,
    type: toastType,
    isLoading: false,
    autoClose: 5000,
  });
};

export const toast = (
  message: string,
  toastType: "info" | "success" | "warning" | "error" | "default" = "success",
  options?: ToastOptions
) => {
  baseToast(message, {
    type: toastType,
    autoClose: 5000,

    ...toastOptions,
    ...options,
  });
};

export function filterOutFalsyItems(obj: Record<any, any>): any {
  const resObj: any = {};
  for (const i in obj) {
    if (obj[i]) {
      resObj[i] = obj[i];
    }
  }
  return resObj;
}

export const isObjectEmpty = (obj: Record<any, any>) => {
  try {
    if (!obj) throw new Error(`argument type is not object or in null value`);
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = ({
  date,
  formatStr = "PP",
  locale = DEFAULT_LOCALE,
}: {
  date?: string;
  formatStr?: string;
  locale?: string;
}) => {
  if (!date) return "";
  return format(parseISO(date), formatStr, { locale: localeMap[locale] });
};

export const formatDatetime = ({
  date,
  formatStr = "dd.MM.yyyy HH:mm",
  locale = DEFAULT_LOCALE,
}: {
  date?: string;
  formatStr?: string;
  locale?: string;
}) => {
  if (!date) return "";
  return format(parseISO(date), formatStr, { locale: localeMap[locale] });
};

export function getItem(object: any, key: string, default_value = "") {
  const result = object[key];
  return typeof result !== "undefined" ? result : default_value;
}

type ResolutionType = "DESKTOP" | "MOBILE";

export function getResolution(): ResolutionType {
  if (process.browser) {
    return window.innerWidth <= 768 ? "MOBILE" : "DESKTOP";
  } else return "DESKTOP";
}

export function getValueFromEnum<T extends string>(
  enumObj: Record<string, T>,
  value: string | number | undefined
): T | undefined {
  if (value === undefined) {
    return undefined;
  }
  const keys = Object.keys(enumObj) as Array<keyof typeof enumObj>;
  const key = keys.find((k) => enumObj[k] === value);
  return key ? enumObj[key] : undefined;
}

export const checkError = (
  formik: FormikProps<any>,
  errors: Record<string, string> | null,
  field: string
) => {
  if (formik.errors[field]) return true;
  else if (errors && errors[field]) return true;
  return false;
};

export const getError = (
  formik: FormikProps<any>,
  errors: Record<string, string> | null,
  field: string
): string | undefined => {
  if (formik.errors[field]) {
    console.log(formik.errors[field]);
    return formik.errors[field]?.toString();
  } else if (errors && errors[field]) {
    console.log(errors[field]);
    return errors[field];
  }
  return undefined;
};

export const canSubmit = (formik: FormikProps<any>) => {
  if (!(formik.isValid && formik.dirty)) return true;
  return formik.isSubmitting;
};
