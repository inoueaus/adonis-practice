export const usernameValidator: (value:any) => string | boolean = (value) => {
  if (typeof value === "string") {
    if (value.length <= 50) {
      return value;
    }
  }
  return false;
}