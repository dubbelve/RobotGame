import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Grid from './Grid';
import type { RobotPositionInterface } from '../../hooks/useControlRobot';

describe('Grid Component', () => {
  const rows = 5;
  const cols = 10;

  it('renders grid', () => {
    const mockProps = {
      rows,
      cols,
      robotPos: { col: 0, row: 0, direction: 0 as RobotPositionInterface['direction'] }
    };

    render(<Grid {...mockProps} />);
    
    const coordinateCells = screen.getAllByTestId('grid-cell');
    const robot = screen.getByTestId('robot-sprite');
    const totalCells = coordinateCells.length + 1;
    
    expect(totalCells).toBe(rows * cols);
    expect(robot).toBeInTheDocument();
  });

  it('displays robot', () => {
    const directionToIndex = { 0: 0, 90: 1, 180: 2, 270: 3 };
    const mockProps = {
      rows,
      cols,
      robotPos: { col: 5, row: 2, direction: 90 as RobotPositionInterface['direction'] }
    };

    render(<Grid {...mockProps} />);
    const robot = screen.getByTestId('robot-sprite');
    expect(robot).toBeInTheDocument();
    expect(robot).toHaveStyle(`background-position: -${directionToIndex[90] * 32}px 0px`);
  });

  it('updates robot position and direction', () => {
    const directionToIndex = { 0: 0, 90: 1, 180: 2, 270: 3 };
    const { rerender } = render(
      <Grid 
        rows={rows}
        cols={cols}
        robotPos={{ col: 0, row: 0, direction: 0 }}
      />
    );

    let robot = screen.getByTestId('robot-sprite');
    expect(robot).toHaveStyle(`background-position: -${directionToIndex[0] * 32}px 0px`);

    rerender(
      <Grid 
        rows={rows}
        cols={cols}
        robotPos={{ col: 9, row: 4, direction: 270 }}
      />
    );
  });
}); 