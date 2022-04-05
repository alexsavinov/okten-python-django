from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import DestroyAPIView, GenericAPIView, ListCreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.profile.serializers import AddAvatarSerializer

from .permissons import IsAdmin, IsSuperUser
from .serializers import UserSerializer

UserModel = get_user_model()


class UserListCreateView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return AllowAny(),
        return super().get_permissions()

    def get_queryset(self):
        queryset = UserModel.objects.filter(pk=self.kwargs['pk'])
        return queryset


class UserToAdminView(GenericAPIView):
    permission_classes = (IsSuperUser,)
    queryset = UserModel.objects.all()

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_staff:
            raise ValueError('User is already admin')
        user.is_staff = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class AdminToUserView(GenericAPIView):
    permission_classes = (IsSuperUser,)
    queryset = UserModel.objects.all()

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_staff:
            raise ValueError('User is already not admin')
        user.is_staff = False
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class ActivateUserView(GenericAPIView):
    permission_classes = (IsAdmin,)
    queryset = UserModel.objects.all()

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_active:
            raise ValueError('User is already active')
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class DeactivateUserView(GenericAPIView):
    permission_classes = (IsAdmin,)
    queryset = UserModel.objects.all()

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            raise ValueError('User is already not active')
        user.is_active = False
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class DeleteUserView(DestroyAPIView):
    permission_classes = (IsAdmin,)
    queryset = UserModel.objects.all()

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        if user.is_superuser:
            raise ValueError('Cannot delete superuser')
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AddAvatarView(UpdateAPIView):
    serializer_class = AddAvatarSerializer

    def get_object(self):
        return self.request.user.profile


class ListExceptUserView(ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        qs = UserModel.objects.all()
        qs = qs.exclude(id=self.request.user.id)
        return qs
