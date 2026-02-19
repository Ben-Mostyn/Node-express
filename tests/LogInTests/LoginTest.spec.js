import { test, expect } from "@playwright/test";

// Group tests to run in order
test.describe.serial("Login tests", () => {
  test("loads the log in page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Log in to see your notes" })
    ).toBeVisible();

    const textAreas = page.getByRole("textbox");
    await expect(textAreas).toHaveCount(2);
  });

  test("user can log in successfully and navigates to home page", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Log in to see your notes" })
    ).toBeVisible();

    const emailTextBox = page.getByRole("textbox", { name: "email" });
    const passwordTextBox = page.getByRole("textbox", { name: "password" });
    const loginBtn = page.getByRole("button", { name: "login-submit" });

    await emailTextBox.fill("ben1@example.com");
    await passwordTextBox.fill("12345678");
    await loginBtn.click();

    await expect(
      page.getByRole("heading", { name: /Welcome ben1/i })
    ).toBeVisible();
  });
});
