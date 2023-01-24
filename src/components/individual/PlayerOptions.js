import {
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaBackward, FaForward, FaStepBackward, FaStop } from 'react-icons/fa';

const PlayerOptions = () => {
  const labelStyles = {
    mt: '6',
    fontSize: '0.8rem',
  };
  return (
    <VStack p={2} width="100%" spacing={12}>
      {/* Player Control Buttons */}
      <Flex flexDir="row" justifyContent="space-evenly" pt={4} width="100%">
        <IconButton icon={<FaStop />} />
        <IconButton icon={<FaStepBackward />} />
        <IconButton icon={<FaBackward />} />
        <IconButton icon={<FaForward />} />
      </Flex>
      {/* Stereo Panner Slider */}
      <Flex flexDir="row" width="100%">
        <Text width="15%" pr={4}>
          Stereo Panner
        </Text>
        <Slider
          flexGrow="3"
          aria-label="stereo-panner-slider"
          defaultValue={0}
          max={100}
          min={-100}
        >
          <SliderMark value={-100} {...labelStyles}>
            L
          </SliderMark>
          <SliderMark value={0} {...labelStyles}>
            M
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            R
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      {/* Channel Volume Sliders */}
      <Flex width="100%">
        {/* Right Channel Slider */}
        <VStack flexGrow="1" spacing={6} pr={4}>
          <Text>Right Channel Volume</Text>
          <Slider aria-label="right-volume-slider" defaultValue={100}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
        {/* Left Channel Slider */}
        <VStack flexGrow="1" spacing={6} pl={4}>
          <Text>Left Channel Volume</Text>
          <Slider aria-label="left-volume-slider" defaultValue={100}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Flex>
      {/* Speed Slider */}
      <Flex flexDir="row" width="100%" pt={4}>
        <Text width="15%" pr={4}>
          Speed
        </Text>
        <Slider
          flexGrow="3"
          aria-label="stereo-panner-slider"
          defaultValue={100}
          max={100}
          min={25}
        >
          <SliderMark value={25} {...labelStyles}>
            25%
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            50%
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            75%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </VStack>
  );
};

export default PlayerOptions;