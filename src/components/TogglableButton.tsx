import styled from 'styled-components';

const TogglableButton = styled.button.attrs<{ disabled?: boolean }>(
  ({ disabled = false }) => ({
    disabled: disabled,
  })
)`
  border: 1px solid black;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  line-height: 1rem;
  padding: 0.5rem;

  background-color: rgba(255, 255, 255, 0.1);

  &:disabled {
    opacity: 0.5;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export default TogglableButton;
