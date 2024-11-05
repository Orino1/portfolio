from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Projects(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    link = db.Column(db.String(200), nullable=True)
    github_link = db.Column(db.String(200), nullable=True)
    technologies = db.Column(db.String(200), nullable=False)
