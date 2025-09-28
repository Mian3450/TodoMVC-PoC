import { test, expect } from '@playwright/test'
import { TodosPage } from '../pages/Todos'
import { GIVEN, WHEN, THEN } from '../src/gherkin'

test('TodoMVC App e2e acceptance test', async ({ page }) => {
  /** @type {TodosPage} */
  let todosPage

  await GIVEN('Go to the TodoMVC app', async () => {
    todosPage = new TodosPage(page)
    await todosPage.goto()
  })

  await WHEN('Add a new todo', async () => {
    await todosPage.addTodo('Example Todo')
  })

  await THEN('Should see the new todo in the list', async () => {
    await expect(todosPage.todo('Example Todo').locator).toBeVisible()
    await expect(todosPage.todoCount).toHaveText('1')
  })

  await WHEN('Toggle the todo', async () => {
    await todosPage.todo('Example Todo').toggle()
  })

  await THEN('The todo should be marked as completed', async () => {
    expect(await todosPage.todo('Example Todo').isCompleted()).toBe(true)
    await expect(todosPage.todoCount).toHaveText('0')
  })

  await WHEN('Uncheck the todo', async () => {
    await todosPage.todo('Example Todo').toggle()
  })

  await THEN('The todo should be active again', async () => {
    expect(await todosPage.todo('Example Todo').isCompleted()).toBe(false)
    await expect(todosPage.todoCount).toHaveText('1')
  })

  await WHEN('Edit the todo text', async () => {
    await todosPage.todo('Example Todo').edit('Example Todo - Edited')
  })

  await THEN('The todo should have updated text', async () => {
    await expect(todosPage.todo('Example Todo - Edited').locator).toBeVisible()
  })

  await WHEN('Delete the todo', async () => {
    await todosPage.todo('Example Todo - Edited').delete()
  })

  await THEN('The todo list should be empty', async () => {
    await expect(todosPage.todoItems).toHaveCount(0)
    await expect(todosPage.todoCount).toHaveText('0')
  })

  await WHEN('Toggle all todos', async () => {
    await todosPage.addTodo('Task 1')
    await todosPage.addTodo('Task 2')
    await todosPage.toggleAll()
  })

  await THEN('All todos should be marked as completed', async () => {
    expect(await todosPage.todo('Task 1').isCompleted()).toBe(true)
    expect(await todosPage.todo('Task 2').isCompleted()).toBe(true)
    await expect(todosPage.todoCount).toHaveText('0')
  })

  await WHEN('Clear completed todos', async () => {
    await todosPage.addTodo('Task 3')
    await todosPage.clearCompleted()
  })

  await THEN('Only active todos should remain', async () => {
    await expect(todosPage.todo('Task 3').locator).toBeVisible()
    expect(await todosPage.todo('Task 3').isCompleted()).toBe(false)
    await expect(todosPage.todoCount).toHaveText('1')
  })

  await WHEN('Apply todo filters', async () => {
    await todosPage.addTodo('Task 1')
    await todosPage.addTodo('Task 2')
    await todosPage.todo('Task 1').toggle()
  })

  await THEN('The filter should show correct todos', async () => {
    await todosPage.filterTodos('active')
    await expect(todosPage.todo('Task 2').locator).toBeVisible()
    await expect(todosPage.todo('Task 3').locator).toBeVisible()

    await todosPage.filterTodos('completed')
    await expect(todosPage.todo('Task 1').locator).toBeVisible()

    await todosPage.filterTodos('all')
    await expect(todosPage.todo('Task 1').locator).toBeVisible()
    await expect(todosPage.todo('Task 2').locator).toBeVisible()
    await expect(todosPage.todo('Task 3').locator).toBeVisible()
  })
})
