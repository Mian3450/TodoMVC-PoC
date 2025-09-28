import { App } from './App'

class TodoItem {
  /**
   * @param {import('@playwright/test').Locator} locator
   */
  constructor(locator) {
    this.locator = locator
  }

  async toggle() {
    await this.locator.locator('.toggle').click()
  }

  async delete() {
    await this.locator.hover()
    await this.locator.locator('.destroy').click()
  }

  async edit(newText) {
    await this.locator.dblclick()
    const editInput = this.locator.locator('.edit')
    await editInput.fill(newText)
    await editInput.press('Enter')
  }

  async text() {
    return this.locator.innerText()
  }

  async isCompleted() {
    return (await this.locator.getAttribute('class'))?.includes('completed')
  }
}

export class TodosPage extends App {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page)
    this.page = page
    this.newTodoInput = page.locator('#new-todo')
    this.todoItems = page.locator('#todo-list>li')
    this.todoCount = page.locator('#todo-count>strong')
    this.toggleAllCheckbox = page.locator('#toggle-all')
    this.clearCompletedButton = page.locator('#clear-completed')
    this.filters = {
      all: page.locator('a[href="#/"]'),
      active: page.locator('a[href="#/active"]'),
      completed: page.locator('a[href="#/completed"]'),
    }
  }

  async goto() {
    await super.goto('/')
    await this.page.waitForSelector('#new-todo')
  }

  async addTodo(todoText) {
    await this.newTodoInput.click({ delay: 100 })
    await this.newTodoInput.fill(todoText)
    await this.newTodoInput.press('Enter')
  }

  todo(text) {
    const locator = this.todoItems.filter({ hasText: text })
    return new TodoItem(locator)
  }

  async toggleAll() {
    await this.toggleAllCheckbox.click()
  }

  async clearCompleted() {
    await this.clearCompletedButton.click()
  }

  async filterTodos(filter) {
    await this.filters[filter].click()
  }

  async getTodoCount() {
    const countText = await this.todoCount.textContent()
    return parseInt(countText)
  }

  async getTodos() {
    return this.todoItems.allInnerTexts()
  }
}
