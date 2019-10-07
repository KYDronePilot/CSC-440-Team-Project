import {
    APPEND_GRADE_ENTRY,
    DELETE_GRADE_ENTRY,
    FETCH_GRADE_ENTRIES,
    GRADE_ENTRY_FORM_CLEAR,
    GRADE_ENTRY_FORM_CLOSE,
    GRADE_ENTRY_FORM_CREATE_MODE,
    GRADE_ENTRY_FORM_EDIT_MODE,
    GRADE_ENTRY_FORM_ENABLE_CREATE_MODE,
    GRADE_ENTRY_FORM_ENABLE_EDIT_MODE,
    GRADE_ENTRY_FORM_ERROR,
    GRADE_ENTRY_FORM_LOAD_DATA,
    GRADE_ENTRY_FORM_OPEN,
    GRADE_ENTRY_FORM_SUBMITTED,
    GRADE_ENTRY_FORM_SUCCESS,
    GRADE_ENTRY_FORM_UPDATE_FIELD,
    GRADE_ENTRY_FORM_UPDATE_STATE, GRADE_ENTRY_SET_ACTIVE_CATEGORY_ID,
    REPLACE_GRADE_ENTRY,
    SET_EDITED_GRADE_ENTRY
} from '../actions/types';
import {appendInstance, objectify, removeInstance, replaceInstance} from '../actions/utils';
import produce from 'immer';

/**
 * Get index of item in list of items based on `id` key.
 * @param item - Item being searched for
 * @param items - Items to search through
 * @return {number} Index of item in items
 */
function itemIDIndex(item, items) {
    return items.map(anItem => anItem.id).indexOf(item.id);
}

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
    editedGradeEntry: {},
    gradeEntries: {},
    form: {
        fields: defaultFormFieldState,
        isLoading: false,
        isOpen: false,
        displayValidation: false,
        mode: GRADE_ENTRY_FORM_CREATE_MODE,
        activeCategoryId: -1
    }
};

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case FETCH_GRADE_ENTRIES:
            return {
                ...state,
                gradeEntries: objectify(action.payload)
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
            draft.form.isOpen = false;
            draft.form.isLoading = false;
            break;
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
            draft.form.displayValidation = false;
            draft.form.fields = defaultFormFieldState;
            break;
        case GRADE_ENTRY_FORM_LOAD_DATA:
            return {
                ...state,
                form: {
                    ...state.form,
                    fields: {
                        ...state.form.fields,
                        name: {
                            value: action.payload.name,
                            valid: true,
                            invalidFeedback: '',
                            validFeedback: null
                        },
                        points: {
                            value: action.payload.points,
                            valid: true,
                            invalidFeedback: '',
                            validFeedback: null
                        },
                        max_points: {
                            value: action.payload.max_points,
                            valid: true,
                            invalidFeedback: '',
                            validFeedback: null
                        }
                    }
                }
            };
        case GRADE_ENTRY_FORM_ENABLE_EDIT_MODE:
            return {
                ...state,
                form: {
                    ...state.form,
                    mode: GRADE_ENTRY_FORM_EDIT_MODE
                }
            };
        case GRADE_ENTRY_FORM_ENABLE_CREATE_MODE:
            return {
                ...state,
                form: {
                    ...state.form,
                    mode: GRADE_ENTRY_FORM_CREATE_MODE
                }
            };
        case SET_EDITED_GRADE_ENTRY:
            return {
                ...state,
                editedGradeEntry: action.payload
            };
        case APPEND_GRADE_ENTRY:
            appendInstance(draft.gradeEntries, action.payload);
            break;
        case REPLACE_GRADE_ENTRY:
            replaceInstance(draft.gradeEntries, action.payload);
            break;
        case DELETE_GRADE_ENTRY:
            removeInstance(draft.gradeEntries, action.payload);
            break;
        case GRADE_ENTRY_SET_ACTIVE_CATEGORY_ID:
            draft.form.activeCategoryId = action.payload;
            break;
        default:
            return state;
    }
});