import type { Config } from 'tailwindcss'

/**
 * Tailwind is a thin alias layer over styles/tokens.css.
 * Every value here resolves to a var(--*). Nothing is defined here.
 *
 * Default palette, spacing, radius, and easing are REPLACED, not extended —
 * so `bg-white`, `p-5`, `rounded-lg`, `ease-in-out` do not exist and cannot be
 * reached for accidentally. That is the enforcement.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: {
        950: 'var(--ink-950)', 900: 'var(--ink-900)', 850: 'var(--ink-850)',
        800: 'var(--ink-800)', 700: 'var(--ink-700)', 600: 'var(--ink-600)',
        550: 'var(--ink-550)', 400: 'var(--ink-400)', 300: 'var(--ink-300)',
        200: 'var(--ink-200)', 100: 'var(--ink-100)', 50: 'var(--ink-050)',
        0: 'var(--ink-000)',
      },
      patina: {
        600: 'var(--patina-600)', 500: 'var(--patina-500)',
        400: 'var(--patina-400)', 300: 'var(--patina-300)',
      },
      accent: 'var(--accent)',
      'accent-image': 'var(--accent-on-image)',
      surface: {
        void: 'var(--surface-void)', rail: 'var(--surface-rail)',
        raised: 'var(--surface-raised)', frame: 'var(--surface-frame)',
        inverse: 'var(--surface-inverse)',
        'inverse-hover': 'var(--surface-inverse-hover)',
      },
      text: {
        primary: 'var(--text-primary)', secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)', metadata: 'var(--text-metadata)',
        bone: 'var(--text-on-bone)', 'bone-muted': 'var(--text-on-bone-muted)',
        image: 'var(--text-on-image)',
        'image-secondary': 'var(--text-on-image-secondary)',
        'image-muted': 'var(--text-on-image-muted)',
      },
      line: {
        hairline: 'var(--line-hairline)', strong: 'var(--line-strong)',
        bone: 'var(--line-on-bone)',
      },
      ok: 'var(--ok)', warn: 'var(--warn)', err: 'var(--err)', info: 'var(--info)',
    },
    spacing: {
      0: '0px',
      1: 'var(--s-1)', 2: 'var(--s-2)', 3: 'var(--s-3)', 4: 'var(--s-4)',
      5: 'var(--s-5)', 6: 'var(--s-6)', 7: 'var(--s-7)', 8: 'var(--s-8)',
      9: 'var(--s-9)', 10: 'var(--s-10)', 11: 'var(--s-11)', 12: 'var(--s-12)',
      13: 'var(--s-13)',
      seam: 'var(--seam)',
      rail: 'var(--rail-w)',
      'rail-h': 'var(--rail-h)',
      tap: 'var(--tap)',
      'sect-tight': 'var(--sect-tight)', 'sect-normal': 'var(--sect-normal)',
      'sect-wide': 'var(--sect-wide)', 'sect-hero': 'var(--sect-hero)',
    },
    borderRadius: {
      none: 'var(--r-none)',
      soft: 'var(--r-soft)',
      full: 'var(--r-full)',
    },
    boxShadow: {
      none: 'none',
      frame: 'var(--lift-frame)',
      modal: 'var(--lift-modal)',
      focus: 'var(--focus-ring)',
    },
    fontFamily: {
      display: 'var(--font-display)',
      ui: 'var(--font-ui)',
      mono: 'var(--font-mono)',
    },
    fontSize: {
      'd-1': ['var(--d-1-size)', { lineHeight: 'var(--d-1-lh)', letterSpacing: 'var(--d-1-track)' }],
      'd-2': ['var(--d-2-size)', { lineHeight: 'var(--d-2-lh)', letterSpacing: 'var(--d-2-track)' }],
      'd-3': ['var(--d-3-size)', { lineHeight: 'var(--d-3-lh)', letterSpacing: 'var(--d-3-track)' }],
      'd-4': ['var(--d-4-size)', { lineHeight: 'var(--d-4-lh)', letterSpacing: 'var(--d-4-track)' }],
      'd-5': ['var(--d-5-size)', { lineHeight: 'var(--d-5-lh)', letterSpacing: 'var(--d-5-track)' }],
      nano: ['var(--u-nano-size)', { lineHeight: 'var(--u-nano-lh)', letterSpacing: 'var(--u-nano-track)' }],
      micro: ['var(--u-micro-size)', { lineHeight: 'var(--u-micro-lh)', letterSpacing: 'var(--u-micro-track)' }],
      small: ['var(--u-small-size)', { lineHeight: 'var(--u-small-lh)', letterSpacing: 'var(--u-small-track)' }],
      base: ['var(--u-base-size)', { lineHeight: 'var(--u-base-lh)', letterSpacing: 'var(--u-base-track)' }],
      lead: ['var(--u-lead-size)', { lineHeight: 'var(--u-lead-lh)', letterSpacing: 'var(--u-lead-track)' }],
      quote: ['var(--u-quote-size)', { lineHeight: 'var(--u-quote-lh)', letterSpacing: 'var(--u-quote-track)' }],
    },
    transitionDuration: {
      instant: 'var(--t-instant)', fast: 'var(--t-fast)', normal: 'var(--t-normal)',
      medium: 'var(--t-medium)', slow: 'var(--t-slow)', hero: 'var(--t-hero)',
      ambient: 'var(--t-ambient)',
    },
    transitionTimingFunction: {
      out: 'var(--e-out)', inout: 'var(--e-inout)',
      heavy: 'var(--e-heavy)', linear: 'var(--e-linear)',
    },
    screens: {
      sm: '640px', md: '900px', lg: '1200px', xl: '1600px', '2xl': '1920px',
    },
    zIndex: {
      atmosphere: 'var(--z-atmosphere)', content: 'var(--z-content)',
      frame: 'var(--z-frame)', rail: 'var(--z-rail)', overlay: 'var(--z-overlay)',
      modal: 'var(--z-modal)', toast: 'var(--z-toast)',
    },
    extend: {
      aspectRatio: {
        portrait: '3 / 4', editorial: '4 / 5', campaign: '16 / 9', square: '1 / 1',
      },
      maxWidth: {
        content: 'var(--content-max)', body: 'var(--measure-body)', lead: 'var(--measure-lead)',
      },
      backgroundImage: {
        'scrim-bottom': 'var(--scrim-bottom)',
        'scrim-rail': 'var(--scrim-rail)',
        'glow-edge': 'var(--glow-edge)',
      },
      translate: {
        'reveal-near': 'var(--reveal-near)',
        'reveal-mid': 'var(--reveal-mid)',
        'reveal-far': 'var(--reveal-far)',
      },
      height: { strip: 'var(--strip-h)' },
    },
  },
  plugins: [],
}

export default config
