import axios from "axios";
import { useEffect, useRef, useState } from "react";

export interface IUrl {
    url: string;
    short: string;
}

export const useListUrls = () => {
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

    useEffect(() => {
      (async () => {
          const response = await axios.request({
            signal: controllerRef.current.signal,
            method: 'get',
            url: 'http://localhost/urls',
          });
          setData(response.data);
          setLoaded(true);
      })();
    }, [fetch]);
    return { cancel, data, loaded, refetch };
};