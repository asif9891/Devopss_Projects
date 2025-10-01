from flask import Blueprint
from controller.home import home, logout  # import both functions

# Create a Blueprint for user routes
user_bp = Blueprint('user_bp', __name__)

# Define routes
user_bp.add_url_rule("/", "home", home)             # Home route
user_bp.add_url_rule("/logout", "logout", logout)  # Logout route
