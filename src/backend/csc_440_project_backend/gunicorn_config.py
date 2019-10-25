"""
Configuration settings for Gunicorn.
"""

workers = 4
bind = '0.0.0.0:8000'
loglevel = 'warning'
errorlog = '-'
