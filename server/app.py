from flask import Flask
import psycopg2

app = Flask(__name__)

DB_NAME = "authappdb"
DB_USER = "zack"


# Function to create a database connection and cursor
def get_database_connection():
    return psycopg2.connect(dbname=DB_NAME, user=DB_USER)


@app.route("/users")
def add_user():
    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute(
        "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name varchar, email varchar, password varchar);"
    )
    cur.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        ("Adam", "adam@gmail.com", "mypAssw0rd"),
    )
    conn.commit()

    cur.close()
    conn.close()

    return "<p>User information added to the database successfully!</p>"


@app.route("/getusers")
def get_users():
    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users;")
    users = cur.fetchall()

    cur.close()
    conn.close()

    return "<p>Users: {}</p>".format(users)
