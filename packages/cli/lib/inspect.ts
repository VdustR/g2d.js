import util from "util";

const inspect = (
  value: Parameters<typeof util.inspect>[0],
  options?: Parameters<typeof util.inspect>[1]
) => {
  return util.inspect(value, {
    compact: false,
    depth: Infinity,
    maxArrayLength: Infinity,
    ...options,
  });
};

export default inspect;
