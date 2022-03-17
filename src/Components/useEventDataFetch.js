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
                setData(json);
                setIsPending(false);
            } catch (error) {
                console.log('error', error)
                setError(error);
                // setIsPending(false);
            }
        }
        fetchData();    
    }, [])
    
    return { data, isPending, error } ;
}
 
export default useEventDataFetch;