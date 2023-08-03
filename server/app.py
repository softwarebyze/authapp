from flask import Flask, request
import psycopg2

app = Flask(__name__)

DB_NAME = "authappdb"
DB_USER = "zack"


# Function to create a database connection and cursor
def get_database_connection():
    return psycopg2.connect(dbname=DB_NAME, user=DB_USER)


@app.get("/users")
def get_users():
    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users;")
    users = cur.fetchall()

    cur.close()
    conn.close()

    return "<p>Users: {}</p>".format(users)


@app.post("/users")
def add_user():
    # Get data from request body
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute(
        "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name varchar, email varchar, password varchar);"
    )
    # Add user to table
    cur.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, password),
    )
    conn.commit()

    cur.close()
    conn.close()

    return "<p>User information added to the database successfully!</p>"
