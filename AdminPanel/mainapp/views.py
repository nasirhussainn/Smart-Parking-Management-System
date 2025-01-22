from django.shortcuts import render , redirect

from rest_framework.views import APIView
from django.contrib.auth  import authenticate, logout
from django.contrib.auth  import login as auth_login
from django.contrib import messages
from django.contrib.auth.models import*

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import*
from django.contrib.auth import authenticate, login as auth_login
from .models import*
from django.shortcuts import render, redirect
# from django.core.files.storage import FileSystemStorage
from django.conf import settings

# from .video_camera import VideoCamera
from django.shortcuts import render
# from django.http import HttpResponse
import cv2
import os
from django.shortcuts import render
# from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import numpy as np
from django.conf import settings
from django.shortcuts import render, redirect


from django.http import JsonResponse
from .models import ParkingSpace, DetectedVehicle

import torch

# YOLO model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

# Define labels for two-wheelers and four-wheelers
TWO_WHEEL_LABELS = ['bicycle', 'motorbike']
FOUR_WHEEL_LABELS = ['car', 'truck', 'bus']


def upload_video_page(request):
    """
    Render the video upload page.
    """
    parking_spaces = ParkingSpace.objects.all()
    return render(request, 'upload_video.html', {'parking_spaces': parking_spaces})


@csrf_exempt
def upload_video(request):
    """
    Handle video uploads, process them frame by frame, detect vehicles, and update the database with the live count.
    """
    if request.method == 'POST':
        parking_space_id = request.POST.get('parking_space')
        video_file = request.FILES.get('video')

        if not parking_space_id or not video_file:
            return JsonResponse({'error': 'Missing parking space or video file'}, status=400)

        parking_space = ParkingSpace.objects.get(pk=parking_space_id)
        video_path = os.path.join(settings.MEDIA_ROOT, video_file.name)

        # Save the uploaded video
        with open(video_path, 'wb') as f:
            for chunk in video_file.chunks():
                f.write(chunk)

        # Process the video with YOLO
        cap = cv2.VideoCapture(video_path)
        current_two_wheelers = 0
        current_four_wheelers = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Convert frame to RGB and detect objects
            results = model(frame)
            detections = results.xyxy[0].cpu().numpy()

            frame_two_wheelers = 0
            frame_four_wheelers = 0

            for *box, conf, cls in detections:
                label = model.names[int(cls)]
                if label in TWO_WHEEL_LABELS:
                    frame_two_wheelers += 1
                elif label in FOUR_WHEEL_LABELS:
                    frame_four_wheelers += 1

            # Update the counts for the current frame
            current_two_wheelers = frame_two_wheelers
            current_four_wheelers = frame_four_wheelers
            print(current_two_wheelers)
            print(current_four_wheelers)

        cap.release()
        os.remove(video_path)  # Remove the video after processing

        # Update the database (overwrite with the latest count)
        detected_vehicle, created = DetectedVehicle.objects.get_or_create(parking_space=parking_space)
        detected_vehicle.detected_two_wheelers = current_two_wheelers
        detected_vehicle.detected_four_wheelers = current_four_wheelers
        detected_vehicle.total_detected_vehicles = current_two_wheelers + current_four_wheelers
        detected_vehicle.save()

        return JsonResponse({
            'two_wheelers': current_two_wheelers,
            'four_wheelers': current_four_wheelers,
            'total_vehicles': current_two_wheelers + current_four_wheelers
        })

    return JsonResponse({'error': 'Invalid request method'}, status=405)




@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(email, password)

        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user specifically with CustomUser model
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


def adminlogin(request):
    

       if request.method == "POST":
        # Get the post parameters
        username = request.POST['uname']
        password = request.POST['password']
        user = authenticate(username=username, password=password)  
        if user is not None:
            auth_login(request  , user)
            return redirect('/')

        else:
              
            messages.error(request, "Invalid credentials! Please try again")
            return render(request, "adminlogin.html")
       return render(request,'adminlogin.html')

def home(request):

    return render(request , 'index.html')


def Userlogout(request):
    logout(request)
    return redirect('/adminlogin')


