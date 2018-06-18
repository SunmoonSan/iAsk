#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 09:36
# @site  : https://github.com/SunmoonSan
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app import app
from app.dbs import db
from app.auth.models import User
from app.ask.models import Question, Answer, Comment

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()

