#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 09:33
# @site  : https://github.com/SunmoonSan
from flask import Blueprint, request, redirect, current_app, url_for, jsonify
from flask_login import login_required, login_user, logout_user
from sqlalchemy import or_

from app.auth.models import User
from app.dbs import db

auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.route('/signup/', methods=['POST'])
def signup_user():
    try:
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        u = User.query.filter(or_(User.username == username, User.email == email)).first()
        if u:
            return jsonify(status='error', info=u'已经存在该用户！')
        else:
            u = User()
            u.username = username
            u.email = email
            u.set_password(password)
            db.session.add(u)
            db.session.commit()
            return jsonify(status='success', info=u'恭喜你,注册成功了!')
    except Exception as e:
        current_app.logger.error(e)
        return redirect(url_for('ask.index'))


@auth.route('/login/', methods=['POST'])
def login_users():
    try:
        username = request.form['username']
        password = request.form['password']

        u = User.query.filter_by(username=username).first()
        if u:
            if u.verify_password(password):
                login_user(u)

        return redirect(url_for('ask.index'))
    except Exception as e:
        current_app.logger.error(e)
        return redirect(url_for('ask.index'))


@auth.route('/logout', methods=['GET'])
@login_required
def logout_users():
    logout_user()
    return redirect(url_for('ask.index'))
