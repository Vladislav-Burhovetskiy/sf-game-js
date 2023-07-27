import { defineConfig } from 'vite';

const config = () => {
    return defineConfig({
        server: {
            host: 'localhost',
            port: 8000
        },
        base: '/sf-game-js/'
    });
};

export default config;
