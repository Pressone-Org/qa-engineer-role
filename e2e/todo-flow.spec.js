
import { test, expect } from '@playwright/test'

test('todo app flow: login, add todos, delete one, logout', async ({ page }) => {
  await page.goto('http://localhost:5173/login')

  // Log in
  await page.fill('input[placeholder="Enter username"]', 'testuser')
  await page.fill('input[placeholder="Enter password"]', 'password')
  await page.click('button:has-text("Login")')
  await expect(page).toHaveURL('http://localhost:5173/')

  // Add 3 todos
  const todos = ['Buy milk', 'Read book', 'Exercise']
  for (const todo of todos) {
    await page.fill('input[placeholder="Add a todo"]', todo)
    await page.keyboard.press('Enter')
    await expect(page.locator('li')).toContainText(todo)
  }

  // Delete second todo
  const secondTodoDeleteBtn = page.locator('li', { hasText: 'Read book' }).getByRole('button')
  await secondTodoDeleteBtn.click()

  // Ensure it's removed
  await expect(page.locator('li')).not.toContainText('Read book')
  await expect(page.locator('li')).toHaveCount(2)

  // Log out (assuming a logout button exists)
  const logoutBtn = page.getByRole('button', { name: /logout/i })
  if (await logoutBtn.isVisible()) {
    await logoutBtn.click()
  }
})
