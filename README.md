# Alan's Date Time MCP

An MCP (Model Context Protocol) server that provides current time and datetime with timezone support.

## Tools

- **`get_time`** — Returns time only (e.g. `14:30:00`)
- **`get_datetime`** — Returns date and time (e.g. `2025-03-15 14:30:00`)

Both tools accept an optional `timezone` parameter:

- `"local"` (default) — System's local timezone
- `"utc"` — UTC
- IANA timezone string — e.g. `"America/New_York"`, `"Europe/London"`, `"Asia/Tokyo"`

## Installation

Add to your MCP configuration (e.g. Cursor, Claude Desktop):

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

## Development

```bash
npm install
npm run build
npm start
```

## License

MIT
