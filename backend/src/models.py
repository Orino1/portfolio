from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    problem_statement = db.Column(db.Text, nullable=False)
    solution = db.Column(db.Text, nullable=False)

    variants = db.relationship(
        "ProjectVariant", backref="project", cascade="all, delete-orphan"
    )


class ProjectVariant(db.Model):
    __tablename__ = "project_variant"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    link = db.Column(db.String(255), nullable=True)
    github = db.Column(db.String(255), nullable=False)
    project_id = db.Column(
        db.Integer, db.ForeignKey("project.id", ondelete="CASCADE"), nullable=False
    )

    languages = db.relationship(
        "ProjectVariantLanguage",
        backref="project_variant",
        cascade="all, delete-orphan",
    )
    technologies = db.relationship(
        "ProjectVariantTechnology",
        backref="project_variant",
        cascade="all, delete-orphan",
    )


class ProjectVariantLanguage(db.Model):
    __tablename__ = "project_variant_language"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    language_id = db.Column(db.Integer, db.ForeignKey("languages.id"), nullable=False)
    project_variant_id = db.Column(
        db.Integer,
        db.ForeignKey("project_variant.id", ondelete="CASCADE"),
        nullable=False,
    )

    lang = db.relationship("Languages", backref="project_variant_language")
    frameworks = db.relationship(
        "ProjectVariantLanguageFramework", backref="project_variant_language"
    )
    orms = db.relationship(
        "ProjectVariantLanguageOrm", backref="project_variant_language"
    )
    libs = db.relationship(
        "ProjectVariantLanguageLib", backref="project_variant_language"
    )


class ProjectVariantLanguageFramework(db.Model):
    __tablename__ = "project_variant_framework"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_variant_language_id = db.Column(
        db.Integer,
        db.ForeignKey("project_variant_language.id", ondelete="CASCADE"),
        nullable=False,
    )
    framework_id = db.Column(
        db.Integer, db.ForeignKey("frameworks.id", ondelete="CASCADE"), nullable=False
    )

    framework = db.relationship(
        "Frameworks", backref="project_variant_language_frameworks"
    )


class ProjectVariantLanguageOrm(db.Model):
    __tablename__ = "project_variant_orm"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_variant_language_id = db.Column(
        db.Integer,
        db.ForeignKey("project_variant_language.id", ondelete="CASCADE"),
        nullable=False,
    )
    orm_id = db.Column(
        db.Integer, db.ForeignKey("orms.id", ondelete="CASCADE"), nullable=False
    )

    orm = db.relationship("Orms", backref="project_variant_language_orms")


class ProjectVariantLanguageLib(db.Model):
    __tablename__ = "project_variant_lib"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_variant_language_id = db.Column(
        db.Integer,
        db.ForeignKey("project_variant_language.id", ondelete="CASCADE"),
        nullable=False,
    )
    lib_id = db.Column(
        db.Integer, db.ForeignKey("libraries.id", ondelete="CASCADE"), nullable=False
    )

    lib = db.relationship("Libraries", backref="project_variant_language_labraries")


class ProjectVariantTechnology(db.Model):
    __tablename__ = "project_variant_technology"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    technology_id = db.Column(
        db.Integer, db.ForeignKey("technologies.id"), nullable=False
    )
    project_variant_id = db.Column(
        db.Integer,
        db.ForeignKey("project_variant.id", ondelete="CASCADE"),
        nullable=False,
    )

    tech = db.relationship("Technologies", backref="project_variant_technology")


class Admin(db.Model):
    __tablename__ = "admin"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)


class Languages(db.Model):
    __tablename__ = "languages"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)

    orms = db.relationship("Orms", backref="languages", cascade="all, delete-orphan")
    frameworks = db.relationship(
        "Frameworks", backref="languages", cascade="all, delete-orphan"
    )
    libraries = db.relationship("Libraries", backref="languages", cascade="all, delete-orphan")


class Orms(db.Model):
    __tablename__ = "orms"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    language_id = db.Column(
        db.Integer, db.ForeignKey("languages.id", ondelete="CASCADE"), nullable=False
    )


class Frameworks(db.Model):
    __tablename__ = "frameworks"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    language_id = db.Column(
        db.Integer, db.ForeignKey("languages.id", ondelete="CASCADE"), nullable=False
    )

class Libraries(db.Model):
    __tablename__ = "libraries"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    language_id = db.Column(
        db.Integer, db.ForeignKey("languages.id", ondelete="CASCADE"), nullable=False
    )


class Technologies(db.Model):
    __tablename__ = "technologies"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)

    sections = db.relationship(
        "TechnologySections", backref="technologies", cascade="all, delete-orphan"
    )


class TechnologySections(db.Model):
    __tablename__ = "technology_sections"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    header = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    technology_id = db.Column(
        db.Integer, db.ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
