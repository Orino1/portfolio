from config import Config
from flask import Flask
from flask_migrate import Migrate
from models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    migrate = Migrate(app, db)

    with app.app_context():

        # importing models for migrations
        from models import Projects

        # imoprting blueprints
        from routes import auth_bp, contact_bp, projects_bp, skills_bp

        # registrign blueprints
        app.register_blueprint(auth_bp, url_prefix="/api/auth")
        app.register_blueprint(projects_bp, url_prefix="/api/projects")
        app.register_blueprint(skills_bp, url_prefix="/api/skills")
        app.register_blueprint(contact_bp, url_prefix="/api/contact")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
