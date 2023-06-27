const authMessage = {
  register: {
    exists: 'User with this email or username already exists.',
    userExists: 'Account already exists. Please login.',
    userExistsEmail: 'Account with email already exists.',
    userExistsPhone: 'Account with phone already exists.',
    mailError: 'Error sending verification mail to email.',
    success: 'User registered Successfully.',
    error: 'Error registering user.',
  },
  login: {
    noUserExists: "Account doesn't exists. Please register.",
    noUserPasswordSocial: 'Please use social login or use forgot password to get new password.',
    noUserPassword: 'Error with your account.Please contact administrator.',
    notAdminRole: "User doesn't have enough permission.",
    invalidPassword: 'Invalid Credential. Please Try again.',
    emailNotVerified: 'Your account is not verified yet. A new verification email has been sent. Please verify.',
    success: 'User logged in successfully.',
    error: 'Error logging in user. Please try again',
  },
  mailServerError: 'Mail server is not working. Please try again later.',
};

export default authMessage;
