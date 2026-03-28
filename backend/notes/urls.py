# backend/notes/urls.py

# from django.urls import path
# from . import views

# urlpatterns = [
    # path('', views.note_list, name='note_list'),
    # path('', views.note_create, name='note_create'),
    # path('<int:pk>/', views.note_detail, name='note_detail'),
# ]

from rest_framework.routers import DefaultRouter
from .views import NoteViewSet

router = DefaultRouter()
router.register(r'notes', NoteViewSet)
urlpatterns = router.urls
