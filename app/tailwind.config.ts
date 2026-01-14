import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			dark: {
  				primary: '#0a1628',
  				secondary: '#0f1419',
  				deep: '#051018'
  			},
  			langchain: {
  				purple: {
  					'50': '#faf5ff',
  					'100': '#f3e8ff',
  					'200': '#e9d5ff',
  					'300': '#d8b4fe',
  					'400': '#c084fc',
  					'500': '#a855f7',
  					'600': '#9333ea',
  					'700': '#7e22ce',
  					'800': '#6b21a8',
  					'900': '#581c87',
  					DEFAULT: '#BFB4FD',
  					dark: '#8B7FD9'
  				},
  				green: {
  					text: '#2D7A78',
  					button: '#1D3D3C',
  					primary: '#204544',
  					DEFAULT: '#2D7A78'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			mono: [
  				'var(--font-jetbrains-mono)',
  				'monospace'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'gradient-light': 'radial-gradient(at 40% 20%, rgba(191, 180, 253, 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(45, 122, 120, 0.15) 0px, transparent 50%)',
  			'gradient-dark': 'radial-gradient(at 40% 20%, rgba(191, 180, 253, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(45, 122, 120, 0.2) 0px, transparent 50%)',
  			'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BFB4FD' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  		},
  		boxShadow: {
  			'purple-glow': '0 10px 40px rgba(191, 180, 253, 0.3)',
  			'purple-glow-lg': '0 20px 60px rgba(191, 180, 253, 0.4)',
  			'green-glow': '0 10px 40px rgba(45, 122, 120, 0.3)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
