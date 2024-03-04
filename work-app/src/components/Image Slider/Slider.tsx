import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Box, Grid, Typography } from "@mui/material";

import "./slider.css";
import { sliderAircraft, sliderProperties, sliderVehicles } from "./sliderData";

interface SliderProps {
  aircraft?: boolean;
  vehicles?: boolean;
}

interface SliderImage {
  image: string;
  heading: string;
  desc: string;
}

const Slider: React.FC<SliderProps> = ({ aircraft, vehicles }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  let slideLength: number;
  let selectedSliderImages: SliderImage[];

  if (aircraft) {
    slideLength = sliderAircraft.length;
    selectedSliderImages = sliderAircraft;
  } else if (vehicles) {
    slideLength = sliderVehicles.length;
    selectedSliderImages = sliderVehicles;
  } else {
    slideLength = sliderProperties.length;
    selectedSliderImages = sliderProperties;
  }

  const autoScroll: boolean = true;
  let slideInterval: NodeJS.Timeout;
  let intervalTime: number = 7000;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slideLength - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slideLength - 1 : prevSlide - 1
    );
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      sx={{
        width: "100%",
        height: "58vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {selectedSliderImages.map((slide: SliderImage, index: number) => {
        return (
          <Box
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <Box>
                <Box
                  component="img"
                  src={slide.image}
                  alt="slide"
                  className="image"
                />
                <Box className="content">
                  <Typography variant="h4">{slide.heading}</Typography>
                  <Typography>{slide.desc}</Typography>
                  <hr />
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Grid>
  );
};

export default Slider;
