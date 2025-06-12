import { useMemo, useState, useEffect } from "react";
import { type RobotPositionInterface, type Direction } from "../../hooks/useControlRobot";
import styles from './Grid.module.css';

interface IGrid {
    rows: number;
    cols: number;
    robotPos: RobotPositionInterface;
}

interface IGridCell {
    row: number;
    col: number;
    isActive: boolean;
    robotDirection?: Direction;
    isMoving: boolean;
}

const directionToIndex: Record<Direction, number> = {
    0: 0,    // North
    90: 1,   // East
    180: 2,  // South
    270: 3   // West
} as const;

const Grid = ({rows, cols, robotPos}: IGrid) => {
    const [isMoving, setIsMoving] = useState(false);
    const [prevPos, setPrevPos] = useState(robotPos);

    // Detta används för att animera roboten när den rör sig
    useEffect(() => {
        if (prevPos.row !== robotPos.row || prevPos.col !== robotPos.col) {
            setIsMoving(true);
            const timer = setTimeout(() => {
                setIsMoving(false);
            }, 300);
            setPrevPos(robotPos);
            return () => clearTimeout(timer);
        }
    }, [robotPos]);

    const GridCell = ({ row, col, isActive, robotDirection, isMoving }: IGridCell) => (
        <div
            key={`${row}-${col}`}
            className={`${styles.gridCell} ${isActive ? styles.active : ''}`}
            data-testid={!isActive ? "grid-cell" : undefined}
        >
            {/* Detta är roboten */}
            {isActive && robotDirection !== undefined && (
                <div
                    className={`${styles.robot} ${isMoving ? styles.robotMoving : ''}`}
                    data-testid="robot-sprite"
                    style={{
                        backgroundImage: "url('/linksprites.png')",
                        backgroundPosition: `-${directionToIndex[robotDirection] * 32}px 0px`,
                        backgroundSize: `128px 32px`,
                        width: '32px',
                        height: '32px',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            )}
            {/* Detta är cellen */}
            {!isActive && `(${row}, ${col})`}
        </div>
    );

    const memoizedGrid = useMemo(() => {
        const grid = [];
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                const isActive = r === robotPos.row && c === robotPos.col;
                row.push(
                    <GridCell
                        key={`${r}-${c}`}
                        row={r}
                        col={c}
                        isActive={isActive}
                        robotDirection={isActive ? robotPos.direction : undefined}
                        isMoving={isMoving}
                    />
                );
            }
            grid.push(
                <div
                    key={`row-${r}`}
                    className={styles.gridRow}
                >
                    {row}
                </div>
            );
        }
        return grid;
    }, [rows, cols, robotPos, isMoving]);

    return (
        <div className={styles.gridContainer}>
            <div className={styles.innerGrid}>
                {memoizedGrid}
            </div>
        </div>
    )
}
export default Grid;