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
    ProjectVariantLanguageOrm,
    ProjectVariantLanguageFramework,
    Libraries,
    ProjectVariantLanguageLib,
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
                "libraries": [
                    {"id": lib.id, "name": lib.name}
                    for lib in language.libraries
                ]
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

        if data.get("libraries"):
            for lib in data["libraries"]:
                new_lib = Libraries(name=lib, language_id=new_language.id)
                db.session.add(new_lib)

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


@skills_bp.route("/techonolgy/<int:tech_id>", methods=["PATCH"])
@jwt_required()
def update_techonolgy(tech_id):
    try:
        techonolgy_schema = TechnologyUpdateSchema()
        data = techonolgy_schema.load(request.get_json())

        technology = Technologies.query.filter_by(id=tech_id).first()

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
                old_section = TechnologySections.query.filter_by(id=section["id"]).first()

                if not old_section:
                    return (
                        jsonify({"msg": f"Section with id {section['id']} not found."}),
                        400,
                    )
                if section.get("header"):
                    old_section.header = section["header"]
                if section.get("content"):
                    old_section.content = section["content"]

        if data.get("delete_sections"):
            if len(data["delete_sections"]) == len(technology.sections) + len(data.get("new_sections", [])):
                return jsonify({"msg": "Cannot delete all sections for the technology."}), 400

            for section_id in data["delete_sections"]:
                section_to_delete = TechnologySections.query.filter_by(id=section_id).first()
                if not section_to_delete:
                    return jsonify({"msg": f"Section with id {section_id} not found."}), 400
                db.session.delete(section_to_delete)

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


@skills_bp.route("/language/<int:lang_id>", methods=["PATCH"])
@jwt_required()
def update_language(lang_id):
    try:
        language_schema = LanguageUpdateSchema()
        data = language_schema.load(request.get_json())

        language = Languages.query.filter_by(id=lang_id).first()

        if not language:
            return jsonify({"msg": "Language not found."}), 404

        if data.get("new_name"):
            language.name = data["new_name"]

        if data.get("new_orms"):
            for orm in data["new_orms"]:
                new_orm = Orms(name=orm, language_id=language.id)
                db.session.add(new_orm)

        if data.get("new_frameworks"):
            for framework in data["new_frameworks"]:
                new_framework = Frameworks(name=framework, language_id=language.id)
                db.session.add(new_framework)

        if data.get("new_libraries"):
            for lib in data["new_libraries"]:
                new_lib = Libraries(name=lib, language_id=language.id)
                db.session.add(new_lib)

        if data.get("old_orm"):
            for orm in data["old_orms"]:
                old_orm = Orms.query.filter_by(id=old_orm["id"])

                if not old_orm:
                    return jsonify({"msg": f"Orm with id {orm['id']} not found."}), 404

                old_orm.name = orm["name"]

        if data.get("old_frameworks"):
            for framwork in data["old_frameworks"]:
                old_framwork = Frameworks.query.filter_by(id=framwork["id"])

                if not old_framwork:
                    return (
                        jsonify({"msg": f"Framework with id {orm['id']} not found."}),
                        404,
                    )

                old_framwork.name = framework["name"]

        if data.get("old_libraries"):
            for lib in data["old_libraries"]:
                old_lib = Frameworks.query.filter_by(id=lib["id"])

                if not old_lib:
                    return (
                        jsonify({"msg": f"Library with id {lib['id']} not found."}),
                        404,
                    )

                old_lib.name = lib["name"]

        if data.get("delete_orms"):
            for orm_id in data["delete_orms"]:
                linked_project = ProjectVariantLanguageOrm.query.filter_by(orm_id=orm_id).first()
                if linked_project:
                    return jsonify({"msg": "Cannot delete an orm wich is linked to a project"}), 400
                orm = Orms.query.filter_by(id=orm_id).first()
                db.session.delete(orm)
        
        if data.get("delete_frameworks"):
            for framework_id in data["delete_frameworks"]:
                linked_project = ProjectVariantLanguageFramework.query.filter_by(framework_id=framework_id).first()
                if linked_project:
                    return jsonify({"msg": "Cannot delete a framework wich is linked to a project"}), 400
                framework = Frameworks.query.filter_by(id=framework_id).first()
                db.session.delete(framework)

        if data.get("delete_libraries"):
            for lib_id in data["delete_libraries"]:
                linked_project = ProjectVariantLanguageLib.query.filter_by(lib_id=lib_id).first()
                if linked_project:
                    return jsonify({"msg": "Cannot delete a lib wich is linked to a project"}), 400
                lib = Libraries.query.filter_by(id=lib_id).first()
                db.session.delete(lib)

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
