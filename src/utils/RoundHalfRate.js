const roundHalfRate = (like, dislike) => {
  const rate = (1 - dislike / like) * 5;
  return Math.round(rate * 2) / 2;
};

export {roundHalfRate};
