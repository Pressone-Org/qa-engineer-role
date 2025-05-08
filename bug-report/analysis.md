
### 🐞 Bug Analysis: Duplicate Todo Items

**Bug Source File:** `src/components/Todo.vue`  
**Bug Description:** Rapidly adding the same todo using Enter results in duplicate entries due to ID collision.

---

### 🔁 Steps to Reproduce
1. Navigate to the Todo app.
2. Type a task like "Buy groceries".
3. Press the Enter key quickly multiple times within a second.
4. Observe multiple identical todos appearing.
5. Delete one; multiple may be removed if they share the same ID.

---

### 🧠 Root Cause Hypothesis

The bug stems from this line in `addTodo()`:

```js
id: Math.floor(Date.now() / 1000)
```

Since the ID is generated using the current Unix timestamp in seconds, pressing Enter multiple times within the same second assigns the same `id` to multiple todos. Vue’s reactivity system uses `:key="todo.id"` in `v-for`, so duplicated IDs confuse DOM diffing and update logic.

---

### ✅ Suggested Fix

Use a more reliable ID generator, such as:
```js
id: crypto.randomUUID()
```
Or:
```js
id: Date.now() + Math.random()
```

---

### 🛡️ Preventing Regression

- Add a **unit test** to verify that every added todo gets a unique ID.
- Add an **E2E test** to simulate rapid entries and confirm only unique entries persist.
- Implement **debounce or disable the input temporarily** after submission for a short time.

