from flask import jsonify, redirect, render_template, request
# from config.mysqlconnector import db
import jwt

def home():
    token = request.args.get('token')
    print(token)
    if not token:
        return "Missing token", 401
    try:
        
        decoded = jwt.decode(token, 'YOUR_SHARED_SECRET', algorithms=["HS256"])
        return render_template('home_view.html')
    except jwt.ExpiredSignatureError:
        return "Token expired", 401
    except jwt.InvalidTokenError:
        return "Invalid token", 401

def logout():
    # If token is stored in a cookie, clear it
    response = jsonify({"message": "Logged out successfully"})
    response.set_cookie('token', '', expires=0)
    
    # Or redirect user to login page
    return redirect("http://localhost:3000/login") 