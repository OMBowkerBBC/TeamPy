
import sqlite3, json

class DatabaseConnector:

    def __init__(self) -> None:
        self.connection = sqlite3.connect("db.db")
        self.cursor = self.connection.cursor()
    
    def populate(self):
        self.reset(close=False)
        with open("./test_files/defaultPopulateData.json", 'r') as file:
            data = json.loads(file.read())
        
        quiz_data = data['quiz']
        score_data = data['scores']

        for quiz in quiz_data:
            self.cursor.execute("INSERT INTO QUIZ (CATEGORY, QUESTION_TYPE, DIFFICULTY) VALUES (?, ?, ?)", (quiz['category'], quiz['type'], quiz['difficulty']))
        
        for score in score_data:
            self.cursor.execute("INSERT INTO SAVEDSCORE (QUIZ_ID, NAME, SCORE) VALUES (?, ?, ?)", (score['quiz_id'], score['name'], score['score']))

        self.connection.commit()
        self.close()
    
    def reset(self, close):
        # Reset sqlite counter.
        self.cursor.execute("UPDATE SQLITE_SEQUENCE SET SEQ = 0")
        
        self.cursor.execute("DELETE FROM SAVEDSCORE")
        self.cursor.execute("DELETE FROM QUIZ")
        self.connection.commit()
        
        if close:
            self.close()

    def close(self):
        self.cursor.close()
        self.connection.close()