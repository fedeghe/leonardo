# Testing Skill for Leonardo

## Description
Run tests automatically after code changes to ensure code quality and prevent regressions.

## Instructions

After any code changes (Write or Edit operations), run `npm test` to verify the changes don't break existing functionality.

## Usage

This skill is automatically triggered after Write or Edit operations.

## Configuration

Add this to your `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm test 2>/dev/null || true",
            "statusMessage": "Running tests..."
          }
        ]
      }
    ]
  }
}
```

## Notes

- Tests run asynchronously and don't block the main workflow
- Failures are reported but don't prevent the operation from completing
- Use `npm run cover` for coverage reports when needed
