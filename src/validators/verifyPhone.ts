import phoneNumber from 'google-libphonenumber';

const phoneUtil = phoneNumber.PhoneNumberUtil.getInstance();

const isValidPhoneNumber = (number: string, code: string): boolean => {
  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(number, code);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (error) {
    return false;
  }
};

export { isValidPhoneNumber };
