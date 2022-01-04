'use strict';

const coachDetails = (coach) => {
  let { _id, name, seats } = coach;
  return { _id, name, seats };
};

const coachList = (coaches) => {
  return coaches.map(coach => coachDetails(coach))
}

module.exports = {
  coachDetails,
  coachList
};