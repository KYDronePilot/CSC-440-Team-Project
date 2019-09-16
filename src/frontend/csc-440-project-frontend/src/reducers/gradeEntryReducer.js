import {
    APPEND_GRADE_ENTRY,
    FETCH_GRADE_ENTRIES, GRADE_ENTRY_FORM_CLEAR,
    GRADE_ENTRY_FORM_CLOSE,
    GRADE_ENTRY_FORM_ERROR,
    GRADE_ENTRY_FORM_OPEN,
    GRADE_ENTRY_FORM_SUBMITTED,
    GRADE_ENTRY_FORM_SUCCESS, GRADE_ENTRY_FORM_UPDATE_FIELD, GRADE_ENTRY_FORM_UPDATE_STATE
} from '../actions/types';

// Default state for form fields
const defaultFormFieldState = {
    name: {
        value: '',
        valid: false,
        invalidFeedback: 'Please enter a name for the grade entry',
        validFeedback: null
    },
    points: {
        value: '',
        valid: false,
        invalidFeedback: 'Please enter the number of points obtained',
        validFeedback: null
    },
    max_points: {
        value: '',
        valid: false,
        invalidFeedback: 'Please enter the max number of points obtainable',
        validFeedback: null
    }
};

const initialState = {
    activeGradeEntries: [],
    activeGradeEntry: {},
    form: {
        fields: defaultFormFieldState,
        isLoading: false,
        isOpen: false,
        displayValidation: false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_GRADE_ENTRIES:
            return {
                ...state,
                activeGradeEntries: action.payload
            };
        case APPEND_GRADE_ENTRY:
            return {
                ...state,
                activeGradeEntries: [...state.activeGradeEntries, action.payload]
            };
        case GRADE_ENTRY_FORM_ERROR:
            const updatedFields = {
                ...state.form.fields
            };

            // Update fields with errors
            for (const field of Object.keys(action.payload.data)) {
                if (Object.keys(state.form.fields).includes(field))
                    updatedFields[field] = {
                        ...updatedFields[field],
                        valid: false,
                        invalidFeedback: action.payload.data[field]
                    };
            }

            return {
                ...state,
                form: {
                    ...state.form,
                    fields: updatedFields,
                    isLoading: false,
                    isOpen: true,
                    displayValidation: true
                }
            };
        case GRADE_ENTRY_FORM_SUCCESS:
            return {
                ...state,
                form: {
                    ...state.form,
                    isLoading: false,
                    isOpen: false
                }
            };
        case GRADE_ENTRY_FORM_OPEN:
            return {
                ...state,
                form: {
                    ...state.form,
                    isOpen: true,
                    isLoading: false
                }
            };
        case GRADE_ENTRY_FORM_CLOSE:
            return {
                ...state,
                form: {
                    ...state.form,
                    isOpen: false,
                    isLoading: false
                }
            };
        case GRADE_ENTRY_FORM_SUBMITTED:
            return {
                ...state,
                form: {
                    ...state.form,
                    isOpen: true,
                    isLoading: true
                }
            };
        case GRADE_ENTRY_FORM_UPDATE_FIELD:
            return {
                ...state,
                form: {
                    ...state.form,
                    fields: {
                        ...state.form.fields,
                        [action.payload.field]: {
                            ...state.form.fields[action.payload.field],
                            ...action.payload.newValues
                        }
                    }
                }
            };
        case GRADE_ENTRY_FORM_UPDATE_STATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            };
        case GRADE_ENTRY_FORM_CLEAR:
            return {
                ...state,
                form: {
                    ...state.form,
                    displayValidation: false,
                    fields: defaultFormFieldState
                }
            };
        default:
            return state;
    }
}