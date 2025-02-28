import { test as base } from "@playwright/test";
import LoginPage from "../poms/login";
import Task2Page from "../poms/task2";

interface ExtendedFixtures {
  loginPage: LoginPage;
  task2Page: Task2Page;
}

export const test = base.extend<ExtendedFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  task2Page: async ({ page, browser }, use) => {
    const task2Page = new Task2Page(page, browser);
    await use(task2Page);
  },
});
