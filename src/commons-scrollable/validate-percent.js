function validate(percent) {
  return typeof percent === "number" ? Math.min(Math.max(percent, 0), 1) : 0;
}

export default validate;
