'use client';

import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadModelComponent = () => {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel('/models/image/model.json');
        setModel(loadedModel);
        console.log("Modelo cargado...");
      } catch (error) {
        console.error(error);
      }
    };

    loadModel();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const predictImage = async () => {
    if (!model || !image) return;

    const imgElement = document.createElement('img');
    imgElement.src = image;

    imgElement.onload = async () => {
      const tensorImg = tf.browser.fromPixels(imgElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const predictionResult = await model.predict(tensorImg).data();
      setPrediction(predictionResult);
    };
  };

  return (
    <div>
      <h1>Clasificador de Imágenes</h1>
      {model ? <p>Modelo cargado correctamente</p> : <p>Cargando modelo...</p>}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <Image 
          src={image} 
          alt="Imagen para clasificar" 
          width={224} 
          height={224} 
          style={{ objectFit: 'cover' }} 
        />
      )}
      <button onClick={predictImage} disabled={!model || !image}>Predecir</button>
      {prediction && <p>Predicción: {prediction.join(', ')}</p>}
    </div>
  );
};

export default LoadModelComponent;
