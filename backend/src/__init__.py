from flask import Flask
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

    with app.app_context():

        # importing models for migrations
        from .models import (
            Admin,
            Frameworks,
            Languages,
            Orms,
            Posts,
            Project,
            ProjectVariant,
            ProjectVariantLanguage,
            ProjectVariantLanguageFramework,
            ProjectVariantLanguageOrm,
            ProjectVariantTechnology,
            Technologies,
            TechnologySections,
            Thumbnail,
        )

    # imoprting blueprints
    from .routes import auth_bp, posts_bp, projects_bp, skills_bp

    # registering blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")
    app.register_blueprint(skills_bp, url_prefix="/api/skills")
    app.register_blueprint(posts_bp, url_prefix="/api/posts")

    # allowing cross origin esource sharing
    @app.after_request
    def allow_cors(response):
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = (
            "GET, POSTS, PATCH, DELETE, OPTIONS"
        )
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    return app
