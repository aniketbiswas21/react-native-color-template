import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useColors = navigation => {
  const [colors, setColors] = useState([]);
  const [fetchState, setFetchState] = useState('idle');
  const [newPalette, setNewPalette] = useState(null);

  const fetchColors = useCallback(async () => {
    setFetchState('pending');
    const res = await axios.get(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    if (res.status === 200) {
      setColors(res.data);
      setFetchState('success');
    } else {
      setFetchState('error');
    }
  }, []);

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (navigation.params) {
      setNewPalette(navigation.params.params.newPalette);
    }
  }, [navigation]);

  useEffect(() => {
    if (newPalette) {
      setColors([...colors, newPalette]);
    }
  }, [newPalette]);

  return [colors, fetchColors, fetchState];
};

export default useColors;
