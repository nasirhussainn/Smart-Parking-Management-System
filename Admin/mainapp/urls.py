from django.urls import path, include
from . import views
from .views import*

urlpatterns = [
    path('adminlogin/', views.adminlogin, name='adminlogin'),
     path('', views.home, name='home'),
      path('Userlogout/', views.Userlogout, name='Userlogout'),
        path('adminsignup/', views.adminsignup, name='adminsignup'),
         path('signup/', signup, name='signup'),
          path('login/', LoginAPIView.as_view(), name='login'),
           path('parkingspace/', views.parking_space, name='parkingspace'),
            path('reservations/', SlotReservationListCreate.as_view(), name='reservation-list-create'),
             path('parkingspaces/', ParkingSpaceList.as_view(), name='parking-space-list'),
              path('showparkingspaces/', views.showparkingspaces, name='showparkingspaces'),
               path('deleteparkingspace/<int:id>/', views.deleteparkingspace, name='deleteparkingspace'),
                path('editparkingspace/<int:id>/', views.editparkingspace, name='editparkingspace') 


]