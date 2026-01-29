import { test, expect } from "@playwright/test";

// First ever playwright test
test("loads the log in page", async ({ page }) => {
  await page.goto("/");
  expect(
    page.getByRole("heading", { name: "Log in to see your notes" })
  ).toBeVisible();
  const textAreas = page.getByRole("textbox");

  expect(textAreas).toHaveCount(2);
});

test("user can log in successfully and navigates to home page", () => {});
