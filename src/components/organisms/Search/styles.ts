import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;

  mark {
    background: ${({ theme: { colors } }) => colors.secondary};
  }
`;

export const Suggestions = styled.div<{ width?: string }>`
  ${({ width }) => width && `width: ${width}`};
  border-radius: 3px;
  height: 250px;
  overflow-y: auto;
  position: absolute;
  margin-top: 11.2em;
  padding: 0;
`;

export const Suggestion = styled.div<{ focused: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 1em;
  border: 1px solid ${({ theme: { colors } }) => colors.grey};
  transition: background 0.2s;
  white-space: pre;

  &:hover {
    cursor: pointer;
  }

  ${({ focused, theme: { colors } }) =>
    focused && `background: ${colors.secondary}`};
`;
