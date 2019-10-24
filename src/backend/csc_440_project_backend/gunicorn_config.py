"""
Configuration settings for Gunicorn.
"""

workers = 4
bind = '0.0.0.0:80'
loglevel = 'warning'
errorlog = '-'
