/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#8D6E63', // Light Brown
                    DEFAULT: '#5D4037', // Dark Wood Brown
                    dark: '#3E2723', // Very Dark Brown
                },
                secondary: {
                    light: '#FFCC80',
                    DEFAULT: '#E65100', // Deep Orange/Rust (Handmade feel)
                    dark: '#BF360C',
                },
                cream: {
                    light: '#FFFDE7',
                    DEFAULT: '#FFF8E1', // Warm Cream Background
                    dark: '#FFECB3',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
