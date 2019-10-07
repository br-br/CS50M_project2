export const reformatDate = dateStr => {
  dArr = dateStr.split('-');
  return dArr.length === 3
    ? dArr[2] + '. ' + dArr[1] + '. ' + dArr[0]
    : dArr.length === 1
    ? dArr[0]
    : 'unknown';
};
