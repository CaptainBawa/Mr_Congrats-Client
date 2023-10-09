const addTokenToHeaders = () => {
  const token = sessionStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default addTokenToHeaders;
