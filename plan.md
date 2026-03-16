# Plan

An MCP server with 2 tools (each accepts optional `timezone` parameter):

- `get_time` — time only (e.g. 14:30:00). `timezone`: "local" | "utc" | IANA string (default: "local")
- `get_datetime` — date and time (e.g. 2025-03-15 14:30:00). Same `timezone` param

Written in TypeScript.

Configuration:

Name: Alan's Date Time MCP
GitHub repo: <https://github.com/ajnx/alans-date-time-mcp>

Or:

```json
{
  "mcpServers": {
    "alans-date-time-mcp": {
      "command": "npx",
      "args": ["-y", "github:ajnx/alans-date-time-mcp"]
    }
  }
}
```
