// Types and Interfaces

declare module "moment-random";
type ProcessEnv = string | any;

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;
