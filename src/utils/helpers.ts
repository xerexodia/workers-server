const bcrypt = require('bcrypt');

export function hashIt(pwd: string | undefined) {
  return bcrypt.hashSync(pwd, 10) as string;
}
export async function compareIt(pwd: string | undefined, hashedPwd: string | undefined) {
  return (await bcrypt.compareSync(pwd, hashedPwd)) as boolean;
}
