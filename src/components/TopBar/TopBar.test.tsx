import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TopBar from './TopBar';
import type { RobotPositionInterface } from '../../hooks/useControlRobot';

describe('TopBar Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without errors', () => {
    const mockProps = {
      robotPos: { col: 0, row: 0, direction: 0 as RobotPositionInterface['direction'] },
      handleRightRotation: vi.fn(),
      handleLeftRotation: vi.fn(),
      handleForward: vi.fn()
    };
    
    render(<TopBar {...mockProps} 
      logFinalPosition={vi.fn()}
      rows={5}
      cols={5}
      setRows={vi.fn()}
      setCols={vi.fn()}
      resetPosition={vi.fn()}
      initialRow={0}
      initialCol={0} 
      initialDirection={0}
      setInitialRow={vi.fn()}
      setInitialCol={vi.fn()}
      setInitialDirection={vi.fn()}
    />);
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
  });
});
