/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#f4e9e9",
                    "100": "#e3c9c9",
                    "200": "#d0a4a4",
                    "300": "#b97b7b",
                    "400": "#9d4f4f",
                    "500": "#661212",
                    "600": "#5c1010",
                    "700": "#4d0d0d",
                    "800": "#3f0b0b",
                    "900": "#340a0a",
                    "950": "#1d0505"
                },
                secondary: {
                    "50": "#fdf9ec",
                    "100": "#faefd1",
                    "200": "#f5e0a3",
                    "300": "#f0d074",
                    "400": "#ebca54",
                    "500": "#e7c13a",
                    "600": "#d9a72c",
                    "700": "#b58223",
                    "800": "#946620",
                    "900": "#79521c",
                    "950": "#462b0e"
                },
                neutral: {
                    "0": "#ffffff",
                    "50": "#f9fafb",
                    "100": "#f3f4f6",
                    "200": "#e5e7eb",
                    "300": "#d1d5db",
                    "400": "#9ca3af",
                    "500": "#6b7280",
                    "600": "#4b5563",
                    "700": "#374151",
                    "800": "#1f2937",
                    "900": "#111827",
                    "950": "#030712"
                },
                success: {
                    "50": "#f0fdf4",
                    "500": "#22c55e",
                    "600": "#16a34a"
                },
                warning: {
                    "50": "#fffbeb", 
                    "500": "#f59e0b",
                    "600": "#d97706"
                },
                error: {
                    "50": "#fef2f2",
                    "500": "#ef4444", 
                    "600": "#dc2626"
                }
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
                'header': '50',
                'sidebar': '45', 
                'overlay': '40',
                'dropdown': '60'
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem'
            }
        },
        fontFamily: {
            'body': [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ],
            'sans': [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ]
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

