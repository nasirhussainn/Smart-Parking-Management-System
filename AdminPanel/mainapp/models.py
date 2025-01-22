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
    name = models.CharField(max_length=1000)  # Name of the parking space
    starthours = models.DateTimeField()  # Operating start hours
    endhours = models.DateTimeField()  # Operating end hours
    total_vehicles = models.CharField(max_length=1000, default="0")
 # Maximum allowed vehicles
    latitude = models.FloatField()  # Latitude of the parking space
    longitude = models.FloatField()  # Longitude of the parking space  # Date and time when the record was created
    price = models.IntegerField()  # Price for parking
    live_feed_url = models.CharField(max_length=1000, blank=True, null=True)  # Live feed camera URL

    def __str__(self):
        return f"Parking Space: {self.name}"
    

class DetectedVehicle(models.Model):
    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)  # Foreign key to ParkingSpace
    detected_two_wheelers = models.IntegerField(default=0)  # Number of detected two-wheelers
    detected_four_wheelers = models.IntegerField(default=0)  # Number of detected four-wheelers
    total_detected_vehicles = models.IntegerField(default=0)  # Total number of detected vehicles
    updated_at = models.DateTimeField(auto_now=True)  # Last update time

    def __str__(self):
        return f"Detected Vehicles at {self.parking_space.name}"

     
class Slot_reservation(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]

    ParkingID = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    UserID = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    starthours = models.DateTimeField()
    endhours = models.DateTimeField()
    amount = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"Reservation {self.id} - {self.status}"

     




    


    
     
    