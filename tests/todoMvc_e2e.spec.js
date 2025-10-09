import { test, expect } from '@playwright/test'

test('TodoMVC App e2e acceptance test', async ({ page }) => {
  // GIVEN
  await page.goto('/')
  await page.waitForSelector('#new-todo')

  // WHEN
  await page.locator('#new-todo').click({ delay: 100 })
  await page.locator('#new-todo').fill('Example Todo')
  await page.locator('#new-todo').press('Enter')


  // THEN
  await expect(page.locator('#todo-list>li').filter({ hasText: 'Example Todo' })).toBeVisible()
  await expect(page.locator('#todo-count>strong')).toHaveText('1')

  // WHEN
  await page.locator('#todo-list>li').filter({ hasText: 'Example Todo' }).dblclick()
  await page.locator('#todo-list>li').filter({ hasText: 'Example Todo' }).locator('.edit').fill('Example Todo - Edited')
  await page.locator('#todo-list>li').filter({ hasText: 'Example Todo' }).locator('.edit').press('Enter')

  // THEN
  await expect(page.locator('#todo-list>li').filter({ hasText: 'Example Todo - Edited' })).toBeVisible()

  // WHEN
  await page.locator('#todo-list>li').filter({ hasText: 'Example Todo' }).hover()
  await page.locator('#todo-list>li').filter({ hasText: 'Example Todo' }).locator('.destroy').click()

  // THEN
  await expect(page.locator('#todo-list>li')).toHaveCount(0)
  await expect(page.locator('#todo-count>strong')).toHaveText('0')
})