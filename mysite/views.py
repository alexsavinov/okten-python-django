import json

from rest_framework.response import Response
from rest_framework.views import APIView


class UsersListCreateView(APIView):
    def get(self, *args, **kwargs):
        with open('users.json', encoding='utf-8') as file:
            return Response(json.load(file))

    def post(self, *args, **kwargs):
        with open('users.json', 'r+', encoding='utf-8') as file:
            users = json.load(file)
            users.append(self.request.data)
            file.seek(0)
            json.dump(users, file)
            return Response('created')
