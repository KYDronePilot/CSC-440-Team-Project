from django.db import models


class Common(models.Model):
    """
    Common information that should be included in every model.

    Attributes:
        last_updated: When the entry was last updated
        notes: Notes about the instance
    """

    last_updated = models.DateTimeField(verbose_name='Last Updated', auto_now=True, null=False)
    notes = models.TextField(max_length=500, verbose_name='Notes', null=True, blank=True)

    class Meta:
        abstract = True
