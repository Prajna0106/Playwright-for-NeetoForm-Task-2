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
    formPage,
  }) => {
    await test.step("create a form and change the access control", async () => {
      await formPage.createAndChangeAccessControl();
    });

    await test.step("open the form in a new incognito tab and submit the form", async () => {
      await formPage.openAndSubmitForm();

      await test.step("verify the form", async () => {
        await page.getByTestId("submissions-tab").click();
        await expect(
          page.getByRole("link", { name: `${FORM_TEXTS.oliverEmail}` })
        ).toBeVisible();
      });

      await test.step(`Delete the form ${COMMON_TEXTS.skipSetup}`, async () => {
        await formPage.deleteForm();
      });
    });
  });
  test("should be able to do unique submissions", async ({
    page,
    formPage,
  }) => {
    await test.step("create a form and submit the form", async () => {
      await formPage.createAndVerifyForm();
    });

    await test.step("open the form in incognito mode", async () => {
      await formPage.openFormInIncognitoTab();
    });
    await test.step("change the preferences", async () => {
      await formPage.changePreferences();
    });
    await test.step(`Delete the form ${COMMON_TEXTS.skipSetup}`, async () => {
      await formPage.deleteForm();
    });
  });

  test("should be able to do conditional logic", async ({ page, formPage }) => {
    await test.step("create a form with a single choice question", async () => {
      await formPage.createFormWithSingleChoice();
    });

    await test.step("set up and verifythe conditional logic", async () => {
      await formPage.setUpAndVerifyConditionalLogic();
    });

    await test.step("change the conditional logic ", async () => {
      await formPage.changeConditionalLogic();
    });

    await test.step(`Delete the form ${COMMON_TEXTS.skipSetup}`, async () => {
      await formPage.deleteForm();
    });
  });
});
