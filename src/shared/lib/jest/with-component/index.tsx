/* eslint-disable i18next/no-literal-string */
import { render } from "@testing-library/react";
import { RouterProvider } from "atomic-router-react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import i18nForTests from "@/shared/config/i18n/i18n-tests";
import { router } from "@/shared/router";

export function componentRender(component: ReactNode) {
  return render(
    <RouterProvider router={router}>
      <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
    </RouterProvider>,
  );
}
