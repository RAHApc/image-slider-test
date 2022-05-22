import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import ImageList from './ImageList';

function App() {
  const [imageListItem, setImageListItem] = useState([]);


  useEffect(() => {
    if (imageListItem.length === 0) {
      const fetchAll = async () => {
        try {
          const result = await axios.get('https://apimocha.com/bearbulltraders/api');
          if (result) {
            setImageListItem(result.data);
            console.log(result.data)
          }
        } catch (error) {
          console.log(error)
        }
      }

      
      fetchAll();
    }
  }, [imageListItem]);




  return (
    <ImageList images={imageListItem} />
  );
}

export default App;
