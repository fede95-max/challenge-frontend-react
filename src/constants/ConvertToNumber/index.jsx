const convertToNumber = (value) => {
  var v = Number(value);
  return isNaN(v) ? 0 : v;
};
export default convertToNumber;
