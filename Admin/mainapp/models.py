from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
    

class ParkingSpace(models.Model):
        Name =  models.CharField(max_length=1000)
        starthours = models.DateTimeField()
        endhours = models.DateTimeField()
        latitude = models.FloatField()
        longitude = models.FloatField()
        Datetime = models.DateTimeField()
        Price = models.IntegerField()
        def _str_(self):

            return self.id
        
class Slot_reservation(models.Model):
    ParkingID = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    starthours = models.DateTimeField()
    endhours = models.DateTimeField()
    amount= models.IntegerField()
    transaction_id = models.CharField(max_length=1000, unique=True)
    def _str_(self):

            return self.id