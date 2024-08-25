# Generated by Django 5.0.4 on 2024-05-22 06:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SlotRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Arrivaltime', models.TimeField()),
                ('Departuretime', models.TimeField()),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('Datetime', models.DateTimeField()),
                ('Price', models.IntegerField()),
                ('Userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]