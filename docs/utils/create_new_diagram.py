#!/usr/bin/env python3
"""
Simple module for doing the setup to create a new diagram.
"""

import argparse
import os
import shutil
import re

# Directory of script
DIR = os.path.dirname(os.path.abspath(__file__))
# Documents root
DOC_ROOT = os.path.dirname(DIR)
# Base diagram directory
BASE_DIAGRAM_DIR = os.path.join(DIR, 'base_diagram')
# Diagram and Makefile paths
DIAGRAM_FILE = os.path.join(BASE_DIAGRAM_DIR, 'base_diagram.drawio')
MAKEFILE = os.path.join(BASE_DIAGRAM_DIR, 'Makefile')
# Output format of diagram build
DIAGRAM_OUTPUT_FORMAT = 'pdf'


class Args(argparse.ArgumentParser):

    def __init__(self):
        super().__init__()
        self.add_argument('diagram_name', help='Name of new diagram')
        self.add_argument('main_makefile', help='Path to main Makefile (to insert build hook)')


if __name__ == '__main__':
    args = Args()
    parsed_args = args.parse_args()

    # Create new diagram directory
    new_diagram_dir = os.path.join(DOC_ROOT, parsed_args.diagram_name)
    os.mkdir(new_diagram_dir)

    # New file paths
    new_diagram_file = f'{parsed_args.diagram_name}.drawio'
    new_diagram_file_path = os.path.join(new_diagram_dir, new_diagram_file)
    new_diagram_makefile_path = os.path.join(new_diagram_dir, 'Makefile')

    # Read and replace template strings in makefile
    with open(MAKEFILE, 'r') as f:
        makefile_contents = f.read()
    makefile_contents = re.sub(r'{diagram_file_in_name}', new_diagram_file, makefile_contents)
    makefile_contents = re.sub(r'{diagram_file_out_name}', parsed_args.diagram_name, makefile_contents)
    makefile_contents = re.sub(r'{diagram_file_out_format}', DIAGRAM_OUTPUT_FORMAT, makefile_contents)
    # Write new file
    with open(new_diagram_makefile_path, 'w') as f:
        f.write(makefile_contents)

    # Copy over diagram
    shutil.copy(DIAGRAM_FILE, new_diagram_file_path)

    # Add build information to main Makefile
    new_diagram_dir_env = f'{parsed_args.diagram_name.upper()}_DIR'
    new_diagram_dist_env = f'{parsed_args.diagram_name.upper()}_DIST'
    with open(parsed_args.main_makefile) as f:
        main_makefile_contents = f.read()
    diagram_info = (
        f'# {parsed_args.diagram_name} diagram info\n'
        f'{new_diagram_dir_env}=$(dir ${{CURDIR}}){parsed_args.diagram_name}\n'
        f'{new_diagram_dist_env}=${{{new_diagram_dir_env}}}/dist\n'
    )
    main_makefile_contents = re.sub(r'prepare:', diagram_info + '\n' + 'prepare:', main_makefile_contents)
    # Add build step
    build_step_name = f'build-{parsed_args.diagram_name.replace("_", "-")}'
    diagram_build_step = (
        f'{build_step_name}:\n'
        f'\t$(MAKE) -C ${{{new_diagram_dir_env}}} clean build\n'
        f'\tcp ${{{new_diagram_dist_env}}}/* ${{DIAGRAM_BUILD}}\n'
    )
    main_makefile_contents = re.sub(
        r'build-diagrams:',
        diagram_build_step + '\n' + 'build-diagrams:',
        main_makefile_contents
    )
    # Add diagrams specific build step to build step for all diagrams
    main_makefile_contents = re.sub(
        r'build-diagrams: prepare',
        'build-diagrams: prepare ' + build_step_name,
        main_makefile_contents
    )
    # Overwrite main Makefile with changes
    with open(parsed_args.main_makefile, 'w') as f:
        f.write(main_makefile_contents)

    print(f'Successfully added diagram: {parsed_args.diagram_name}')
