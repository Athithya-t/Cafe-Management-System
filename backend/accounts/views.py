from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from history.serializers import DiningSerializer
from history.models import Dining
from django.shortcuts import render
from django.http import JsonResponse
import json

@api_view(['GET'])
def login(request):
    dining_serializer = DiningSerializer(data = request.data)

    if dining_serializer.is_valid():
        new_dining = dining_serializer.save()
        request.session.create()
        request.session['dining'] = new_dining.pk
        data = {"session_id":request.session.session_key, "dining_id":request.session['dining']}
        return Response(data, status=status.HTTP_201_CREATED)
        
    return Response(dining_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #data = {'Name':'Jon Doe','age':'20'}
    #return JsonResponse(data)
#
#@api_view(['POST'])
#def submit_data(request):
#    if request.method=='POST':
#        try:
#            data = json.loads(request.body)
#            print(data)
#            return JsonResponse({'message':'Data recieved'})
#        except json.JSONDecodeError:
#            return JsonResponse({'error':'Invalid data'},status=400)
#    return JsonResponse({'error':'Invalid Req'},status=405)
#
class DiningCreateView(generics.CreateAPIView):
    serializer_class = DiningSerializer
    queryset = Dining.objects.all()

    def perform_create(self, serializer):
        instance = serializer.save()
        return instance
    
    def create(self, request, *args, **kwargs):

        session_id = request.COOKIES.get('sessionid')

        if session_id:
            request.session['session_key'] = session_id
            data= {'message' : 'already occupying dining ID {}'.format(request.session['dining_id'])}
            return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_dining = self.perform_create(serializer)
        request.session.create()
        request.session['dining_id'] = new_dining.pk
        data = {"session_id":request.session.session_key, "dining_id":request.session['dining_id']}
        return Response(data, status=status.HTTP_201_CREATED)
   


