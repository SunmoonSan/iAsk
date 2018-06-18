#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @desc  : Created by San on 2018-06-18 09:08
# @site  : https://github.com/SunmoonSan

class FlaskConfig(object):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@localhost:3306/iask"
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = "jasmine"