def  adminsignup(request):
    if request.method == "POST":
        # Get the post parameters
        username = request.POST['name']
        email = request.POST['email']
        password = request.POST['password1']
        cpassword = request.POST['password2']

        checkemail = User.objects.filter(email=email)
        checkuser = User.objects.filter(username=username)
        
        if len(checkemail)>0:
            messages.error(request, "Email is already exits.")
            return render(request, 'adminRegister.html')

        if len(checkuser)>0:
            messages.error(request, "User Name is already exits.")
            return render(request, 'adminRegister.html')
    
        if len(username) > 10:
            messages.error(request, " Your user name must be under 10 characters")
            return render(request, 'adminRegister.html')

        if not username.isalnum():
            messages.error(request, " User name should only contain letters and numbers")
            return render(request, 'adminRegister.html')
        if password != cpassword:
            messages.error(request, " Passwords do not match")
            return render(request, 'adminRegister.html')

        # Create the user
        user = User.objects.create_user(username, email, password)
       
        user.save()
        # user.save()
        # current_site = get_current_site(request)
        # email_body = {
        #             'user': user,
        #             'domain': current_site.domain,
        #             'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        #             'token': account_activation_token.make_token(user),
        #         }

        # link = reverse('activate', kwargs={
        #                        'uidb64': email_body['uid'], 'token': email_body['token']})

        # email_subject = 'Activate your account'

        # activate_url = 'http://'+current_site.domain+link

        # emailsend = EmailMessage(
        #             email_subject,
        #             'Hi '+user.username + ', Please the link below to activate your account \n'+activate_url,
        #             'testingapp895@gmail.com',
        #             [email],
        #         )
        # emailsend.send(fail_silently=False)
        messages.success(request, "Admin is Successfully Registered")
        return render(request, 'adminRegister.html')
            
      
    return render(request, 'adminRegister.html')

from datetime import datetime

def parking_space(request):
       if request.method == "POST":
        # Use the `get` method to safely retrieve POST data
        Area_Name = request.POST.get('name', None)
        start_datetime_str = request.POST.get('ST', None)  # Assuming full datetime string YYYY-MM-DDTHH:MM
        end_datetime_str = request.POST.get('ET', None)      # Assuming full datetime string YYYY-MM-DDTHH:MM
        latitude = request.POST.get('lat', None)
        longitude = request.POST.get('long', None)
        Price = request.POST.get('price', None)
        totalvehicle  = request.POST.get('totalvehicle', None)
        print(([ Area_Name, start_datetime_str, end_datetime_str, latitude, longitude, totalvehicle, Price]))
        # Check for missing fields
        if not all([ Area_Name, start_datetime_str, end_datetime_str, latitude, longitude, Price]):
            messages.error(request, "Missing one or more required fields")
            return render(request, "parkingspace.html")

        datetime_format = "%Y-%m-%dT%H:%M"  # Define the datetime format including 'T'

        try:
            # Parse the full datetime strings
            start_datetime = datetime.strptime(start_datetime_str, datetime_format)
            end_datetime = datetime.strptime(end_datetime_str, datetime_format) 
        except ValueError as e:
            messages.error(request, f"Error parsing date/time: {e}")
            return render(request, "parkingspace.html")

        # Debugging prints (remove in production)
        print(f"Start datetime: {start_datetime}")
        print(f"End datetime: {end_datetime}")

        # Proceed to save the ParkingSpace object with the correctly formatted time
        parkingspace = ParkingSpace(
            name = Area_Name,
            starthours=start_datetime,
            endhours=end_datetime,
            total_vehicles = totalvehicle,
            latitude=latitude,
            longitude=longitude,  # Use the start_datetime as the Datetime
            price = Price

        )
        parkingspace.save()
        messages.success(request, 'Parking Area is successfully Registered')

        return render(request, "parkingspace.html")

       return render(request, "parkingspace.html")

