export default () => ({
  container: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(249, 249, 249)',
  },
  form: {
    maxWidth: 350,
    width: '100%',
    padding: 24,
  },
  navigateButton: {
    color: 'gray!important',
    fontSize: '1rem!important',
    marginBottom: '16px!important',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  errorMsg: {
    color: 'red',
  },
});
