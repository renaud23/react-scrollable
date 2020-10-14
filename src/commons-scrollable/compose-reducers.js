function compose(...reducers) {
  return reducers.reduce(
    function (a, b) {
      return (state, action) => a(b(state, action), action);
    },
    (state) => state
  );
}

export default compose;
