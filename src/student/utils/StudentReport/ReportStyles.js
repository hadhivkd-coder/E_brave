export const colors = {
  primaryDark: '#2E6B3A', // Deep Green
  primaryLight: '#E6F0E2', // Tint Green
  accentGreen: '#7FA86E', // Light Green
  accentYellow: '#fbbf24', // Gold for highlights
  accentPurple: '#14b8a6', // Teal (retained variable name for ease but colored teal)
  white: '#ffffff',
  textDark: '#22242A',
  textLight: '#f8fafc',
  textMut: '#6E7278',
  
  // Specific trait colors using the green/teal/gold ecosystem
  traitRelationship: '#2E6B3A', // Deep Green
  traitTheoretical: '#7FA86E', // Light Green
  traitStructure: '#0d9488', // Teal
  traitAction: '#ca8a04', // Gold/Yellow
};

export const slideWidth = 1200;
export const slideHeight = 1697; // A4 ratio (1 : 1.414)

export const commonStyles = {
  page: {
    width: `${slideWidth}px`,
    height: `${slideHeight}px`,
    backgroundColor: colors.primaryLight,
    position: 'relative',
    overflow: 'hidden',
    pageBreakAfter: 'always',
    fontFamily: '"Plus Jakarta Sans", "DM Sans", sans-serif',
    display: 'flex',
    flexDirection: 'column', // Essential change for portrait layout
    boxSizing: 'border-box'
  },
  titleHuge: {
    fontSize: '100px',
    fontWeight: 900,
    color: colors.primaryDark,
    lineHeight: '1.1',
    margin: 0,
    letterSpacing: '-2px'
  },
  sectionTitle: {
    fontSize: '60px',
    fontWeight: 800,
    color: colors.primaryDark,
    margin: '0 0 30px 0',
    letterSpacing: '-1px'
  },
  bodyText: {
    fontSize: '28px',
    lineHeight: '1.8',
    color: colors.textDark,
    margin: 0,
    fontWeight: 500
  }
};
