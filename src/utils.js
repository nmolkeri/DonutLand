export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /(x)|(y)|([-4])/g,
    function (match, p1, p2, p3) {
      if (p1) return Math.floor(Math.random() * 0xf).toString(16);
      if (p2) return Math.floor(Math.random() * 4 + 8).toString(16);
      return p3;
    }
  );
}
