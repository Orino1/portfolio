from flask import Blueprint, jsonify, request
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                get_jwt_identity, jwt_required,
                                set_access_cookies, set_refresh_cookies)
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import check_password_hash, generate_password_hash

from src.config import logger
from src.models import Admin, db

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", strict_slashes=False, methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data or "username" not in data or "password" not in data:
            return jsonify({"msg": "Invalid input"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"msg": "Username and password are required"}), 400

        admin = Admin.query.filter_by(username=username).first()

        if not admin:
            logger.warning(
                "unsuccessful loggin attempt by username %s and password %s",
                username,
                password,
            )

            return jsonify({"msg": "Admin not found"}), 400

        if not check_password_hash(admin.password, password):
            return jsonify({"msg": "Password incorrect"}), 400

        access_token = create_access_token(identity=admin.id)
        refresh_token = create_refresh_token(identity=admin.id)

        response = jsonify({"msg": "Login successful."})

        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)

        logger.info("Admin %s logged in successfully.", admin.username)
        return response

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        return (
            jsonify({"msg": "An error occurred in the Database. Please try again."}),
            500,
        )

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred. Please try again."}), 500


@auth_bp.route("/refresh", strict_slashes=False, methods=["GET"])
@jwt_required(refresh=True)
def refresh():
    try:
        current_admin = get_jwt_identity()

        new_access_token = create_access_token(identity=current_admin)

        response = jsonify({"msg": "Access token refreshed succssufully."})

        set_access_cookies(response, new_access_token)

        return response

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred"}), 500


@auth_bp.route("/password", strict_slashes=False, methods=["PATCH"])
@jwt_required()
def change_password():
    try:
        data = request.get_json()

        if not data or "password" not in data:
            return jsonify({"msg": "Invalid input"}), 400

        new_password = data.get("password")

        admin_id = get_jwt_identity()
        admin = Admin.query.filter_by(id=admin_id).first()

        admin.password = generate_password_hash(new_password)

        db.session.commit()

        return jsonify({"msg": "password changed successfully"})

    except SQLAlchemyError as e:
        logger.error("Database error occurred: %s", e)
        db.session.rollback()
        return jsonify({"msg": "An error occurred while updating the password"}), 500

    except Exception as e:
        logger.error("Unexpected error occurred: %s", e)
        return jsonify({"msg": "An unexpected error occurred"}), 500


@auth_bp.route("/status", strict_slashes=False, methods=["GET"])
@jwt_required()
def auth_status():
    return jsonify({"success": True})
