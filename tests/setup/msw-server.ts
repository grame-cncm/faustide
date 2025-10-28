import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";

/**
 * Central MSW server used by Vitest suites.
 * Individual tests can override handlers per spec.
 */
export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
