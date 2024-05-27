import ControllsWrapper from '@/wrappers/ControllsWrapper';

const PlayController = ({
  onStop,
  onPause,
  onStart,
}: {
  onStop: () => void;
  onPause: () => void;
  onStart: () => void;
}) => {
  return (
    <ControllsWrapper>
      <button onClick={onStop}>🛑</button>
      <button onClick={onPause}>⏸️</button>
      <button onClick={onStart}>▶️</button>
    </ControllsWrapper>
  );
};

export default PlayController;