class SlotReservationListCreateAPIView(APIView):
    def get(self, request):
        """
        API to retrieve all slot reservations.
        """
        reservations = Slot_reservation.objects.all()
        serializer = SlotReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        API to create a new slot reservation.
        """
        serializer = SlotReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetectedVehicleListAPIView(APIView):
    """
    Retrieve all detected vehicles or filter by parking space.
    """
    def get(self, request):
        # Get optional parking_space filter from query params
        parking_space_id = request.GET.get('parking_space')
        
        if parking_space_id:
            detected_vehicles = DetectedVehicle.objects.filter(parking_space_id=parking_space_id)
        else:
            detected_vehicles = DetectedVehicle.objects.all()
        
        serializer = DetectedVehicleSerializer(detected_vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DetectedVehicleDetailAPIView(APIView):
    """
    API to retrieve all detected vehicles by parking_space ID.
    """
    def get(self, request, parking_space_id):
        # Retrieve all detected vehicles associated with the parking_space_id
        detected_vehicles = DetectedVehicle.objects.filter(parking_space=parking_space_id)

        if detected_vehicles.exists():
            # Serialize the detected vehicle data
            serializer = DetectedVehicleSerializer(detected_vehicles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Return an error if no detected vehicles are found for the given parking space
            return Response({'error': 'Detected vehicles not found for this parking space'}, status=status.HTTP_404_NOT_FOUND)

class ParkingSpaceList(APIView):
    def get(self, request):
        parking_spaces = ParkingSpace.objects.all()
        serializer = ParkingSpaceSerializer(parking_spaces, many=True)
        return Response(serializer.data)
    

def showparkingspaces(request):
    parkingspaces = ParkingSpace.objects.all()
    context = {'parkingspaces':parkingspaces}

    return render(request , 'show_parkingspace.html', context)


def deleteparkingspace(request , id):
    deleteparkingspace_data = ParkingSpace.objects.get(pk = id)
    deleteparkingspace_data.delete()
    messages.success(request, "Your Parking Space is successfully Deleted.")
    return redirect('/showparkingspaces')


def editparkingspace(request, id):
    editparkingspace_data = ParkingSpace.objects.get(pk=id)
    context = {'editparkingspace': editparkingspace_data}
    
    if request.method == "POST":
        name = request.POST['name']
        start_time_str = request.POST['ST']  # format: YYYY-MM-DDTHH:MM
        end_time_str = request.POST['ET']    # format: YYYY-MM-DDTHH:MM
        latitude = request.POST['lat']
        longitude = request.POST['long'] # format: YYYY-MM-DDTHH:MM
        price = request.POST['price']
        totalvehicle  = request.POST['totalvehicle']
        
        # Parse the datetime strings
        start_datetime = datetime.strptime(start_time_str, "%Y-%m-%dT%H:%M")
        end_datetime = datetime.strptime(end_time_str, "%Y-%m-%dT%H:%M")
        
        # Update the parking space instance
        editparkingspace_data.name = name
        editparkingspace_data.starthours = start_datetime
        editparkingspace_data.endhours = end_datetime
        editparkingspace_data.latitude = latitude
        editparkingspace_data.longitude = longitude
        editparkingspace_data.total_vehicles =  totalvehicle 
        editparkingspace_data.price = price
        editparkingspace_data.save()
        
        messages.success(request, "Your content is successfully updated.")
        return redirect('/showparkingspaces')
    
    return render(request, 'parkingspace.html', context)


class ParkingSpaceDetailAPIView(APIView):
    """
    API to retrieve parking space details by ID.
    """
    def get(self, request, pk):
        try:
            # Retrieve the parking space by its primary key (ID)
            parking_space = ParkingSpace.objects.get(pk=pk)
            # Serialize the parking space data
            serializer = ParkingSpaceSerializer(parking_space)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ParkingSpace.DoesNotExist:
            # Return an error if the parking space does not exist
            return Response({'error': 'Parking space not found'}, status=status.HTTP_404_NOT_FOUND)



class GetUserByEmailAPIView(APIView):
    """
    API to retrieve a user by email.
    """
    def get(self, request, email):
        try:
            # Retrieve the user by email
            user = CustomUser.objects.get(email=email)
            # Serialize the user data
            serializer = CustomUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            # Return an error if the user does not exist
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class SlotReservationDetailbyIDAPIView(APIView):
    """
    API to retrieve a slot reservation by ID.
    """
    def get(self, request, pk):
        try:
            # Retrieve the slot reservation by its primary key (ID)
            slot_reservation = Slot_reservation.objects.get(pk=pk)
            # Serialize the slot reservation data
            serializer = SlotReservationSerializer(slot_reservation)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Slot_reservation.DoesNotExist:
            # Return an error if the slot reservation does not exist
            return Response({'error': 'Slot reservation not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            slot_reservation = Slot_reservation.objects.get(pk=pk)
            serializer = SlotReservationSerializer(slot_reservation, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Slot_reservation.DoesNotExist:
            return Response({'error': 'Slot reservation not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            slot_reservation = Slot_reservation.objects.get(pk=pk)
            slot_reservation.delete()
            return Response({'message': 'Reservation deleted successfully'}, status=status.HTTP_200_OK)
        except Slot_reservation.DoesNotExist:
            return Response({'error': 'Slot reservation not found'}, status=status.HTTP_404_NOT_FOUND)


class SlotReservationDetailByUserAPIView(APIView):
    """
    API to retrieve slot reservations by UserID.
    """
    def get(self, request, user_id):
        try:
            # Retrieve slot reservations for the given UserID
            slot_reservations = Slot_reservation.objects.filter(UserID_id=user_id)

            if not slot_reservations.exists():
                # Return an error if no reservations exist for the given UserID
                return Response({'error': 'No slot reservations found for this user.'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize the slot reservations data
            serializer = SlotReservationSerializer(slot_reservations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            # Return a generic error response in case of an unexpected error
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)