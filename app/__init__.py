#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 08:59
# @site  : https://github.com/SunmoonSan
from app.app import app
from app.ask import ask
from app.auth import auth
from app.auth.models import User
from app.extensions import login_manager


def config_login(app):
    login_manager.login_view = 'ask.index'
    login_manager.refresh_view = 'ask.index'
    login_manager.login_message = '请先登录！'
    login_manager.session_protection = 'basic'
    login_manager.init_app(app=app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)

    login_manager.setup_app(app)


app.register_blueprint(ask)
app.register_blueprint(auth)
config_login(app)
