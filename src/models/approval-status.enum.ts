export enum ApprovalStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2
}

// Mapping for display labels
export const ApprovalStatusLabels: Record<ApprovalStatus, string> = {
    [ApprovalStatus.Pending]: 'Pending',
    [ApprovalStatus.Approved]: 'Approved',
    [ApprovalStatus.Rejected]: 'Rejected',
};

// Array for use in dropdown
export const ApprovalStatuses = Object.values(ApprovalStatus).map((value) => ({
    value, // This is already a numeric value from the enum
    label: ApprovalStatusLabels[value as ApprovalStatus], // Assert value as ApprovalStatus
}));