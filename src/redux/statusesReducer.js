// selectors
export const getStatuses = state => state.statuses;

const statusesReducer = (statePart = [], action) => {
  switch (action.type){
    default:
      return statePart;
  }
};

export default statusesReducer;