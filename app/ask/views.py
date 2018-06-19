#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 09:13
# @site  : https://github.com/SunmoonSan
from flask import Blueprint, render_template, request, flash
from flask.json import jsonify
from flask_login import current_user, login_required

from app.ask.models import Question, Answer, Comment
from app.dbs import db

ask = Blueprint('ask', __name__, url_prefix='/')


@ask.route('')
def index():
    return render_template('ask/index.html', current_user=current_user)


@ask.route('/question/add', methods=['GET', 'POST'])
@login_required
def question_add():
    if request.method == 'POST':
        title = request.form.get('title', '')
        content = request.form.get('content', '')
        question = Question.query.filter(Question.title == title).first()
        if not question:
            question = Question()
            question.title = title
            question.content = content
            question.author_id = current_user.id
            db.session.add(question)
            db.session.commit()
            # flash("问题创建成功！", "ok")
            return jsonify(status='success', info='创建成功！')
        else:
            return jsonify(status='error', info='已经存在该问题！')

    return render_template('ask/ask_question.html')


@ask.route('/question/list/<int:page>', methods=['GET', 'POST'])
def question_list(page=0):
    if page == 0:
        page = 1
    questions = Question.query.filter().paginate(page=page, per_page=2)

    return render_template('ask/list_question.html', qss=questions)


@ask.route('/question/<int:question_id>')
def question_detail(question_id):
    question = Question.query.filter_by(id=question_id).first_or_404()
    return render_template('ask/detail_question.html', qs=question)


@ask.route('/question/answer/<int:question_id>', methods=['GET', 'POST'])
@login_required
def question_answer(question_id):
    print(request.form, question_id)
    question = Question.query.filter_by(id=question_id).first()
    if not question:
        return jsonify(status='error', info='不存在该问题')
    else:
        answer = Answer()
        answer.content = request.form.get('content', '')
        answer.author_id = current_user.id
        answer.question_id = question.id
        question.answers_count += 1
        db.session.add(question)
        db.session.add(answer)

        db.session.commit()
        return jsonify(status='success', info='回答成功！')


@ask.route('/question/<int:question_id>/comment', methods=['GET', 'POST'])
@login_required
def question_comment(question_id):
    print('回复>>> ', request.form, question_id)
    print(request.form['content'])
    print(request.form['rid'])
    rid = request.form.get('rid', '')
    answer = Answer.query.filter_by(id=rid).first()
    if not answer:
        return jsonify(status='error', info='没有该条回复')

    comment = Comment()
    comment.content = request.form.get('content', '')
    comment.author_id = current_user.id
    comment.answer_id = answer.id
    answer.answers_count += 1
    db.session.add(answer)
    db.session.add(comment)
    db.session.commit()

    return jsonify(status='success', info='回复成功！')