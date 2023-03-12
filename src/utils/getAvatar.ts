const getAvatar = (s: string) => {
  if (!s) return;
  const name = s.substring(0, s.indexOf("_"));
  return `https://storage.googleapis.com/satang-pro/public/assets/icons/coins/${name.toLocaleLowerCase()}.png`;
};

export default getAvatar;
