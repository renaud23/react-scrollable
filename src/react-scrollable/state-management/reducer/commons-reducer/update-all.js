function updateAll(scrollbar, refs, ...keys) {
  return keys.reduce(function (current, key) {
    const ref = refs[key];
    const value = scrollbar[key];
    if (ref !== value) {
      return { ...current, [key]: ref };
    }
    return current;
  }, scrollbar);
}

export default updateAll;
