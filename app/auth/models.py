#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 09:30
# @site  : https://github.com/SunmoonSan
from flask_login import UserMixin
from sqlalchemy import Column
from werkzeug.security import generate_password_hash, check_password_hash

from app.dbs import db


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = Column(db.Integer, primary_key=True)
    username = Column(db.String(32), nullable=False, unique=True)
    email = Column(db.String(64), nullable=False, unique=True)
    password = Column(db.String(128))

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password, password)