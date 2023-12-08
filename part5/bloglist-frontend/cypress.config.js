import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        defaultCommandTimeout: 10000,
        baseUrl: "http://localhost:5173",
        env: {
            BACKEND: "http://localhost:3003/api",
        },
    },
});
