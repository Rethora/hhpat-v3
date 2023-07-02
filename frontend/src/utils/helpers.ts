export const formatInchesToFeetInches = (inches: number) => {
  const feet = Math.floor(inches / 12);
  inches -= feet * 12;

  let resStr = "";

  if (feet !== 0) {
    resStr += feet + "'";
  }
  if (inches !== 0) {
    resStr += " " + inches + '"';
  }

  return resStr.trim();
};
