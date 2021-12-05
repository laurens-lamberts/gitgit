const COLOR_PRIMARY = '#ffd200';
const COLOR_DIMMED_WHITE = 'rgba(255,255,255,0.4)';

const theme = {
  background: '#222',
  button: {
    primary: {
      background: COLOR_PRIMARY,
      text: 'black',
      border: COLOR_DIMMED_WHITE,
      inactive: COLOR_DIMMED_WHITE,
    },
  },
  list: {
    spacing: {
      vertical: 4,
    },
  },
  text: {
    dimmed: COLOR_DIMMED_WHITE,
  },
  active: COLOR_PRIMARY,
  activeText: 'black',
  footer: {
    background: '#000',
  },
  header: {
    background: '#000',
    border: COLOR_PRIMARY,
  },
  sidebarLeft: {
    background: '#111',
  },
  sidebarRight: {
    background: '#111',
  },
  center: {
    background: '#222',
  },
  diff: {
    added: COLOR_PRIMARY,
    removed: '#E94F37',
  },
  logo: {
    primary: COLOR_PRIMARY,
    secondary: '#666',
  },
  fonts: {
    monospace: 'courier new',
  },
};

export default function useTheme() {
  return theme;
}
