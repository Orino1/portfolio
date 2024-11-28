from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from src.config import logger
from src.models import (
    Frameworks,
    Languages,
    Orms,
    ProjectVariantLanguage,
    ProjectVariantTechnology,
    Technologies,
    TechnologySections,
    db,
)
from src.validators import (
    LanguageCreateSchema,
    LanguageUpdateSchema,
    ORMFrameworkCreateSchema,
    TechnologyCreateSchema,
    TechnologySectionCreateSchema,
    TechnologyUpdateSchema,
)

skills_bp = Blueprint("skills", __name__)


@skills_bp.route("/", methods=["GET"])
def get_skills():
    try:
        languages = Languages.query.all()

        language_data = [
            {
                "id": language.id,
                "language": language.name,
                "orms": [{"id": orm.id, "name": orm.name} for orm in language.orms],
                "frameworks": [
                    {"id": framework.id, "name": framework.name}
                    for framework in language.frameworks
                ],
            }
            for language in languages
        ]

        technologies = Technologies.query.all()

        technologies_data = [
            {
                "id": technology.id,
                "name": technology.name,
                "section": [
                    {
                        "id": section.id,
                        "header": section.header,
                        "content": section.content,
                    }
                    for section in technology.sections
                ],
            }
            for technology in technologies
        ]

        return jsonify({"languages": language_data, "technologies": technologies_data})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return (
            jsonify({"msg": f"An unexpected error occurred. Please try again.{e}"}),
            500,
        )


@skills_bp.route("/techonolgy/<int:techonolgy_id>", methods=["DELETE"])
@jwt_required()
def delete_techonolgy(techonolgy_id):
    try:
        technology = Technologies.query.filter_by(id=techonolgy_id).first()

        if not technology:
            return jsonify({"msg": "Techonolgy not found."}), 400

        assiciated_tech = ProjectVariantTechnology.query.filter_by(
            technology_id=techonolgy_id
        ).first()

        if assiciated_tech:
            return jsonify({"msg": "Techonolgy used by a project."}), 401

        db.session.delete(technology)
        db.session.commit()

        return jsonify({"msg": "Techonolgy deleted successfully."})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )
    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/language/<int:language_id>", methods=["DELETE"])
@jwt_required()
def delete_language(language_id):
    try:
        language = Languages.query.filter_by(id=language_id).first()

        if not language:
            return jsonify({"msg": "Language not found."}), 404

        associated_lang = ProjectVariantLanguage.query.filter_by(
            language_id=language_id
        ).first()

        if associated_lang:
            return jsonify({"msg": "Languge used by a project."}), 401

        db.session.delete(language)
        db.session.commit()

        return jsonify({"msg": "Language deleted successfully."})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )
    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/techonolgy", methods=["POST"])
@jwt_required()
def add_techonolgy():
    try:
        techonolgy_schema = TechnologyCreateSchema()
        data = techonolgy_schema.load(request.get_json())

        new_technology = Technologies(name=data["name"])
        db.session.add(new_technology)
        db.session.flush()

        for section in data["sections"]:
            new_section = TechnologySections(
                header=section["header"],
                content=section["content"],
                technology_id=new_technology.id,
            )
            db.session.add(new_section)

        db.session.commit()

        return jsonify({"msg": "Techonolgy Added successfully."})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )
    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/language", methods=["POST"])
@jwt_required()
def add_language():
    try:
        language_shcema = LanguageCreateSchema()
        data = language_shcema.load(request.get_json())

        new_language = Languages(name=data["name"])
        db.session.add(new_language)
        db.session.flush()

        if data.get("orms"):
            for orm in data["orms"]:
                new_orm = Orms(name=orm, language_id=new_language.id)
                db.session.add(new_orm)

        if data.get("frameworks"):
            for framework in data["frameworks"]:
                new_framework = Frameworks(name=framework, language_id=new_language.id)
                db.session.add(new_framework)

        db.session.commit()

        return jsonify({"msg": "Language added successfully."})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/techonolgy/<int:id>", methods=["PATCH"])
@jwt_required()
def edit_techonolgy(id):
    try:
        techonolgy_schema = TechnologyUpdateSchema()
        data = techonolgy_schema.load(request.get_json())

        technology = Technologies.query.filter_by(id=data["id"])

        if not technology:
            return jsonify({"msg": "Techonolgy not found."}), 404

        if data.get("new_name"):
            technology.name = data["new_name"]

        if data.get("new_sections"):
            for section in data["new_sections"]:
                new_section = TechnologySections(
                    header=section["header"],
                    content=section["content"],
                    technology_id=technology.id,
                )
                db.session.add(new_section)
                db.session.flush()

        if data.get("old_sections"):
            for section in data["old_sections"]:
                old_section = TechnologySections.query.filter_by(id=section["id"])

                if not old_section:
                    return (
                        jsonify({"msg": f"Section with id {section['id']} not found."}),
                        400,
                    )
                if section.get("header"):
                    old_section.header = section["header"]
                if section.get("content"):
                    old_section.content = section["content"]

        db.session.commit()

        return jsonify({"msg": "Techonolgy updated successfully."})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/language/<int:id>", methods=["PATCH"])
