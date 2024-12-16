from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Tarea, Etiqueta
from .serializers import TareaSerializer, EtiquetaSerializer

class TareaViewSet(viewsets.ModelViewSet):
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        # Filtra las tareas para que solo se muestren las del usuario autenticado
        return Tarea.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EtiquetaViewSet(viewsets.ModelViewSet):
    serializer_class = EtiquetaSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        # Filtra las etiquetas para que solo se muestren las del usuario autenticado
        return Etiqueta.objects.filter(user=self.request.user)

