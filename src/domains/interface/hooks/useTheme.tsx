const theme = {
  color: {
    red: '#FF0000',
    cyan: '#00FFFF',
  },
  background: '#222',
  button: {
    primary: {
      background: '#ffd200',
      text: 'black',
      border: 'rgba(255,255,255,0.4)',
    },
  },
  list: {
    spacing: {
      vertical: 4,
    },
  },
  active: '#ffd200',
  activeText: 'black',
  footer: {
    background: '#000',
  },
  header: {
    background: '#000',
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
    primary: '#ffd200',
    secondary: '#666',
  },
};

export default function useTheme() {
  return theme;
}
