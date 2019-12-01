export const NO_GPA = -1;

/**
 * Format a GPA value.
 * @param gpa - GPA to format
 */
export const formatGpa = (gpa: number) => {
    // Use placeholder if no GPA
    if (gpa === NO_GPA)
        return '...';
    return gpa.toFixed(1);
};
