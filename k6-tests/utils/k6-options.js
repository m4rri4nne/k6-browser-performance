export const browserOptions = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 15,
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};