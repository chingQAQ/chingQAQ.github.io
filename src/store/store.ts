import { reactive } from 'vue';
import axios from 'axios';

export type DataType<T> = Array<{
  [property: string]: T
}>

export type About = {
  [property: string]: DataType<string | About> | any
}

export interface State {
  store: Content
  [property: string]: unknown
}

interface Content {
  about: About
  portfolio: DataType<string>
}

axios.defaults.baseURL = 'http://localhost:8000';

const state = reactive<State>({
  store: {
    about: {},
    portfolio: []
  },
  storeUpdate: (val: Content) => state.store = val
});

const getUserRepositories = async (url: string): Promise<any> => {
  let user = null;
  try {
    const response = await axios.get(url);
    user = response.data;
  } catch (error) {
    handleUnexpectedError(error as unknown);
  }

  return user;
};

const handleUnexpectedError = ({ response }: any) => {
  if (response.status === 404) {
    console.log(`${response.status} ${response.statusText}`);
  }
};

async function init(fetch: Promise<any>) {
  state.store = await fetch;

  return state.store;
}

export {
  state,
  init,
  getUserRepositories,
  handleUnexpectedError
};
