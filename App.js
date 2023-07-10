import React, { useEffect, useState } from 'react';
import AppWrapper from './AppWrapper';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <AppWrapper />
  );
}
