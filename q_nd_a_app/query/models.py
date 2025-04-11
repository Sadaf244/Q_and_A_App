from django.db import models
from accounts.models import CustomUser
# Create your models here.


class Question(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.title} (By: {self.user.email})"

    @staticmethod
    def create_question(user, title, body):
        return Question.objects.create(author=user, title=title, body=body)

    @staticmethod
    def get_question_by_id(question_id):
        try:
            return Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            logging.error(f"Question {question_id} not found")
            return None

    @staticmethod
    def get_all_questions():
        return Question.objects.all().values('id', 'title', 'body', 'author__email', 'created_at')

class Answer(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Answer to '{self.question.title}' by {self.user.email}"

    @staticmethod
    def create_answer(user, question_id, text):
        question = Question.get_question_by_id(question_id)
        if question:
            return Answer.objects.create(author=user, question=question, text=text)
        return None

    @staticmethod
    def get_answers_for_question(question_id):
        answers = Answer.objects.filter(question_id=question_id).prefetch_related('likes')
        answer_data = []
        for answer in answers:
            likes = answer.likes.all().values_list('user__email', flat=True)
            answer_data.append({
                'id': answer.id,
                'text': answer.text,
                'user': answer.author.email,
                'created_at': answer.created_at,
                'like_count': answer.likes.count(),
                'liked_by': list(likes),
            })
        return answer_data


class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'answer')

    @staticmethod
    def toggle_like(user, answer_id):
        answer = Answer.objects.filter(id=answer_id).first()
        if not answer:
            return False
        like, created = Like.objects.get_or_create(user=user, answer=answer)
        if not created:
            like.delete()
            return False
        return True

class QuestionManager:
    def __init__(self, user, request_data=None):
        self.user = user
        self.request_data = request_data

    def create_question(self):
        resp = {'status': False, 'message': 'Invalid data'}
        if self.request_data:
            title = self.request_data.data.get('title')
            body = self.request_data.data.get('body')
            if title and body:
                Question.create_question(self.user, title, body)
                resp.update({'status': True, 'message': 'Question posted!'})
        return resp

    def get_all_questions(self):
        return Question.get_all_questions()


class AnswerManager:
    def __init__(self, user, question_id=None, request_data=None):
        self.user = user
        self.question_id = question_id
        self.request_data = request_data

    def post_answer(self):
        resp = {'status': False, 'message': 'Invalid question'}
        text = self.request_data.data.get('answer')
        if text and self.question_id:
            answer = Answer.create_answer(self.user, self.question_id, text)
            if answer:
                resp.update({'status': True, 'message': 'Answer posted!'})
        return resp

    def get_answers(self):
        answers = Answer.get_answers_for_question(self.question_id)
        return {
            'answers': answers,
            'current_user_id': self.user.id
        }


class LikeManager:
    def __init__(self, user, answer_id):
        self.user = user
        self.answer_id = answer_id

    def toggle_like(self):
        liked = Like.toggle_like(self.user, self.answer_id)
        return {
            'status': True,
            'message': 'Liked!' if liked else 'Like removed',
            'liked': liked
        }