export const colors = {
  primaryDark: '#1a365d', // Dark Navy Blue
  primaryLight: '#bfdbfe', // Light Blue Background
  accentPurple: '#7c3aed', // Purple for cards/accents
  accentYellow: '#fbbf24', // Yellow for highlights
  accentGreen: '#10b981', // Green for positive indicators
  accentRed: '#ef4444', // Red for warnings/low indicators
  white: '#ffffff',
  textDark: '#1e293b',
  textLight: '#f8fafc',
  
  // Specific trait colors from the PDF
  traitRelationship: '#6366f1', // Indigo
  traitTheoretical: '#7dd3fc', // Light blue
  traitStructure: '#1e3a8a', // Very dark blue
  traitAction: '#0d9488', // Teal
};

// Landscape Slide Aspect Ratio
export const slideWidth = 1920;
export const slideHeight = 1080;

export const commonStyles = {
  page: {
    width: `${slideWidth}px`,
    height: `${slideHeight}px`,
    backgroundColor: colors.primaryLight, // Default to light blue like most slides
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
    margin: 0
  },
  sectionTitle: {
    fontSize: '80px',
    fontWeight: 800,
    color: colors.primaryDark,
    margin: '0 0 40px 0'
  },
  bodyText: {
    fontSize: '36px',
    lineHeight: '1.6',
    color: colors.textDark,
    margin: 0
  }
};
