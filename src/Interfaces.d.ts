// Types and Interfaces

declare module "moment-random";

type ProcessEnv = string | any;

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;

interface Sol {
  ls: string;
  max_temp: number;
  min_temp: number;
  pressure: number;
  season: string;
  sol: string;
  sunrise: string;
  sunset: string;
  terrestrial_date: string;
}
