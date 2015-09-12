export function colorFromFile(file) {
  // StackOverflow answer is such StackOverflow answer :-(
  let hash = 0;
  let color = '#';
  for (
    let i = 0;
    i < file.name.length;
    hash = file.name.charCodeAt(i++) + ((hash << 5) - hash)
  );
  for (
    let i = 0;
    i < 3;
    color += ('00' + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2)
  );
  return color;
}
