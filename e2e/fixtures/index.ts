import { test as base } from "@playwright/test";
import LoginPage from "../poms/login";
import FormPage from "../poms/form";

interface ExtendedFixtures {
  loginPage: LoginPage;
  formPage: FormPage;
}

export const test = base.extend<ExtendedFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  formPage: async ({ page, browser }, use) => {
    const formPage = new FormPage(page, browser);
    await use(formPage);
  },
});
