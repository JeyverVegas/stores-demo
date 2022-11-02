import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useProductCategories = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getProductCategories] = useAxios({ url: '/product-categories', ...axiosConfig }, options);

  const [productCategories, setProductCategories] = useState([]);

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setProductCategories(data.data);
      setTotal(data?.meta?.total);
      setSize(data?.meta?.per_page);
      setNumberOfPages(data.meta?.last_page);
    }

  }, [data, loading, error]);

  return [{ productCategories, total, numberOfPages, size, error, loading }, getProductCategories];
};

export default useProductCategories;
