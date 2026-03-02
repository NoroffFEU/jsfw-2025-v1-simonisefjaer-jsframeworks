import { server } from "./src/mocks/node";
import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll } from "vitest";

// @ts-expect-error - global object doesn't have IS_REACT_ACT_ENVIRONMENT property in TypeScript
global.IS_REACT_ACT_ENVIRONMENT = true;

// NOTE:Configuring the server with onUnhandledRequest: 'error' ensures that an error is thrown whenever there is a request that does not have a corresponding request handler.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

