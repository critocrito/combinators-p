import futureApi from "./combinators/future";
import fmapApi from "./combinators/fmap";
import applyApi from "./combinators/apply";
import constantApi from "./combinators/constant";
import allApi from "./combinators/all";
import composeApi from "./combinators/compose";
import flowApi from "./combinators/flow";
import foldApi from "./combinators/fold";
import mapApi from "./combinators/map";
import lift2Api from "./combinators/lift2";

export const future = futureApi;
export const fmap = fmapApi;
export const apply = applyApi;
export const constant = constantApi;
export const all = allApi;
export const compose = composeApi;
export const flow = flowApi;
export const fold = foldApi;
export const map = mapApi;
export const lift2 = lift2Api;

export default {
  future,
  fmap,
  apply,
  constant,
  all,
  compose,
  flow,
  fold,
  map,
  lift2,
};
