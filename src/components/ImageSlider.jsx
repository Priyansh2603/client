import React, { useState, useEffect } from "react";
import { Card, CardMedia, Stack, IconButton } from "@mui/material";

export default function MultiActionAreaCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    
    // "https://wallpapers.com/images/hd/black-animal-lying-cat-f2ovvd5g5sk8sa3m.webp",
    "https://wallpapers.com/images/hd/dark-fantasy-alien-spaceships-zfivud2ri3v4phju.webp",
    "https://wallpapers.com/images/hd/male-deer-in-dusk-wu6smk8q1sixrnea.webp", // Add more image URLs as needed
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 3 seconds (adjust as needed)

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [currentImageIndex, images.length]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Card
      sx={{
        position: "relative",
        width: "90%",
        margin: "0 auto",
        borderRadius: "20px",
        overflow: "hidden",
        height:'full',
        display:'flex',
        alignSelf:'center',
        maxWidth: "90%",
        my:'3em'
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        image={images[currentImageIndex]}
        alt="Image"
        onClick={() =>
          handleImageClick(
            currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
          )
        } // Advance to the next image on click
        style={{ cursor: "pointer", objectFit: "cover" }} // Show pointer cursor on hover
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {images.map((_, index) => (
          <IconButton
            key={index}
            aria-label={`go to slide ${index + 1}`}
            onClick={() => handleImageClick(index)}
            sx={{
              width: 8,
              height: 8,
              padding: 0,
              borderRadius: "50%",
              backgroundColor:
                index === currentImageIndex ? "blue" : "grey.400",
            }}
          />
        ))}
      </Stack>
    </Card>
  );
}
