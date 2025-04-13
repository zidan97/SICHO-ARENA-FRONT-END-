export default function flatObjects(
  obj: Record<string, any>,
  result: Record<string, any> = {}
): Record<string, any> {
  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (typeof obj[i] === "object" && obj[i] !== null) {
        flatObjects(obj[i], result);
      } else {
        result[i] = obj[i];
      }
    }
  }
  return result;
}
