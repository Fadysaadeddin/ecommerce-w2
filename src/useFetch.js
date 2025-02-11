import { useState, useEffect } from "react";

const useFetch = (initialUrl, trigger = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data.");
      const result = await response.json();
      setTimeout(() => {
        setData(result);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUrl) fetchData(initialUrl);
  }, trigger);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
