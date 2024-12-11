import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from .config import Config
from .models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    migrate = Migrate(app, db)

    jwt = JWTManager(app)

    # allowing cross origin esource sharing
    CORS(
        app, origins=os.getenv("CORS_ORIGINS", "").split(","), supports_credentials=True
    )

    with app.app_context():

        # importing models for migrations
        from .models import (Admin, Frameworks, Languages, Libraries, Orms,
                             Project, ProjectVariant, ProjectVariantLanguage,
                             ProjectVariantLanguageFramework,
                             ProjectVariantLanguageOrm,
                             ProjectVariantTechnology, Technologies,
                             TechnologySections)

    # imoprting blueprints
    from .routes import auth_bp, projects_bp, skills_bp

    # registering blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")
    app.register_blueprint(skills_bp, url_prefix="/api/skills")

    return app
