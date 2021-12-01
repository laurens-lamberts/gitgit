const theme = {
  color: {
    red: '#FF0000',
    cyan: '#00FFFF',
  },
  background: '#222',
  button: {
    primary: {
      background: '#666',
      text: 'white',
      border: 'rgba(255,255,255,0.4)',
    },
  },
  list: {
    spacing: {
      vertical: 4,
    },
  },
  active: '#666',
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
};

export default function useTheme() {
  return theme;
}
