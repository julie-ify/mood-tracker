/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'neutral-0': '#ffffff',
				'neutral-900': '#21214D',
				'neutral-600': '#57577B',
				'neutral-300': '#9393B7',
				'neutral-200': '#CBCDD0',
				'blue-700': '#2A4CD5',
				'blue-600': '#4865DB',
				'blue-300': '#89CAFF',
				'blue-200': '#C7D3F7',
				'blue-100': '#E0E6F4',
				'red-700': '#E60013',
				'red-300': '#FF9B99',
				'indigo-200': '#B8B1FF',
				'green-300': '#89E780',
				'amber-300': '#FFC97C',
				gradient: {
					top: '#F5F5FF',
					bottom: '#E0E0FF',
				},
			},
			fontFamily: {
				reddit: ['"Reddit Sans"', 'sans-serif'],
			},
			fontSize: {
				// b => bold
				// mb => mobile
				// m => medium
				// sb => semibold
				// r => regular
				// i => italic
				'preset-1-b': ['52px', { lineHeight: '140%', letterSpacing: '-0.125em', fontWeight: 'bold' }],
				'preset-1-b-mb': ['46px', { lineHeight: '120%', letterSpacing: '-0.3px', fontWeight: 'bold' }],
				'preset-2-b': ['40px', { lineHeight: '120%', letterSpacing: '-0.3px', fontWeight: 'bold' }],
				'preset-2-b-mb': ['32px', { lineHeight: '120%', letterSpacing: '-0.3px', fontWeight: 'bold' }],
				'preset-3-b': ['32px', { lineHeight: '140%', letterSpacing: '-0.3px', fontWeight: 'bold' }],
				'preset-3-b-mb': ['28px', { lineHeight: '130%', letterSpacing: '-0.3px', fontWeight: 'bold' }],
				'preset-4-sb': ['24px', { lineHeight: '140%', fontWeight: 'semibold' }],
				'preset-4-r': ['24px', { lineHeight: '140%', fontWeight: 'normal' }],
				'preset-5-b': ['20px', { lineHeight: '140%', fontWeight: 'bold' }],
				'preset-6-m': ['18px', { lineHeight: '120%', fontWeight: 'medium' }],
				'preset-6-i': ['18px', { lineHeight: '130%', fontWeight: 'medium' }],
				'preset-6-r': ['18px', { lineHeight: '140%', letterSpacing: '-0.3px', fontWeight: 'normal' }],
				'preset-7-r': ['15px', { lineHeight: '140%', letterSpacing: '-0.3px', fontWeight: 'normal' }],
				'preset-8-sb': ['13px', { lineHeight: '100%', fontWeight: 'semibold' }],
				'preset-9-r': ['12px', { lineHeight: '110%', fontWeight: 'normal' }],
			},

			screens: {
				// mobile is the default
				tablet: '768px',
				desktop: '1440px',
			},
		},
	},
	plugins: [],
};
