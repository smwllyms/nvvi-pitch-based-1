export function parseCurrentDirectory() {
  // Use an artificial error to extract file path from stack trace
  let currentFile = new Error().stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)[0];

  // Get rid of URL (skip http/https)
  return currentFile.substring(currentFile.indexOf("/", 8));
}