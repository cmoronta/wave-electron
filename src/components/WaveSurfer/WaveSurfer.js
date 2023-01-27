import { Flex, Box, Accordion } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ws from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
import WaveSurferOption from './WaveSurferOption';
import EQ from './EQ';
import PlayerControls from './PlayerControls';

const WS = ({ fileContents }) => {
  // player state
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isRefReady: false,
  });

  // reference for container wavetable to be held in
  const waveformRef = useRef(null);

  // reference to wavesurfer object itself
  const wavesurfer = useRef(null);

  // Create WaveSurfer instance
  useEffect(() => {
    // wavesurfer options
    let wsOptions = {
      container: waveformRef.current,
      plugins: [
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '12px',
          },
        }),
      ],
      barWidth: 3,
      scrollParent: true,
      barHeight: 1,
      waveColor: '#A0AEC0',
      progressColor: '#4880C8',
      responsive: true,
      barGap: 2,
      barRadius: 3,
      cursorWidth: 3,
      backend: 'MediaElementWebAudio',
    };

    wavesurfer.current = ws.create(wsOptions);

    // Create URL for file to create an audio object that can be loaded into
    // wavesurfer
    let blob = new Blob([fileContents]);
    let audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    wavesurfer.current.load(audio);
    wavesurfer.current.on('finish', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    });

    wavesurfer.current.on('error', msg => {
      console.log('Error: ', msg);
    });

    wavesurfer.current.on('ready', () => {
      console.log('WS: ', wavesurfer.current);
      setPlayerState(prev => ({ ...prev, isRefReady: true }));
    });

    // Destroy previous wavesurfer instance on change.
    return () => {
      wavesurfer.current.destroy();
    };
  }, [fileContents, waveformRef]);

  return (
    <Flex width="100%" height="100^%" alignItems="center" flexDir="column">
      <Flex width="100%" alignItems="center" justifyContent="center">
        {/* Waveform div reference */}
        <Box width="100%">
          <div ref={waveformRef} id="waveform"></div>
        </Box>
      </Flex>
      <Box width="100%" pt={8}>
        <Accordion defaultIndex={[0]} allowMultiple allowToggle>
          {/* Player Options */}
          <WaveSurferOption title="Player Controls">
            {playerState.isRefReady && (
              <PlayerControls
                setPlayerState={setPlayerState}
                playerState={playerState}
                wavesurferRef={wavesurfer}
              />
            )}
          </WaveSurferOption>
          {/* EQ */}
          <WaveSurferOption title="EQ">
            {playerState.isRefReady && <EQ wavesurferRef={wavesurfer} />}
          </WaveSurferOption>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default WS;