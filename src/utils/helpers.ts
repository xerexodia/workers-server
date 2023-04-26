const bcrypt = require('bcrypt');

export function hashIt(pwd: string | undefined) {
  return bcrypt.hashSync(pwd, 10) as string;
}
export function compareIt(pwd: string | undefined, hashedPwd: string | undefined): boolean {
  const compare = bcrypt.compareSync(pwd, hashedPwd);
  return compare;
}

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
