import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { COMMON_TEXTS, FORM_TEXTS } from "../constants/texts";
test.describe("Form Page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await test.step("Go to dashboard", () => page.goto("/"));
    if (testInfo.title.includes(COMMON_TEXTS.skipSetup)) return;
  });
  test("should be able to access control the form", async ({
    page,
    task2Page,
  }) => {
    await test.step("create a form and change the access control", async () =>
      task2Page.createAndChangeAccessControl());

    await test.step("open the form in a new incognito tab and submit the form", async () =>
      task2Page.openAndSubmitForm());

    await test.step("verify the form", async () => {
      await page.getByTestId("submissions-tab").click();
      await expect(
        page.getByRole("link", { name: `${FORM_TEXTS.oliverEmail}` })
      ).toBeVisible();
    });

    await test.step(`Delete the form ${COMMON_TEXTS.skipSetup}`, async () =>
      task2Page.deleteForm());
  });

  test("should be able to do unique submissions", async ({ task2Page }) => {
    await test.step("create a form and submit the form", async () =>
      task2Page.createAndVerifyForm());

    await test.step("open the form in incognito mode", async () =>
      task2Page.openFormInIncognitoTab());

    await test.step("change the preferences", async () =>
      task2Page.changePreferences());

    await test.step(`Delete the form ${COMMON_TEXTS.skipSetup}`, async () =>
      task2Page.deleteForm());
  });

  test("should be able to do conditional logic", async ({ task2Page }) => {
    await test.step("create a form with a single choice question", async () =>
      task2Page.createFormWithSingleChoice());

    await test.step("set up and verifythe conditional logic", async () =>
      task2Page.setUpAndVerifyConditionalLogic());

    await test.step("change the conditional logic ", async () =>
      task2Page.changeConditionalLogic());

    await test.step(`Delete the form ${COMMON_TEXTS.skipSetup}`, async () =>
      task2Page.deleteForm());
  });
});
