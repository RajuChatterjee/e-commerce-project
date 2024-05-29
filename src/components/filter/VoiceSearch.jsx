import React, { useState, useEffect,useContext } from 'react';
import myContext from '../../context/data/myContext'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Layout from '../../components/layout/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
const VoiceSearch = () => {
    const [isListening, setIsListening] = useState(false);
    const [query, setQuery] = useState('');
    const [recognition, setRecognition] = useState(null);

    const context = useContext(myContext)
    const { mode, searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice, product } = context

     const dispatch = useDispatch()
    const cartItems = useSelector((state)=> state.cart);
    console.log(cartItems)
  
    const addCart = (product)=> {
        dispatch(addToCart(product));
        toast.success('add to cart',{ position: "top-center",autoClose: 1000,});
  
    }
  
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  


    useEffect(() => {
      // Check if the browser supports the Web Speech API
      if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support voice recognition. Try Google Chrome.');
      } else {
        // Initialize the webkitSpeechRecognition object
        const speechRecognition = new window.webkitSpeechRecognition();
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;
        speechRecognition.lang = 'en-US';
  
        speechRecognition.onstart = () => {
          setIsListening(true);
        };
  
        speechRecognition.onend = () => {
          setIsListening(false);
        };
  
        speechRecognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          console.log('Voice Input:', transcript);
          // Here you can add code to handle the search functionality using the 'transcript'
        
        };
  
        speechRecognition.onerror = (event) => {
          console.error('Speech Recognition Error', event.error);
        };
  
        setRecognition(speechRecognition);
      }
    }, []);
  
    const startListening = () => {
      if (recognition) {
        recognition.start();
      }
      
    
    };
  
    const stopListening = () => {
      if (recognition) {
        recognition.stop();
      }
    };

  return (
    <div>
    {/* <h1>Voice Search</h1> */}
    <div className='px-4 py-2  text-sm font-medium rounded-md'>

    
    <button onClick={startListening} disabled={isListening}  >
      
      {isListening ? 'Listening...' : '.'} <img className="inline-block w-10 h-10 rounded-full" src= "https://i.pinimg.com/originals/f7/26/64/f726649c44ad675da83a91fe99bf1955.png"></img>
    </button>
    <button onClick={stopListening} disabled={!isListening}>
      ...
      
    </button>
    <p>. {query}</p>
    
   
    
     
    </div>

  </div>
  );
};

export default VoiceSearch


