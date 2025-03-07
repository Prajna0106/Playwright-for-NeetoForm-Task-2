import { test } from "@playwright/test";
import { STORAGE_STATE } from "../../playwright.config";
import * as fs from "fs";

test("Teardown", () => {
  fs.unlink(STORAGE_STATE, (error) => {
    if (!error) return;
    console.error("Error deleting session state", error);
  });
});
