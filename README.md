## **TodoMVC Functional Map**

### **1. Task Management (Core Features)**

#### 1.1. Add a New Todo

* **Description:** The user types text into the input field and presses **Enter**.
* **Result:**

  * A new todo item appears in the list.
  * The input field is cleared.
  * The active task counter increases.
* **Rules:**

  * Empty entries are ignored.

#### 1.2. Mark a Todo as Completed

* **Description:** Clicking the checkbox next to a todo marks it as completed.
* **Result:**

  * The item’s text becomes crossed out.
  * The `.completed` CSS class is added.
  * The active counter decreases.

#### 1.3. Uncheck a Completed Todo

* **Description:** Clicking the checkbox again reverts the todo to the active state.
* **Result:**

  * The `.completed` class is removed.
  * The text returns to normal.
  * The active counter increases.

#### 1.4. Edit a Todo

* **Description:** Double-clicking a todo enters edit mode.
  The user can modify the text and confirm with **Enter**.
* **Result:**

  * The text updates.
  * Pressing **Esc** cancels editing.
  * Submitting an empty edit may delete the item (depending on implementation).

#### 1.5. Delete a Todo

* **Description:** Hovering over a todo shows a **“✖” (destroy)** button. Clicking it removes the todo.
* **Result:**

  * The todo is removed from the list.
  * The counter updates accordingly.

---

### **2. Bulk Actions**

#### 2.1. Toggle All

* **Description:** A checkbox at the top toggles all todos at once.
* **Result:**

  * If all todos are active → they become completed.
  * If some are completed → all revert to active.
  * The counter updates accordingly.

#### 2.2. Clear Completed

* **Description:** The “Clear completed” button appears when there are completed todos.
* **Result:**

  * All `.completed` items are removed.
  * The button hides again when no completed todos remain.

---

### **3. Filtering**

#### 3.1. “All”

* **Shows:** All todos, regardless of completion status.

#### 3.2. “Active”

* **Shows:** Only active (non-completed) todos.

#### 3.3. “Completed”

* **Shows:** Only completed todos.

* **Additional behavior:**

  * The active filter is visually highlighted (`.selected` class).
  * Filter state changes based on URL hash:

    * `#/` → All
    * `#/active` → Active
    * `#/completed` → Completed

---

## **Features list**

| Category               | Features                        |
| ---------------------- | ------------------------------- |
| **CRUD**               | Add, Edit, Delete               |
| **Status**             | Complete / Uncomplete           |
| **Filters**            | All, Active, Completed          |
| **Bulk Actions**       | Toggle All, Clear Completed     |

---
