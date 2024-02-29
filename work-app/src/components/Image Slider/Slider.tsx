import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "./slider.css";
import { sliderAircraft, sliderProperties, sliderVehicles } from "./sliderData";
import { Box, Grid, Typography } from "@mui/material";

const Slider = ({ aircraft, vehicles }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let slideLength: number;
  let selectedSliderImages;

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

  const autoScroll = true;
  let slideInterval: any;
  let intervalTime = 7000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
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
      {selectedSliderImages.map((slide: any, index: any) => {
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
