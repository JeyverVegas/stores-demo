import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useStores = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getStores] = useAxios({ url: '/stores', ...axiosConfig }, options);

  const [stores, setStores] = useState([]);

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setStores(data.data);
      setTotal(data?.meta?.total);
      setSize(data?.meta?.per_page);
      setNumberOfPages(data.meta?.last_page);
    }

  }, [data, loading, error]);

  return [{ stores, total, numberOfPages, size, error, loading }, getStores];
};

export default useStores;
