import React, { useState, useEffect } from "react";
import "./App.css";

const imageLinks = [
  "https://images-cdn.exchange.art/LiIIKt2aSxyz-JYcnzC8VOO4u7r_QHdayzRgQwN4U_Q?ext=fastly&quality=90&format=pjpg&auto=webp",
  "https://images-cdn.exchange.art/nVRqsVe0zNukK91Xw-mii8YKQ1Ruk9Gef3M9GZhvpqg?ext=fastly&width=500&optimize=high&format=pjpg&auto=webp",
  "https://images-cdn.exchange.art/eAa1BUFCJc_x9XAJpgED-jB8aNsM9tdFPSJK36N5nT4?ext=fastly&width=500&optimize=high&format=pjpg&auto=webp",
  "https://images-cdn.exchange.art/L0_xplZ52jm02gXw8jE4KsLs5vXx_GGcQJw4xR-4mkE?ext=fastly&width=500&optimize=high&format=pjpg&auto=webp",
  "https://images-cdn.exchange.art/fgxVMl3JQcI1g80OFJ5arnowU-waVt-ukPt249JkaQM?ext=fastly&width=500&optimize=high&format=pjpg&auto=webp",
];

const skeletonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwJCiy_yjEWlOZUZm4JfvipYVds5V36p3sg&s";

const extractImageId = (url) => {
  const match = url.match(/\.art\/(.*?)\?/);
  return match ? match[1] : "";
};

const App = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [duplicateImages, setDuplicateImages] = useState([...imageLinks]);
  const [showScreen, setShowScreen] = useState(true);

  const handleImageClick = (image) => {
    setShowScreen(false);

    setTimeout(() => {
      setSelectedImage(image);
      setDuplicateImages(imageLinks.filter((img) => img !== image));
      const imageId = extractImageId(image);
      window.history.pushState(null, "", `/${imageId}`);
      setShowScreen(true);
    }, 1000);
  };

  useEffect(() => {
    const defaultImage = imageLinks[0];
    setSelectedImage(defaultImage);
    setDuplicateImages(imageLinks.filter((img) => img !== defaultImage));
    const imageId = extractImageId(defaultImage);
    window.history.pushState(null, "", `/${imageId}`);
  }, []);

  return (
    <div className="container">
      <div className="selected-image">
        <img
          src={showScreen ? selectedImage : skeletonImage}
          alt="Selected"
          className="large-image"
        />
      </div>
      <div className="thumbnail-container">
        {duplicateImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail-image"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
