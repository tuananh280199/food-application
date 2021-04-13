export const convertDate = (time) => {
  let date = new Date(Number(time * 1000));
  return `${date.getHours()}:${
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  } ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
