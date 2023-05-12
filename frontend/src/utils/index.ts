export const isStringEmptyOrNullOrUndefined = (str: any) =>
  typeof str !== 'string' ||
  /^\s*$/.test(str) ||
  str.length == 0 ||
  str === '' ||
  !str ||
  str === 'undefined' ||
  str === 'null'
