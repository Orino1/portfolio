from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from src.config import logger
from src.models import (
    Frameworks,
    Languages,
    Orms,
    Project,
    ProjectVariant,
    ProjectVariantLanguage,
    ProjectVariantLanguageFramework,
    ProjectVariantLanguageOrm,
    ProjectVariantTechnology,
    Technologies,
    ProjectVariantLanguageLib,
    Libraries,
    db,
)
from src.validators import ProjectCreateSchema, ProjectUpdateSchema

projects_bp = Blueprint("projects", __name__)


@projects_bp.route("/", strict_slashes=False, methods=["GET"])
def get_all_projects():
    try:
        projects = Project.query.all()
        return jsonify(
            {
                "projects": [
                    {
                        "id": project.id,
                        "name": project.name,
                        "description": project.description,
                        "problem_statement": project.problem_statement,
                        "solution": project.solution,
                        "variants": [
                            {
                                "id": variant.id,
                                "link": variant.link,
                                "github": variant.github,
                                "id": variant.id,
                                "languages": [
                                    {"id": lang.id, "name": lang.lang.name, "actual_language_id" : lang.lang.id, "orms": [ {"id": orm.id, "name": orm.orm.name, "actual_id": orm.orm.id} for orm in lang.orms], "frameworks": [ {"id": fr.id, "name": fr.framework.name, "actual_id": fr.framework.id} for fr in lang.frameworks], "libs": [ {"id": lib.id, "name": lib.lib.name, "actual_id": lib.lib.id} for lib in lang.libs] } for lang in variant.languages
                                ],
                                "technologies": [
                                    tech.tech.name for tech in variant.technologies
                                ],
                            }
                            for variant in project.variants
                        ],
                    }
                    for project in projects
                ]
            }
        )

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )
    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return (
            jsonify({"msg": "An unexpected error occurred. Please try again."}),
            500,
        )


@projects_bp.route("/", strict_slashes=False, methods=["POST"])
@jwt_required()
def create_project():
    try:
        project_schema = ProjectCreateSchema()
        data = project_schema.load(request.get_json())

        new_project = Project(
            name=data["name"],
            description=data["description"],
            problem_statement=data["problem_statement"],
            solution=data["solution"],
        )
        db.session.add(new_project)
        db.session.flush()

        for variant in data["variants"]:
            new_variant = ProjectVariant(
                link=variant.get("link"),
                github=variant.get("github"),
                project_id=new_project.id,
            )
            db.session.add(new_variant)
            db.session.flush()

            for language in variant["languages"]:
                associated_language = ProjectVariantLanguage(
                    language_id=language["id"], project_variant_id=new_variant.id
                )
                db.session.add(associated_language)
                db.session.flush()

                if language.get("orms"):
                    for orm_id in language["orms"]:
                        orm_exists = Orms.query.filter_by(id=orm_id).first()
                        if not orm_exists:
                            return jsonify({"msg": "Orm not found"}), 400

                        assiciated_language_orm = ProjectVariantLanguageOrm(
                            project_variant_language_id=associated_language.id,
                            orm_id=orm_id,
                        )
                        db.session.add(assiciated_language_orm)

                if language.get("frameworks"):
                    for framework_id in language["frameworks"]:
                        framework_exists = Frameworks.query.filter_by(id=framework_id).first()
                        if not framework_exists:
                            return jsonify({"msg": "Framework not found"}), 400

                        assiciated_language_framework = ProjectVariantLanguageFramework(
                            project_variant_language_id=associated_language.id,
                            framework_id=framework_id,
                        )
                        db.session.add(assiciated_language_framework)

                if language.get("libraries"):
                    for lib_id in language["libraries"]:
                        lib_exists = Libraries.query.filter_by(id=lib_id).first()
                        if not lib_exists:
                            return jsonify({"msg": "Library not found"}), 400

                        assiciated_language_lib = ProjectVariantLanguageLib(
                            project_variant_language_id=associated_language.id,
                            lib_id=lib_id,
                        )
                        db.session.add(assiciated_language_lib)

            if variant.get("technologies"):
                for id in variant["technologies"]:
                    associated_technology = ProjectVariantTechnology(
                        technology_id=id, project_variant_id=new_variant.id
                    )
                    db.session.add(associated_technology)

        db.session.commit()

        return jsonify({"msg": "Project added successfully."})

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
        return (
            jsonify({"msg": "An unexpected error occurred. Please try again."}),
            500,
        )


