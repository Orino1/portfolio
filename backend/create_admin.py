from werkzeug.security import generate_password_hash

from src import create_app
from src.models import Admin, db

app = create_app()

with app.app_context():

    username = "root"
    password = "root"
    hashed_password = generate_password_hash(password)

    admin = Admin(username=username, password=hashed_password)

    db.session.add(admin)
    db.session.commit()
