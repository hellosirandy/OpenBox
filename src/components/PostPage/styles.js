export default () => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 1200,
    paddingTop: 60,
  },
  title: {
    fontSize: '3.5rem',
  },
  imageGrid: {
    width: '100%',
    height: 0,
    paddingTop: '70%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#f2f2f2',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
  },
  contentInner: {
    maxWidth: 700,
  },
  paragraph: {
    fontSize: '1.2rem',
  },
});
