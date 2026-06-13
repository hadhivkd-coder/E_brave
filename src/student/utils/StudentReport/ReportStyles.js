export const colors = {
  pGreen: '#2E6B3A',
  sGreen: '#7FA86E',
  tPrim: '#22242A',
  tSec: '#6E7278',
  tMut: '#8A9099',
  bgLight: '#FAFAFA',
  bgWhite: '#FFFFFF',
  bgTint: '#E6F0E2',
  bLine: '#E2E2E3',
};

// A4 aspect ratio at 96 DPI
export const a4Width = 794;
export const a4Height = 1123;

export const commonStyles = {
  page: {
    width: `${a4Width}px`,
    height: `${a4Height}px`,
    backgroundColor: colors.bgLight,
    padding: '60px 70px',
    boxSizing: 'border-box',
    fontFamily: '"Plus Jakarta Sans", "DM Sans", sans-serif',
    color: colors.tPrim,
    position: 'relative',
    overflow: 'hidden',
    pageBreakAfter: 'always'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${colors.bLine}`,
    paddingBottom: '20px',
    marginBottom: '40px'
  },
  title: {
    margin: 0,
    fontSize: '32px',
    color: colors.pGreen,
    fontWeight: 800,
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  },
  sectionTitle: {
    fontSize: '24px',
    color: colors.pGreen,
    borderBottom: `2px solid ${colors.sGreen}`,
    paddingBottom: '10px',
    marginBottom: '25px',
    fontWeight: 800,
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  },
  card: {
    backgroundColor: colors.bgWhite,
    padding: '30px',
    borderRadius: '16px',
    border: `1px solid ${colors.bLine}`,
    marginBottom: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
  },
  bodyText: {
    fontSize: '15px',
    color: colors.tSec,
    lineHeight: '1.8',
    fontFamily: '"DM Sans", sans-serif',
    margin: '0 0 15px 0'
  },
  footer: (pageNum) => ({
    position: 'absolute',
    bottom: '40px',
    left: '70px',
    right: '70px',
    borderTop: `1px solid ${colors.bLine}`,
    paddingTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    color: colors.tMut,
    fontSize: '12px',
    fontWeight: 600
  })
};
