import ControllsWrapper from '@/wrappers/ControllsWrapper';
import { PlayState } from './consts';
import TogglableButton from './TogglableButton';

const PlayController = ({
  onStop,
  onPause,
  onStart,
  playState,
}: {
  onStop: () => void;
  onPause: () => void;
  onStart: () => void;
  playState: PlayState;
}) => {
  return (
    <ControllsWrapper>
      <TogglableButton disabled={playState === 'playing'} onClick={onStart}>
        시작
      </TogglableButton>
      <TogglableButton disabled={playState !== 'playing'} onClick={onPause}>
        일시정지
      </TogglableButton>
      <TogglableButton disabled={playState !== 'playing'} onClick={onStop}>
        멈춤
      </TogglableButton>
    </ControllsWrapper>
  );
};

export default PlayController;
