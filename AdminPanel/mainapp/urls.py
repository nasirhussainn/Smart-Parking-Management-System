from django.urls import path, include
from . import views
from django.views.generic import TemplateView
from .views import*

urlpatterns = [
    path('adminlogin/', views.adminlogin, name='adminlogin'),
     path('', views.home, name='home'),
      path('Userlogout/', views.Userlogout, name='Userlogout'),
        path('adminsignup/', views.adminsignup, name='adminsignup'),
         path('signup/', signup, name='signup'),
          path('login/', LoginAPIView.as_view(), name='login'),
           path('parkingspace/', views.parking_space, name='parkingspace'),
            path('parkingspaces/', ParkingSpaceList.as_view(), name='parking-space-list'),
              path('showparkingspaces/', views.showparkingspaces, name='showparkingspaces'),
               path('deleteparkingspace/<int:id>/', views.deleteparkingspace, name='deleteparkingspace'),
                path('editparkingspace/<int:id>/', views.editparkingspace, name='editparkingspace') ,
                 path('upload-video-page/', views.upload_video_page, name='upload_video_page'),
                 path('upload-video/', views.upload_video, name='upload_video'),
                 path('api/slot-reservations/', SlotReservationListCreateAPIView.as_view(), name='slot_reservation_list_create'),
                 path('api/detected-vehicles/', DetectedVehicleListAPIView.as_view(), name='detected_vehicle_list'),
                 path('api/parking-space/<int:pk>/', ParkingSpaceDetailAPIView.as_view(), name='parking_space_detail'),
                  # path('api/detected-vehicle/<int:pk>/', DetectedVehicleDetailAPIView.as_view(), name='detected_vehicle_detail'),
                   path('api/user/<str:email>/', GetUserByEmailAPIView.as_view(), name='get_user_by_email'),               
                   path('api/slot-reservationbyid/<int:pk>/', SlotReservationDetailbyIDAPIView.as_view(), name='slot_reservation_detail'),
                    path('slot-reservations/', TemplateView.as_view(template_name='slot_reservation.html'), name='slot_reservations'),
                    path('api/detected-vehicle/<int:parking_space_id>/', DetectedVehicleDetailAPIView.as_view(), name='detected-vehicle-detail'),
path('slot-reservation/user/<int:user_id>/', SlotReservationDetailByUserAPIView.as_view(), name='slot-reservation-by-user'),






                  


                  # path('video_feed/', views.video_feed, name='video_feed'),
                

]