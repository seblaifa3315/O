import { FetchOptions } from '../../interface/FetchOptions';

const getTheDiver = async (diverId: string | undefined): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/diver/${diverId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getTheDiver;