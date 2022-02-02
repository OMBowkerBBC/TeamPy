from flask import Flask, render_template, request
import sqlite3, json
from DatbaseConnector import DatabaseConnector
from Question import Question

app = Flask(__name__)

VALID_CATEGORIES = ['History', 'Geography', 'Politics', 'Conservation', 'Celebrities', 'Law', 'Sport']
VALID_DIFFICULTIES = ['Beginner', 'Expert']

@app.route("/", methods=["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

# @app.route("/quizStarting", methods=["GET"])
# def quiz_start():
#     return render_template("quizStart.html")

@app.route("/quizStartV2", methods=["GET"])
def quiz_start():
    return render_template("quizStartNEW.html")

@app.route("/category/<category>", methods=["GET"])
def category(category):
    if not category in VALID_CATEGORIES:
        return "Invalid Category"
    
    difficulty = request.args.get("dif")
    if not difficulty or not difficulty in VALID_DIFFICULTIES:
        difficulty = "Beginner"

    with open(f'static/quiz folder/{category}{difficulty}.json', 'r', encoding='utf-8') as file:
        data = json.loads(file.read())
        questions = [Question(**x) for x in data]

    return render_template("quizQuestions.html", questions=questions, category=category, difficulty=difficulty)

@app.route("/startquiz", methods=["GET"])
def start_quiz():
    with open('testQuiz.json', 'r') as file:
        data = json.loads(file.read())
        conn = sqlite3.connect("db.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO QUIZ (CATEGORY, QUESTION_TYPE, DIFFICULTY) VALUES (?, ?, ?)", (data['category'], data['type'], data['difficulty']))
        conn.commit()
        cursor.close()
        conn.close()

    return "Starting Quiz"

@app.route("/quizEnd", methods=["GET"])
def quiz_end():
    with open("testScoreboard.json", 'r') as file:
        scoreboard = json.loads(file.read())
    temporary_data = { "name": "Oli", "score": 4 }
    return render_template("quizEnd.html", player_info = temporary_data, scoreboard = scoreboard)

@app.route("/test/populate", methods=["GET"])
def populate_database():
    dc = DatabaseConnector()
    dc.populate()
    return "Database Populated"

@app.route("/test/reset", methods=["GET"])
def reset_database():
    dc = DatabaseConnector()
    dc.reset(close=True)
    return "Database Reset"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=6789)