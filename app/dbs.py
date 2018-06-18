#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 09:09
# @site  : https://github.com/SunmoonSan
from flask_sqlalchemy import SQLAlchemy
from app.app import app

db = SQLAlchemy(app=app)
