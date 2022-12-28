// 专门处理数据的存 取 删 的操作
export function setItem(key, value) { 
  if (typeof value === 'object') { 
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

export function getItem(key) { 
  // 如果是json字符串, 可以使用JSON.parse解析
  // 如果不是,就会报错
  let value = localStorage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch (e) { }
  return value;
}

export function removeItem(key) { 
  localStorage.removeItem(key);
}