import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleTheme } from '../../store/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa'; // Using react-icons

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5rem; /* Adjust size */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: color ${({ theme }) => theme.transitionSpeed} ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: rotate(15deg);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
     outline-offset: 3px;
  }
`;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <ToggleButton onClick={() => dispatch(toggleTheme())} aria-label="Toggle theme">
      {mode === 'light' ? <FaMoon /> : <FaSun />}
    </ToggleButton>
  );
};

export default ThemeToggle;