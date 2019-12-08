export const encode = data => {
  try { return window.btoa(JSON.stringify(data)); }
  catch(e) { return null; }
}
export const decode = b64 => {
  try { return JSON.parse(window.atob(b64)) }
  catch(e) { return null; }
}
