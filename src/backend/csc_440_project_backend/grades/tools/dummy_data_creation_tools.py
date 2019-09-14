from typing import Any, Dict


def quotify(text: str):
    """
    Add quotes to a string.

    Args:
        text: String to add quotes to

    Returns:
        String with quotes
    """

    return f'\'{text}\''


def format_new_object(variable_name: str, model_name: str, params: Dict[str, Any]) -> str:
    """
    Format a model create statement in Python syntax.

    Args:
        variable_name: Name of variable
        model_name: Name of model
        params: Parameters to create the object with

    Returns:
        Formatted model create statement
    """

    header = f'{variable_name} = {model_name}.objects.create(\n'
    formatted_params = [f'    {key}={val},\n' for key, val in params.items()]
    return header + ''.join(formatted_params) + ')'


def create_course(name: str, code: str, credit_hours: float) -> str:
    params = {
        'code': quotify(code),
        'name': quotify(name),
        'credit_hours': credit_hours,
        'is_deprecated': False,
        'is_gen_ed': True
    }
    print(format_new_object(f'self.{code.replace(" ", "_").lower()}', 'Course', params))


if __name__ == '__main__':
    create_course('Cell and Molecular Biology', 'BIO 111', 4.0)
    create_course('Ecology and Evolution', 'BIO 112', 4.0)
    create_course('General Chemistry I', 'CHE 111', 3.0)
    create_course('General Chemistry Lab I', 'CHE 111L', 1.0)
    create_course('General Chemistry II', 'CHE 112', 3.0)
    create_course('General Chemistry Lab II', 'CHE 112L', 1.0)
    create_course('Plate Tectonics: The Active Earth', 'GLY 108', 3.0)
    create_course('Great Moments in Earth History', 'GLY 109', 3.0)
    create_course('University Physics I', 'PHY 201', 5.0)
    create_course('University Physics II', 'PHY 202', 5.0)
