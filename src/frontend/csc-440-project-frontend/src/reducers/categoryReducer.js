import {
    APPEND_CATEGORY,
    CATEGORY_FORM_CHANGE_MODE,
    CATEGORY_FORM_CLEAR,
    CATEGORY_FORM_CLOSE,
    CATEGORY_FORM_CREATE_MODE,
    CATEGORY_FORM_ERROR,
    CATEGORY_FORM_LOAD_DATA,
    CATEGORY_FORM_OPEN,
    CATEGORY_FORM_SET_COURSE_INSTANCE_ID,
    CATEGORY_FORM_SET_EDIT_ID,
    CATEGORY_FORM_SUBMITTED,
    CATEGORY_FORM_UPDATE_FIELD,
    CATEGORY_FORM_UPDATE_STATE,
    DELETE_CATEGORY,
    FETCH_CATEGORIES,
    REPLACE_CATEGORY
} from '../actions/types';
import {appendInstance, objectify, removeInstance, replaceInstance} from '../utils/objectification_utils';
import produce from 'immer';

const defaultFormFieldState = {
    name: {
        value: '',
        valid: false,
        invalidFeedback: 'Please enter a name for the category',
        validFeedback: null
    },
    weight: {
        value: '',
        valid: false,
        invalidFeedback: 'Please enter the weight of this category is decimal format',
        validFeedback: null
    },
    max_points: {
        value: '',
        valid: false,
        invalidFeedback: 'Please enter the max number of points obtainable in this category',
        validFeedback: null
    },
    category_score_requirements: {
        value: [],
        valid: true,
        invalidFeedback: '',
        validFeedback: null
    }
};

const initialFormState = {
    fields: defaultFormFieldState,
    isLoading: false,
    isOpen: false,
    displayValidation: false,
    mode: CATEGORY_FORM_CREATE_MODE,
    activeCourseInstanceId: -1,
    editCategoryId: -1
};

const initialState = {
    categories: {},
    form: initialFormState
};

function formReducer(action, draft) {
    switch (action.type) {
        case CATEGORY_FORM_ERROR:
            for (const field of Object.keys(action.payload.data)) {
                if (field in draft.fields) {
                    draft.fields[field].valid = false;
                    draft.fields[field].invalidFeedback = action.payload.data[field];
                }
            }

            draft.isLoading = false;
            draft.isOpen = true;
            draft.displayValidation = true;
            break;
        case CATEGORY_FORM_OPEN:
            draft.isOpen = true;
            draft.isLoading = false;
            break;
        case CATEGORY_FORM_CLOSE:
            draft.isOpen = false;
            draft.isLoading = false;
            break;
        case CATEGORY_FORM_SUBMITTED:
            draft.isOpen = true;
            draft.isLoading = true;
            break;
        case CATEGORY_FORM_UPDATE_FIELD:
            draft.fields[action.payload.field] = {
                ...draft.fields[action.payload.field],
                ...action.payload.newValues
            };
            break;
        case CATEGORY_FORM_CLEAR:
            draft.displayValidation = false;
            draft.fields = defaultFormFieldState;
            break;
        case CATEGORY_FORM_LOAD_DATA:
            for (const field of Object.keys(draft.fields)) {
                draft.fields[field] = {
                    ...draft.fields[field],
                    value: action.payload[field],
                    valid: true,
                    invalidFeedback: '',
                    validFeedback: null
                };
            }
            break;
        case CATEGORY_FORM_CHANGE_MODE:
            draft.mode = action.payload;
            break;
        case CATEGORY_FORM_SET_EDIT_ID:
            draft.editCategoryId = action.payload;
            break;
        case CATEGORY_FORM_SET_COURSE_INSTANCE_ID:
            draft.activeCourseInstanceId = action.payload;
            break;
        default:
            break;
    }
}

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            draft.categories = objectify(action.payload);
            break;
        case CATEGORY_FORM_UPDATE_STATE:
            draft.form = {
                ...draft.form,
                ...action.payload
            };
            break;
        case APPEND_CATEGORY:
            appendInstance(draft.categories, action.payload);
            break;
        case REPLACE_CATEGORY:
            replaceInstance(draft.categories, action.payload);
            break;
        case DELETE_CATEGORY:
            removeInstance(draft.categories, action.payload);
            break;
        default:
            formReducer(action, draft.form);
            break;
    }
});
