
# E2E Test Notes

## ✅ Flakiness Handling
- We use `expect(...).toHaveCount()` and `expect(...).toContainText()` to avoid brittle DOM assertions.
- Avoid hard waits; we rely on Playwright's auto-waiting.

## 🧪 Failure Reporting
- Add `--trace on` when running tests to enable trace viewer.
- Screenshots and videos can be enabled via config.

## ⚙️ CI Integration
- Add the following to GitHub Actions `.yml` file:
```yaml
- name: Run Playwright Tests
  run: npx playwright install && npx playwright test
```
- Use `playwright.config.ts` for timeouts and retries.
