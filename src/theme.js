import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#232323',
      main: '#333333',
      dark: '#5b5b5b',
    },
    secondary: {
      light: '#b2b2b2',
      main: '#ffffff',
      dark: '#ffffff',
    },
  },
});

