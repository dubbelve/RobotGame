import { useState, useCallback, useEffect, useRef } from "react";

export type Direction = 0 | 90 | 180 | 270;

export interface RobotPositionInterface {
    col: number;
    row: number;
    direction: Direction;
}

export interface UseControlRobotReturn {
    handleRightRotation: () => void;
    handleLeftRotation: () => void;
    handleForward: () => void;
    resetPosition: () => void;
    robotPos: RobotPositionInterface;
    logFinalPosition: () => void;
    getDirectionName: (direction: Direction) => string;
}

const DIRECTIONS = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
} as const;

export { DIRECTIONS };

const DIRECTION_NAMES = {
    [DIRECTIONS.NORTH]: 'N',
    [DIRECTIONS.EAST]: 'E',
    [DIRECTIONS.SOUTH]: 'S',
    [DIRECTIONS.WEST]: 'W',
} as const;

const useControlRobot = (
    rows: number = 5, 
    cols: number = 5,
    initialRow: number = 0,
    initialCol: number = 0,
    initialDirection: Direction = DIRECTIONS.NORTH
): UseControlRobotReturn => {
    const [robotPos, setRobotPos] = useState<RobotPositionInterface>({
        col: initialCol,
        row: initialRow,
        direction: initialDirection
    });
    const latestPos = useRef(robotPos);

    useEffect(() => {
        latestPos.current = robotPos;
    }, [robotPos]);

    useEffect(() => {
        setRobotPos({
            col: initialCol,
            row: initialRow,
            direction: initialDirection
        });
    }, [initialRow, initialCol, initialDirection]);

    const isValidPosition = useCallback((row: number, col: number): boolean => {
        return (
            row >= 0 &&
            row < rows &&
            col >= 0 &&
            col < cols
        );
    }, [rows, cols]);

    const getDirectionName = useCallback((direction: Direction): string => {
        return DIRECTION_NAMES[direction];
    }, []);

    const logFinalPosition = useCallback(() => {
        console.log(`${latestPos.current.row} ${latestPos.current.col} ${getDirectionName(latestPos.current.direction)}`);
    }, [getDirectionName]);

    const handleRightRotation = useCallback(() => {
        setRobotPos(prevPos => {
            const newDirection = prevPos.direction === DIRECTIONS.WEST
                ? DIRECTIONS.NORTH
                : (prevPos.direction + 90) as Direction;

            return {
                ...prevPos,
                direction: newDirection
            };
        });
    }, []);

    const handleLeftRotation = useCallback(() => {
        setRobotPos(prevPos => {
            const newDirection = prevPos.direction === DIRECTIONS.NORTH
                ? DIRECTIONS.WEST
                : (prevPos.direction - 90) as Direction;

            return {
                ...prevPos,
                direction: newDirection
            };
        });
    }, []);

    const handleForward = useCallback(() => {
        setRobotPos(prevPos => {
            let newRow = prevPos.row;
            let newCol = prevPos.col;
            
            switch (prevPos.direction) {
                case DIRECTIONS.NORTH:
                    newRow = prevPos.row - 1;
                    break;
                case DIRECTIONS.EAST:
                    newCol = prevPos.col + 1;
                    break;
                case DIRECTIONS.SOUTH:
                    newRow = prevPos.row + 1;
                    break;
                case DIRECTIONS.WEST:
                    newCol = prevPos.col - 1;
                    break;
            }

            if (isValidPosition(newRow, newCol)) {
                return { ...prevPos, row: newRow, col: newCol };
            }
            return prevPos;
        });
    }, [isValidPosition]);

    const resetPosition = useCallback(() => {
        setRobotPos({
            col: initialCol,
            row: initialRow,
            direction: initialDirection
        });
    }, [initialCol, initialRow, initialDirection]);

    return {
        handleRightRotation,
        handleLeftRotation,
        handleForward,
        resetPosition,
        robotPos,
        logFinalPosition,
        getDirectionName
    };
};

export default useControlRobot;