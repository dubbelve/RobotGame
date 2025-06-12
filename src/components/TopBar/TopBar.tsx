import type { Direction, RobotPositionInterface } from '../../hooks/useControlRobot';
import type { Dispatch, SetStateAction } from 'react';
import styles from './TopBar.module.css';
import { useState } from 'react';
import { DIRECTIONS } from '../../hooks/useControlRobot';

type Command = 'L' | 'V' | 'R' | 'H' | 'G' | 'F';

interface ITopBar {
    robotPos: RobotPositionInterface;
    handleLeftRotation: () => void;
    handleRightRotation: () => void;
    handleForward: () => void;
    logFinalPosition: () => void;
    commandDelay?: number;
    rows: number;
    cols: number;
    setRows: Dispatch<SetStateAction<number>>;
    setCols: Dispatch<SetStateAction<number>>;
    resetPosition: () => void;
    initialRow: number;
    initialCol: number;
    initialDirection: Direction;
    setInitialRow: Dispatch<SetStateAction<number>>;
    setInitialCol: Dispatch<SetStateAction<number>>;
    setInitialDirection: Dispatch<SetStateAction<Direction>>;
}

const TopBar = ({
    handleLeftRotation,
    handleRightRotation,
    handleForward,
    logFinalPosition,
    commandDelay = 1000,
    rows,
    cols,
    setRows,
    setCols,
    resetPosition,
    initialRow,
    initialCol,
    initialDirection,
    setInitialRow,
    setInitialCol,
    setInitialDirection
}: ITopBar) => {
    const [commands, setCommands] = useState<string>('');

    const readString = async () => {
        if (commands) {
            const commandArr = commands.split('') as Command[];

            for (const command of commandArr) {
                if (commandDelay > 0) {
                    await new Promise(resolve => setTimeout(resolve, commandDelay));
                }
                switch (command) {
                    case 'L':
                    case 'V':
                        handleLeftRotation();
                        break;
                    case 'R':
                    case 'H':
                        handleRightRotation();
                        break;
                    case 'G':
                    case 'F':
                        handleForward();
                        break;
                }
            }
            
            if (commandDelay > 0) {
                const lastCommand = commandArr[commandArr.length - 1];
                // Extra delay om sista kommandot är G eller F
                if (lastCommand === 'G' || lastCommand === 'F') {
                    await new Promise(resolve => setTimeout(resolve, 300));
                } else {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            // Loggar slutpositionen
            logFinalPosition();
        }
    }

    return <div className={styles.topbar} data-testid="top-bar">
        <div className={styles.commandControls}>
            <input type='text' placeholder="Add command" onChange={(e) => setCommands(e.target.value)}/>
            <button onClick={readString}>Execute</button>
            <button onClick={resetPosition}>Reset</button>
        </div>
        <div className={styles.gridControls}>
            <label>
                Rows:
                <input 
                    type="number" 
                    min="1" 
                    max="20" 
                    value={rows} 
                    onChange={(e) => setRows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                />
            </label>
            <label>
                Columns:
                <input 
                    type="number" 
                    min="1" 
                    max="20" 
                    value={cols} 
                    onChange={(e) => setCols(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                />
            </label>
        </div>
        <div className={styles.initialPositionControls}>
            <label>
                Initial Row:
                <input 
                    type="number" 
                    min="0" 
                    max={rows - 1} 
                    value={initialRow} 
                    onChange={(e) => setInitialRow(Math.max(0, Math.min(rows - 1, parseInt(e.target.value) || 0)))}
                />
            </label>
            <label>
                Initial Column:
                <input 
                    type="number" 
                    min="0" 
                    max={cols - 1} 
                    value={initialCol} 
                    onChange={(e) => setInitialCol(Math.max(0, Math.min(cols - 1, parseInt(e.target.value) || 0)))}
                />
            </label>
            <label>
                Initial Direction:
                <select 
                    value={initialDirection} 
                    onChange={(e) => setInitialDirection(Number(e.target.value) as Direction)}
                >
                    <option value={DIRECTIONS.NORTH}>North</option>
                    <option value={DIRECTIONS.EAST}>East</option>
                    <option value={DIRECTIONS.SOUTH}>South</option>
                    <option value={DIRECTIONS.WEST}>West</option>
                </select>
            </label>
        </div>
    </div>;
}
export default TopBar;