import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/bfhl": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },

    plugins: [react()],
});
