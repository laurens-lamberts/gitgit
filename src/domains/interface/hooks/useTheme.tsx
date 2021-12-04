const COLOR_PRIMARY = '#ffd200';

const theme = {
  color: {
    red: '#FF0000',
    cyan: '#00FFFF',
  },
  background: '#222',
  button: {
    primary: {
      background: COLOR_PRIMARY,
      text: 'black',
      border: 'rgba(255,255,255,0.4)',
    },
  },
  list: {
    spacing: {
      vertical: 4,
    },
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
  logo: {
    primary: COLOR_PRIMARY,
    secondary: '#666',
  },
};

export default function useTheme() {
  return theme;
}
