import React from 'react';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, Paper, Typography } from '@material-ui/core';
import styles from './styles';
import DefaultInput from '../DefaultInput';
import DefaultButton from '../DefaultButton';
import { validate, validateForm } from '../../utils/validation';
import { signUp, signIn } from '../../store/actions/auth';
import { confirmUserAPI } from '../../apis/auth';
import { AUTH_SIGNIN, AUTH_SIGNUP, AUTH_CONFIRM } from '../../store/loadingTypes';

class AuthPage extends React.PureComponent {
  state={
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: ['notEmpty', 'isEmail'],
      },
      password: {
        value: '',
        valid: false,
        validationRules: ['isPassword'],
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: ['equalsTo'],
      },
      confirmationCode: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
      },
      firstName: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
      },
      lastName: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
      },
    },
    submitted: false,
  }
  handleInputChange = key => ({ target: { value } }) => {
    this.setState((prevState) => {
      let additional;
      if (key === 'password') {
        additional = 6;
      } else if (key === 'confirmPassword') {
        additional = prevState.controls.password.value;
      }
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(value, prevState.controls[key].validationRules, additional),
          },
        },
      };
    });
  }
  handleSignUpClick = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { controls } = this.state;
    const valid = validateForm(controls, ['email', 'password', 'confirmPassword', 'firstName', 'lastName']);
    const { onSignUp, history } = this.props;
    if (valid) {
      const {
        controls: {
          email: { value: email }, password: { value: password },
          firstName: { value: firstName }, lastName: { value: lastName },
        },
      } = this.state;
      try {
        await onSignUp(email, password, firstName, lastName);
        history.replace(`/confirm?email=${this.state.controls.email.value}`);
      } catch (e) {
        console.log(e);
        // this.setState({ errorMsg: e });
      }
    }
  }
  handleSignInClick = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { controls } = this.state;
    const valid = validateForm(controls, ['email', 'password']);
    const { onSignIn, history } = this.props;
    if (valid) {
      const {
        controls: {
          email: { value: email }, password: { value: password },
        },
      } = this.state;
      try {
        await onSignIn(email, password);
      } catch (e) {
        if (e.needConfirmation) {
          history.replace(`/confirm?email=${this.state.controls.email.value}`);
        } else {
          // this.setState({ errorMsg: e });
        }
      }
    }
  }
  handleConfirmClick = async (event) => {
    event.preventDefault();
    const { location, history } = this.props;
    const { confirmationCode: { value: code } } = this.state.controls;
    const { email } = qs.parse(location.search);
    this.setState({ submitted: true });
    const valid = validateForm(this.state.controls, ['confirmationCode']);
    if (valid) {
      try {
        await confirmUserAPI(email, code);
        history.replace('/signin');
      } catch (e) {
        console.log(e);
        // this.setState({ errorMsg: e.message });
      }
    }
  }

  handleNavigateClick = (path: string) => () => {
    const { history } = this.props;
    history.replace(path);
  }
  render() {
    const {
      classes, match, location, isLoading,
    } = this.props;
    const url = match.url.replace(/\/$/, '');
    const {
      controls: {
        email, password, confirmPassword, firstName, lastName, confirmationCode,
      },
      submitted,
    } = this.state;
    let content;
    const { email: queryEmail } = qs.parse(location.search);

    if (url === '/signup') {
      content = (
        <div>
          <DefaultInput label="First Name" error={submitted && !firstName.valid} placeholder="first name" value={firstName.value} onChange={this.handleInputChange('firstName')} />
          <DefaultInput label="Last Name" error={submitted && !lastName.valid} placeholder="last name" value={lastName.value} onChange={this.handleInputChange('lastName')} />
          <DefaultInput label="Email" error={submitted && !email.valid} placeholder="email" value={email.value} onChange={this.handleInputChange('email')} />
          <DefaultInput label="Password" error={submitted && !password.valid} placeholder="password" type="password" value={password.value} onChange={this.handleInputChange('password')} />
          <DefaultInput label="Confirm Password" error={submitted && !confirmPassword.valid} placeholder="please enter the password again" type="password" value={confirmPassword.value} onChange={this.handleInputChange('confirmPassword')} />
          <Typography className={classes.navigateButton} variant="h6" color="inherit" onClick={this.handleNavigateClick('/signin')}>Already a member? Sign in</Typography>
          <DefaultButton loading={isLoading} type="submit" onClick={this.handleSignUpClick}>Sign Up</DefaultButton>
        </div>
      );
    } else if (url === '/signin') {
      content = (
        <div>
          <DefaultInput label="Email" error={submitted && !email.valid} placeholder="email" value={email.value} onChange={this.handleInputChange('email')} />
          <DefaultInput label="Password" error={submitted && !password.valid} placeholder="password" type="password" value={password.value} onChange={this.handleInputChange('password')} />
          <Typography className={classes.navigateButton} variant="h6" color="inherit" onClick={this.handleNavigateClick('/signup')}>Not a member yet? Sign up</Typography>
          <DefaultButton loading={isLoading} type="submit" onClick={this.handleSignInClick}>Sign In</DefaultButton>
        </div>
      );
    } else if (url === '/confirm') {
      content = (
        <div>
          <DefaultInput label="Email" disabled placeholder="email" value={queryEmail} onChange={this.handleInputChange('email')} />
          <DefaultInput label="Confirmation Code" error={submitted && !confirmationCode.valid} placeholder="confirmation code" value={confirmationCode.value} onChange={this.handleInputChange('confirmationCode')} />
          <DefaultButton loading={isLoading} type="submit" onClick={this.handleConfirmClick}>Submit</DefaultButton>
        </div>
      );
    }
    return (
      <div className={classes.container}>
        <Paper className={classes.form}>
          <form>
            {content}
          </form>
        </Paper>
      </div>
    );
  }
}

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignUp: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onSignIn: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: Boolean(state.ui.isLoading[AUTH_SIGNIN] ||
      state.ui.isLoading[AUTH_SIGNUP] || state.ui.isLoading[AUTH_CONFIRM]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (email, password, firstName, lastName) =>
      dispatch(signUp(email, password, firstName, lastName)),
    onSignIn: (email, password) => dispatch(signIn(email, password)),
  };
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AuthPage);
