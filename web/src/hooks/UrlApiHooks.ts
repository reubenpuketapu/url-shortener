import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

export interface IUrl {
    url: string;
    short: string;
}

export class InvalidUrlError extends Error { }

export const useUrlsApi = (apiUrl: string) => {
    const [data, setData] = useState<IUrl[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [fetch, setFetch] = useState(false);
    const controllerRef = useRef(new AbortController());
    
    const cancel = () => {
      controllerRef.current.abort();
    };

    const refetch = () => {
      setFetch(!fetch)
    }

    const addUrl = async (url : string ): Promise<void> => {
      try{
        await axios.post(`${apiUrl}/urls`, {url: url});  
      }
      catch(error: any){
        if (error instanceof AxiosError && error.response?.status === 400){
         throw new InvalidUrlError();
        }
      }
    }

    useEffect(() => {
      (async () => {
          const response = await axios.request({
            signal: controllerRef.current.signal,
            method: 'get',
            url: `${apiUrl}/urls`,
          });
          setData(response.data);
          setLoaded(true);
      })();
    }, [fetch]);
    
    return { cancel, data, loaded, addUrl, refetch };
};