from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Projects(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    link = db.Column(db.String(200), nullable=True)
    github_link = db.Column(db.String(200), nullable=True)
    technologies = db.Column(db.String(200), nullable=False)


class Admin(db.Model):
    __tablename__ = "admin"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)


class Thumbnail(db.Model):
    __tablename__ = "thumbnails"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file = db.Column(db.String(255), nullable=False)


class Posts(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.String(255), nullable=False)
    listed = db.Column(db.Boolean, default=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    thumbnail_id = db.Column(db.Integer, db.ForeignKey("thumbnails.id"), nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=db.func.current_timestamp()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "public_id": self.public_id,
            "listed": self.listed,
            "title": self.title,
            "content": self.content,
            "thumbnail": self.thumbnail,
            "created_at": self.created_at,
        }

class Languages(db.Model):
    __tablename__ = "languages"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)


class Orms(db.Model):
    __tablename__ = "orms"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey("languages.id"), nullable=False)


class Frameworks(db.Model):
    __tablename__ = "frameworks"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey("languages.id"), nullable=False)


class Technologies(db.Model):
    __tablename__ = "technologies"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)


class TechnologySections:
    __tablename__ = "technology_sections"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    header = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    technology_id = db.Column(
        db.Integer, db.ForeignKey("technologies.id"), nullable=False
    )
