#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  resolveTimezone,
  formatDate,
  formatTime,
  formatDateTime,
} from "./timezone.js";

const tools = [
  {
    name: "get_date",
    description: "Get the current date only (e.g. 2025-03-15)",
    inputSchema: {
      type: "object" as const,
      properties: {
        timezone: {
          type: "string",
          description:
            'Timezone: "local" | "utc" | IANA string (default: "local")',
        },
      },
    },
  },
  {
    name: "get_time",
    description: "Get the current time only (e.g. 14:30:00)",
    inputSchema: {
      type: "object" as const,
      properties: {
        timezone: {
          type: "string",
          description:
            'Timezone: "local" | "utc" | IANA string (default: "local")',
        },
      },
    },
  },
  {
    name: "get_datetime",
    description: "Get the current date and time (e.g. 2025-03-15 14:30:00)",
    inputSchema: {
      type: "object" as const,
      properties: {
        timezone: {
          type: "string",
          description:
            'Timezone: "local" | "utc" | IANA string (default: "local")',
        },
      },
    },
  },
];

const server = new Server(
  {
    name: "alans-date-time-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const rawTimezone = (args?.timezone as string | undefined) ?? "local";

  try {
    const timezone = resolveTimezone(rawTimezone);
    const date = new Date();

    if (name === "get_date") {
      const dateStr = formatDate(date, timezone);
      return {
        content: [{ type: "text", text: dateStr }],
      };
    }

    if (name === "get_time") {
      const time = formatTime(date, timezone);
      return {
        content: [{ type: "text", text: time }],
      };
    }

    if (name === "get_datetime") {
      const datetime = formatDateTime(date, timezone);
      return {
        content: [{ type: "text", text: datetime }],
      };
    }

    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Alan's Date Time MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
