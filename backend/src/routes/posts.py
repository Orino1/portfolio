import os
import uuid

from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from sqlalchemy import desc
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.utils import secure_filename

from src.config import logger
from src.models import Posts, Thumbnail, db
from src.routes.utils import allowed_file
from src.validators import PostCreateSchema, PostUpdateSchema

posts_bp = Blueprint("posts", __name__)


@posts_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_posts():
    try:
        posts = Posts.query.all()

        return jsonify(
            {
                "posts": [
                    {
                        "id": post.id,
                        "public_id": post.public_id,
                        "listed": post.listed,
                        "title": post.title,
                        "content": post.content,
                        "created_at": post.created_at,
                        "thumbnail_id": post.thumbnail.id,
                        "thumbnail_file": post.thumbnail.file,
                    }
                    for post in posts
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
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@posts_bp.route("/listed/<string:public_id>", methods=["GET"])
def get_listed_post(public_id):
    try:
        post = Posts.query.filter_by(public_id=public_id).first()

        if not post:
            return jsonify({"msg": "Post not found"})

        return jsonify(
            {
                "title": post.title,
                "content": post.content,
                "thumbnail_id": post.thumbnail_id,
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
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@posts_bp.route("/listed", methods=["GET"])
def get_listed_posts():
    try:
        posts = Posts.query.filter_by(listed=True).all()

        return jsonify(
            {
                "posts": [
                    {
                        "public_id": post.public_id,
                        "title": post.title,
                        "content": post.content,
                        "created_at": post.created_at,
                        "thumbnail": post.thumbnail.file,
                    }
                    for post in posts
                ]
            }
        )

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        return (
            jsonify({"msg": f"An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@posts_bp.route("/listed/latest", methods=["GET"])
def get_latest_listed_posts():
    try:
        posts = (
            Posts.query.filter_by(listed=True)
            .order_by(Posts.created_at.desc())
            .limit(3)
            .all()
        )

        return jsonify(
            {
                "posts": [
                    {
                        "public_id": post.public_id,
                        "title": post.title,
                        "content": post.content,
                        "created_at": post.created_at,
                        "thumbnail": post.thumbnail.file,
                    }
                    for post in posts
                ]
            }
        )

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        return (
            jsonify({"msg": f"An error occurred with the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@posts_bp.route("/", methods=["POST"])
@jwt_required()
def add_post():
    try:
        post_schema = PostCreateSchema()
        data = post_schema.load(request.get_json())

        thumbnail = Thumbnail.query.filter_by(id=data["thumbnail_id"]).first()

        if not thumbnail:
            return jsonify({"msg": "Thumbnail not found."}), 400

        new_post = Posts(
            public_id=uuid.uuid4(),
            title=data["title"],
            content=data["content"],
            thumbnail_id=data["thumbnail_id"],
        )

        db.session.add(new_post)
        db.session.commit()

        return jsonify({"msg": "Post added successfully."})

    except ValidationError as e:
        return (
            jsonify({"msg": f"{e}"}),
            400,
        )
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


@posts_bp.route("/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    try:
        post = Posts.query.filter_by(id=post_id).first()

        if not post:
            return jsonify({"msg": "Post not found."}), 404

        db.session.delete(post)
        db.session.commit()

        return jsonify({"msg": "Post deleted successfully."})

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


@posts_bp.route("/<int:post_id>/toggle-listing", methods=["PATCH"])
@jwt_required()
def toggle_post_listing(post_id):
    try:
        post = Posts.query.filter_by(id=post_id).first()

        if not post:
            return jsonify({"msg": "Post not found."}), 404

        post.listed = not post.listed
        db.session.commit()

        status = "listed" if post.listed else "unlisted"
        return jsonify({"msg": f"Post is now {status}."})

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


@posts_bp.route("/<int:post_id>", methods=["PATCH"])
@jwt_required()
def update_post(post_id):
    try:
        post_schema = PostUpdateSchema()
        data = post_schema.load(request.get_json())

        post = Posts.query.filter_by(id=post_id).first()

        if not post:
            return jsonify({"msg": "Post not found."}), 404

        if data.get("title"):
            post.title = data["title"]

        if data.get("content"):
            post.content = data["content"]

        if data.get("thumbnail_id"):
            thumbnail = Thumbnail.query.filter_by(id=data["thumbnail_id"]).first()
            if not thumbnail:
                return jsonify({"msg": "Thumbnail not found."}), 404
            post.thumbnail_id = data["thumbnail_id"]

        db.session.commit()

        return jsonify({"msg": "Post updated successfully."})

    except ValidationError as e:
        return (
            jsonify({"msg": f"{e}"}),
            400,
        )

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


@posts_bp.route("/thumbnail", methods=["POST"])
@jwt_required()
def upload_thumbnail():
    try:
        if "file" not in request.files:
            return jsonify({"msg": "No file part"}), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({"msg": "No selected file"}), 400

        if not allowed_file(file.filename):
            return jsonify({"msg": "Invalid file type"}), 400

        max_file_size = current_app.config["MAX_CONTENT_LENGTH"]
        if file.content_length > max_file_size:
            return (
                jsonify(
                    {
                        "msg": f"File is too large. Maximum size is {max_file_size / (1024 * 1024)} MB."
                    }
                ),
                400,
            )

        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        new_thumbnail = Thumbnail(
            file=f'{current_app.config["UPLOAD_FOLDER"]}/{filename}'
        )
        db.session.add(new_thumbnail)
        db.session.commit()

        return (
            jsonify(
                {
                    "msg": "Thumbnail uploaded successfully",
                    "thumbnail_id": new_thumbnail.id,
                }
            ),
            201,
        )

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


@posts_bp.route("/thumbnail/<int:thumbnail_id>", methods=["DELETE"])
@jwt_required()
def delete_thumbnail(thumbnail_id):
    try:
        thumbnail = Thumbnail.query.filter_by(id=thumbnail_id).first()

        if not thumbnail:
            return jsonify({"msg": f"Thumbnail with id {thumbnail_id} not found."}), 404

        if thumbnail.posts:
            return (
                jsonify(
                    {
                        "msg": "At least one post exists that is linked to this thumbnail."
                    }
                ),
                409,
            )

        file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], thumbnail.file)

        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            return jsonify({"msg": "File not found on server."}), 404

        db.session.delete(thumbnail)
        db.session.commit()

        return jsonify({"msg": "Thumbnail deleted succsufully."})
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
