export {default as Future} from "./Future";
export {of, map, bimap, ap, chain} from "./Future";
export {
  of as ofP,
  map as mapP,
  bimap as bimapP,
  ap as apP,
  chain as chainP,
} from "./Future";

export {default as reject} from "./reject";
export {default as rejectP} from "./reject";

export {tap, tapClone} from "./tap";
export {tap as tapP, tapClone as tapCloneP} from "./tap";

export {default as constant} from "./constant";
export {default as constantP} from "./constant";

export {default as all} from "./all";
export {default as allP} from "./all";

export {default as compose} from "./compose";
export {default as composeP} from "./compose";

export {flow, flow2, flow3, flow4} from "./flow";
export {
  flow as flowP,
  flow2 as flowP2,
  flow3 as flowP3,
  flow4 as flowP4,
} from "./flow";

export {default as fold} from "./fold";
export {default as foldP} from "./fold";

export {collect, collect2, collect3, collect4, collect5} from "./collect";
export {
  collect as collectP,
  collect2 as collectP2,
  collect3 as collectP3,
  collect4 as collectP4,
  collect5 as collectP5,
} from "./collect";

export {flatmap, flatmap2, flatmap3, flatmap4, flatmap5} from "./flatmap";
export {
  flatmap as flatmapP,
  flatmap2 as flatmapP2,
  flatmap3 as flatmapP3,
  flatmap4 as flatmapP4,
  flatmap5 as flatmapP5,
} from "./flatmap";

export {default as caught} from "./caught";
export {default as caughtP} from "./caught";

export {when, whenElse, unless, unlessElse} from "./when";
export {
  when as whenP,
  whenElse as whenElseP,
  unless as unlessP,
  unlessElse as unlessElseP,
} from "./when";

export {lift2, lift3, lift4} from "./liftN";
export {lift2 as liftP2, lift3 as liftP3, lift4 as lift4P} from "./liftN";

export {default as spread} from "./spread";
export {default as spreadP} from "./spread";

export {default as delay} from "./delay";
export {default as delayP} from "./delay";

export {retry, retry2, retry3, retry4} from "./retry";
export {
  retry as retryP,
  retry2 as retryP2,
  retry3 as retryP3,
  retry4 as retryP4,
} from "./retry";

export {default as isPromise} from "./is-promise";
export {default as isPromiseP} from "./is-promise";
