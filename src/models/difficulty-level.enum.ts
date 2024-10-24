export enum DifficultyLevel {
    Easy = 0,
    Medium = 1,
    Hard = 2
}

export const DifficultyLevelLabels: Record<DifficultyLevel, string> = {
    [DifficultyLevel.Easy]: 'Easy',
    [DifficultyLevel.Medium]: 'Medium',
    [DifficultyLevel.Hard]: 'Hard',
};


export const DifficultyLevels = Object.values(DifficultyLevel).map((value) => ({
    value, 
    label: DifficultyLevelLabels[value as DifficultyLevel], 
}));