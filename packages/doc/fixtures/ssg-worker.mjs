import { workerData } from "node:worker_threads";

export default function renderPaths({ pathnames }) {
  return pathnames.map((pathname) => `${workerData[1].params.prefix}${pathname}`);
}
