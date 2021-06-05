const roundHalfRate = (like, dislike) => {
  let rate = 0;
  if (!like && !dislike) {
    rate = 0;
  }
  if (!like && dislike) {
    rate = 0;
  }
  if (like) {
    rate = (1 - dislike / like) * 5;
  }
  return Math.round(rate * 2) / 2;
};

export {roundHalfRate};
