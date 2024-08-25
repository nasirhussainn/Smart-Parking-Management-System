from django.shortcuts import render , redirect
from django.views.decorators.csrf import csrf_exempt
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
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(email, password)
            user = CustomUser(request, email=email, password=password)
            print(user)
            if user is not None:
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            return render(request, 'signup.html')

        if len(checkuser)>0:
            messages.error(request, "User Name is already exits.")
            return render(request, 'signup.html')
    
        if len(username) > 10:
            messages.error(request, " Your user name must be under 10 characters")
            return render(request, 'signup.html')

        if not username.isalnum():
            messages.error(request, " User name should only contain letters and numbers")
            return render(request, 'signup.html')
        if password != cpassword:
            messages.error(request, " Passwords do not match")
            return render(request, 'signup.html')

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
        name = request.POST.get('name', None)
        start_datetime_str = request.POST.get('ST', None)  # Assuming full datetime string YYYY-MM-DDTHH:MM
        end_datetime_str = request.POST.get('ET', None)      # Assuming full datetime string YYYY-MM-DDTHH:MM
        latitude = request.POST.get('lat', None)
        longitude = request.POST.get('long', None)
        price = request.POST.get('price', None)
        time_str = request.POST.get('time', None)
        print(([name, start_datetime_str, end_datetime_str, latitude, longitude, time_str, price]))
        # Check for missing fields
        if not all([name, start_datetime_str, end_datetime_str, latitude, longitude, time_str, price]):
            messages.error(request, "Missing one or more required fields")
            return render(request, "parkingspace.html")

        datetime_format = "%Y-%m-%dT%H:%M"  # Define the datetime format including 'T'

        try:
            # Parse the full datetime strings
            start_datetime = datetime.strptime(start_datetime_str, datetime_format)
            end_datetime = datetime.strptime(end_datetime_str, datetime_format)
            time = datetime.strptime(time_str, datetime_format) 
        except ValueError as e:
            messages.error(request, f"Error parsing date/time: {e}")
            return render(request, "parkingspace.html")

        # Debugging prints (remove in production)
        print(f"Start datetime: {start_datetime}")
        print(f"End datetime: {end_datetime}")

        # Proceed to save the ParkingSpace object with the correctly formatted time
        parkingspace = ParkingSpace(
            Name=name,
            starthours=start_datetime,
            endhours=end_datetime,
            latitude=latitude,
            longitude=longitude,
            Datetime=time,  # Use the start_datetime as the Datetime
            Price=price
        )
        parkingspace.save()
        messages.success(request, 'Slot is successfully Registered')

        return render(request, "parkingspace.html")

       return render(request, "parkingspace.html")

class  SlotReservationListCreate(APIView):
    def get(self, request):
        reservations = Slot_reservation.objects.all()
        serializer = SlotReservationSerializer(reservations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SlotReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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
        longitude = request.POST['long']
        date_time_str = request.POST['time']  # format: YYYY-MM-DDTHH:MM
        price = request.POST['price']
        
        # Parse the datetime strings
        start_datetime = datetime.strptime(start_time_str, "%Y-%m-%dT%H:%M")
        end_datetime = datetime.strptime(end_time_str, "%Y-%m-%dT%H:%M")
        datetime_parsed = datetime.strptime(date_time_str, "%Y-%m-%dT%H:%M")
        
        # Update the parking space instance
        editparkingspace_data.Name = name
        editparkingspace_data.starthours = start_datetime
        editparkingspace_data.endhours = end_datetime
        editparkingspace_data.latitude = latitude
        editparkingspace_data.longitude = longitude
        editparkingspace_data.Datetime = datetime_parsed
        editparkingspace_data.Price = price
        
        editparkingspace_data.save()
        
        messages.success(request, "Your content is successfully updated.")
        return redirect('/showparkingspaces')
    
    return render(request, 'parkingspace.html', context)