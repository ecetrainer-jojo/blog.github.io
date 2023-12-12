module.exports = {
    extends: ['eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'airbnb',
        'plugin:react/recommended',
        'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        "project": "./tsconfig.json"
    },
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    rules: {
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ]
    }
};