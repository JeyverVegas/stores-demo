import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useUsers = ({ options, axiosConfig } = {}) => {
  const [{ data, error, loading }, getUsers] = useAxios({ url: '/users', ...axiosConfig }, options);

  const [users, setUsers] = useState([]);

  const [total, setTotal] = useState(0);

  const [size, setSize] = useState(0);

  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data) {
      setUsers(data.data);
      setTotal(data?.total);
      setSize(data?.per_page);
      setNumberOfPages(data.last_page);
    }

  }, [data, loading, error]);

  return [{ users, total, numberOfPages, size, error, loading }, getUsers];
};

export default useUsers;
