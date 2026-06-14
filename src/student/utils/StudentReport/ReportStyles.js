export const colors = {
  primaryDark: '#2E6B3A', // Deep Green
  primaryLight: '#E6F0E2', // Tint Green
  accentGreen: '#7FA86E', // Light Green
  accentYellow: '#fbbf24', // Yellow for highlights
  accentPurple: '#14b8a6', // Teal as a complementary accent instead of purple
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

export const slideWidth = 1920;
export const slideHeight = 1080;

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
    boxSizing: 'border-box'
  },
  titleHuge: {
    fontSize: '120px',
    fontWeight: 900,
    color: colors.primaryDark,
    lineHeight: '1.1',
    margin: 0,
    letterSpacing: '-2px'
  },
  sectionTitle: {
    fontSize: '80px',
    fontWeight: 800,
    color: colors.primaryDark,
    margin: '0 0 40px 0',
    letterSpacing: '-1px'
  },
  bodyText: {
    fontSize: '32px',
    lineHeight: '1.8',
    color: colors.textDark,
    margin: 0,
    fontWeight: 500
  }
};
