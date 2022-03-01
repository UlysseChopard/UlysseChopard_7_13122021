export const isGroupomaniaEmail = (val) =>
  val.test(/@groupomania.com$/)
    ? true
    : "Email address must end with @groupomania.com";
