
export const getAllKeys = (array) => {
  const allKeys = Object.keys(array[0])
  return allKeys;
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const setUniqKeys = (array) => {
   const result = array.forEach((x, i) => {
        x.dndId = String(i + 1)
      })
      return result
}

export const getPaginationData = (array, limit) => {
  const result = []
  for (let i = 0; i < limit; i++) {
    result.push(array.splice(0, 10)) 
  }
  return result;
}

export const getFilterFromKeys = (array, keys) => {
  let result = JSON.parse(JSON.stringify(array))
   result.forEach(x => {
    for (let i = 0; i < keys.length; i++) {
      delete x[keys[i]]
    }
  })
  return result
}