@projects_bp.route("/<int:project_id>", strict_slashes=False, methods=["PATCH"])
@jwt_required()
def update_project(project_id):
    try:
        project = Project.query.filter_by(id=project_id).first()
        if not project:
            return jsonify({"msg": "Project not found."})

        project_update_schema = ProjectUpdateSchema()
        data = project_update_schema.load(request.get_json())

        if data.get("name"):
            project.name = data["name"]
        if data.get("description"):
            project.description = data["description"]
        if data.get("problem_statement"):
            project.problem_statement = data["problem_statement"]
        if data.get("solution"):
            project.solution = data["solution"]

        if data.get("new_variants"):
            for variant in data["new_variants"]:
                project_variant = ProjectVariant(
                    link=variant["link"],
                    github=variant.get("github"),
                    project_id=project.id,
                )
                db.session.add(project_variant)
                db.session.flush()

                for langauge in variant["languages"]:
                    associated_language = ProjectVariantLanguage(
                        language_id=langauge["id"],
                        project_variant_id=project_variant.id,
                    )
                    db.session.add(associated_language)
                    db.session.flush()

                    if language.get("orms"):
                        for orm_id in language["orms"]:
                            assiciated_language_orm = ProjectVariantLanguageOrm(
                                project_variant_language_id=associated_language.id,
                                orm_id=orm_id,
                            )
                            db.session.add(assiciated_language_orm)

                    if language.get("frameworks"):
                        for framework_id in language["frameworks"]:
                            assiciated_language_framework = (
                                ProjectVariantLanguageFramework(
                                    project_variant_language_id=associated_language.id,
                                    framework_id=framework_id,
                                )
                            )
                            db.session.add(assiciated_language_framework)
                    
                    if language.get("libraries"):
                        for lib_id in language["libraries"]:
                            assiciated_language_lib = (
                                ProjectVariantLanguageLib(
                                    project_variant_language_id=associated_language.id,
                                    lib_id=lib_id,
                                )
                            )
                            db.session.add(assiciated_language_lib)

                for id in variant["technologies"]:
                    technology_association = ProjectVariantTechnology(
                        technology_id=id, project_variant_id=project_variant.id
                    )
                    db.session.add(technology_association)

        if data.get("update_variants"):
            for variant in data["update_variants"]:
                variant_to_be_updated = ProjectVariant.query.filter_by(
                    id=variant["id"]
                ).first()

                if variant.get("link"):
                    variant_to_be_updated.link = variant["link"]
                if variant.get("github"):
                    variant_to_be_updated.github = variant["github"]

                if variant.get("new_languages"):
                    for lang_id in variant["new_languages"]:
                        language = Languages.query.filter_by(id=lang_id).first()
                        if not language:
                            return (
                                jsonify(
                                    {"msg": f"Language with id {lang_id} not found."}
                                ),
                                404,
                            )
                        associated_language = ProjectVariantLanguage(
                            language_id=lang_id,
                            project_variant_id=variant_to_be_updated.id,
                        )
                        db.session.add(associated_language)
                if variant.get("delete_languages"):
                    for lang_id in variant["delete_languages"]:
                        associated_language = ProjectVariantLanguage.query.filter_by(
                            id=lang_id
                        ).first()
                        if not associated_language:
                            return (
                                jsonify(
                                    {
                                        "msg": f"Associated language with id {lang_id} not found."
                                    }
                                ),
                                404,
                            )
                        db.session.delete(associated_language)
                
                # we need to hanlde updated stuff hrere

                if variant.get("new_technologies"):
                    for tech_id in variant["new_technologies"]:
                        tech = Technologies.query.filter_by(id=tech_id).first()
                        if not tech:
                            return (
                                jsonify(
                                    {"msg": f"Technology with id {tech_id} not found."}
                                ),
                                404,
                            )
                        associated_technology = ProjectVariantTechnology(
                            technology_id=tech_id,
                            project_variant_id=variant_to_be_updated.id,
                        )
                        db.session.add(associated_technology)
                if variant.get("delete_technologies"):
                    for tech_id in variant["delete_technologies"]:
                        associated_technology = (
                            ProjectVariantTechnology.query.filter_by(id=tech_id).first()
                        )
                        if not associated_technology:
                            return (
                                jsonify(
                                    {
                                        "msg": f"Associated technology with id {tech_id} not found."
                                    }
                                ),
                                404,
                            )
                        db.session.delete(associated_technology)

                if variant.get("link"):
                    variant_to_be_updated.link = variant["link"]

        if data.get("delete_variants"):
            for variant_id in data["delete_variants"]:
                variant = ProjectVariant.query.filter_by(id=variant_id).first()
                db.session.delete(variant)

        db.session.commit()
        return jsonify({"msg": "Project updated successfully."})

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
        return (
            jsonify({"msg": "An unexpected error occurred. Please try again."}),
            500,
        )


@projects_bp.route("/<int:project_id>", strict_slashes=False, methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    try:
        project = Project.query.filter_by(id=project_id).first()

        if not project:
            return jsonify({"msg": "Project not found."})

        db.session.delete(project)
        db.session.commit()

        return jsonify({"msg": "Project deleted successfully."})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return (
            jsonify({"msg": "An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return (
            jsonify({"msg": "An unexpected error occurred. Please try again."}),
            500,
        )
