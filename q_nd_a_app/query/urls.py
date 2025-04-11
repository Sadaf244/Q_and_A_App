from django.urls import path
from .views import QuestionAPI, AnswerAPI, LikeAPI

urlpatterns = [
    path('questions/', QuestionAPI.as_view()),
    path('questions/<int:question_id>/answers/', AnswerAPI.as_view()),
    path('answers/<int:answer_id>/like/', LikeAPI.as_view()),
]