@jwt_required()
def edit_language(id):
    try:
        language_schema = LanguageUpdateSchema()
        data = language_schema.load(request.get_json())

        language = Languages.query.filter_by(id=data["id"])

        if not language:
            return jsonify({"msg": "Language not found."}), 404

        if data.get("new_name"):
            language.name = data["new_name"]

        if data.get("new_orms"):
            for orm in data["new_orms"]:
                new_orm = Orms(name=orm, language_id=language.id)
                db.session.add(new_orm)
                db.session.flush()

        if data.get("new_frameworks"):
            for framework in data["new_frameworks"]:
                new_framework = Frameworks(name=framework, language_id=language.id)
                db.session.add(new_framework)
                db.session.flush()

        if data.get("old_orm"):
            for orm in data["old_orms"]:
                old_orm = Orms.query.filter_by(id=old_orm["id"])

                if not old_orm:
                    return jsonify({"msg": f"Orm with id {orm['id']} not found."}), 404

                old_orm.name = orm["name"]

        if data.get("old_orm"):
            for framwork in data["old_frameworks"]:
                old_framwork = Frameworks.query.filter_by(id=framwork["id"])

                if not old_framwork:
                    return (
                        jsonify({"msg": f"Framework with id {orm['id']} not found."}),
                        404,
                    )

                old_framwork.name = framework["name"]

        db.session.commit()

        return jsonify({"msg": "Language updated successfully."})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/language/<int:language_id>/orm/<int:orm_id>", methods=["DELETE"])
@jwt_required()
def delete_orm(language_id, orm_id):
    try:
        language = Languages.query.filter_by(id=language_id).first()
        if not language:
            return jsonify({"msg", "Language not found."}), 404

        orm = Orms.query.filter_by(id=orm_id)
        if not orm:
            return jsonify({"msg": "Orm not found."}), 404

        db.session.delete(orm)
        db.session.commit()

        return jsonify({"msg": "Orm deleted successfully"})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route(
    "/language/<int:language_id>/framework/<int:framework_id>", methods=["DELETE"]
)
@jwt_required()
def delete_framework(language_id, framework_id):
    try:
        language = Languages.query.filter_by(id=language_id).first()
        if not language:
            return jsonify({"msg", "Language not found."}), 404

        framework = Frameworks.query.filter_by(id=framework_id)
        if not framework:
            return jsonify({"msg": "Framework not found."}), 404

        db.session.delete(framework)
        db.session.commit()

        return jsonify({"msg": "Framework deleted successfully"})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route(
    "/technology/<int:technology_id>/section/<int:section_id>", methods=["DELETE"]
)
@jwt_required()
def delete_technology_section(technology_id, section_id):
    try:
        tech = Technologies.query.filter_by(id=technology_id).first()
        if not tech:
            return jsonify({"msg", "Technology not found."}), 404

        tech_section = TechnologySections.query.filter_by(id=section_id)

        if not tech_section:
            return jsonify({"msg": "Technology section not found."}), 404

        db.session.delete(tech_section)
        db.session.commit()

        return jsonify({"msg": "Technology section deleted successfully"})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/language/<int:language_id>/orm", methods=["POST"])
@jwt_required()
def add_orm(language_id):
    try:
        orm_schema = ORMFrameworkCreateSchema()
        data = orm_schema.load(request.get_json())

        language = Languages.query.filter_by(id=language_id).first()
        if not language:
            return jsonify({"msg", "Language not found."}), 404

        new_orm = Orms(name=data["name"], language_id=language_id)

        db.session.add(new_orm)
        db.session.commit()

        return jsonify({"msg": "Orm added successfully"})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/language/<int:language_id>/framework", methods=["POST"])
@jwt_required()
def add_framework(language_id):
    try:
        framework_schema = ORMFrameworkCreateSchema()
        data = framework_schema.load(request.get_json())

        language = Languages.query.filter_by(id=language_id).first()
        if not language:
            return jsonify({"msg", "Language not found."}), 404

        new_framework = Frameworks(name=data["name"], language_id=language_id)

        db.session.add(new_framework)
        db.session.commit()

        return jsonify({"msg": "Framework deleted successfully"})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@skills_bp.route("/technology/<int:technology_id>/section/", methods=["POST"])
@jwt_required()
def add_technology_section(technology_id):
    try:
        tech_section_schema = TechnologySectionCreateSchema()
        data = tech_section_schema.load(request.get_json())

        technology = Technologies.query.filter_by(id=technology_id).first()
        if not technology:
            return jsonify({"msg", "Technology not found."}), 404

        new_technology = TechnologySections(
            name=data["name"], technology_id=technology_id
        )

        db.session.add(new_technology)
        db.session.commit()

        return jsonify({"msg": "Technology section added successfully"})

    except ValidationError as e:
        return jsonify({"msg": f"{e}"}), 400

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500
