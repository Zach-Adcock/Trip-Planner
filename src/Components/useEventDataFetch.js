import { useState, useEffect } from "react";

const useEventDataFetch = (url) => {
    // const abortFetch = new AbortController();

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                // console.log(json);
                setData(json);
                setIsPending(false);
            } catch (error) {
                console.log('error', error)
                setError(error);
                // setIsPending(false);
            }
        }
        fetchData();
        

        // fetch(url, { signal: abortFetch.signal})
        //     .then(res => {
        //         if (!res.ok) {
        //             throw Error('Data is not ok')
        //         }
        //         console.log(res.json());
        //         return res.json();
        //     })
        //     .then(data => {
        //         setData(data);
        //         setIsPending(false);
        //         setError(null);
        //     })
        //     .catch(err => {
        //         if (err.name !== 'AbortError'){
        //             setError(err.message);
        //             setIsPending(false);
        //         }
                
        //     })
        // return () => abortFetch.abort();
    }, [url])
    
    return { data, isPending, error } ;
}
 
export default useEventDataFetch;