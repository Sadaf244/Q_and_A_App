from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.authentication import JWTAuthentication
from .models import QuestionManager, AnswerManager, LikeManager


class QuestionAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        manager = QuestionManager(request.user, request)
        result = manager.create_question()
        return Response(result)

    def get(self, request):
        manager = QuestionManager(request.user)
        questions = manager.get_all_questions()
        return Response({'status': True, 'data': questions})


class AnswerAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request, question_id):
        manager = AnswerManager(request.user, question_id, request)
        result = manager.post_answer()
        return Response(result)

    def get(self, request, question_id):
        manager = AnswerManager(request.user, question_id)
        answers = manager.get_answers()
        return Response({'status': True, 'data': answers})


class LikeAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request, answer_id):
        manager = LikeManager(request.user, answer_id)
        result = manager.toggle_like()
        return Response(result)