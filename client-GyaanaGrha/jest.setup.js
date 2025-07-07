import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Provide global TextEncoder/TextDecoder for test compatibility
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// ✅ Safe mocking for Vite's import.meta.env during testing
if (typeof globalThis.import === "undefined") {
  globalThis.import = {};
}

if (typeof globalThis.import.meta === "undefined") {
  globalThis.import.meta = {};
}

if (typeof globalThis.import.meta.env === "undefined") {
  globalThis.import.meta.env = {
    VITE_BASE_URL: "http://localhost:5000", // ✅ Test fallback base URL
  };
}
