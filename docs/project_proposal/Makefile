SHELL = /bin/sh

TEX_FILE=project_proposal

build:
	pandoc -s ./${TEX_FILE}.tex -o ./${TEX_FILE}.docx --toc --reference-doc ./reference.docx

clean:
	rm ./${TEX_FILE}.docx
