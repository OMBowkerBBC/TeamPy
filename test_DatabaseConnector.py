import unittest, sqlite3
from DatbaseConnector import DatabaseConnector

class TestDatabaseConnector(unittest.TestCase):

    def test_reset(self):
        dc = DatabaseConnector()
        dc.populate()

        # Test database has values in
        conn = sqlite3.connect("db.db")
        curs = conn.cursor()

        curs.execute("SELECT * FROM QUIZ")
        data = curs.fetchall()
        self.assertGreater(len(data), 0)

        curs.execute("SELECT * FROM SAVEDSCORE")
        data = curs.fetchall()
        self.assertGreater(len(data), 0)

        # Test database is emptied, create new DatabaseConnector due to populate() closing previous
        dc = DatabaseConnector()
        dc.reset(close=False)

        curs.execute("SELECT * FROM QUIZ")
        data = curs.fetchall()
        self.assertEqual(len(data), 0)

        curs.execute("SELECT * FROM SAVEDSCORE")
        data = curs.fetchall()
        self.assertEqual(len(data), 0)

        # Test sqlite_sequence is reset
        data = curs.execute("SELECT SEQ FROM SQLITE_SEQUENCE")
        data = data.fetchall()

        self.assertEqual(data[0][0], 0)
        self.assertEqual(data[1][0], 0)

        curs.close()
        conn.close()
        dc.close()

    def test_populate_database(self):
        dc = DatabaseConnector()
        dc.reset(close=False)
        
        # Test database starts empty
        conn = sqlite3.connect("db.db")
        curs = conn.cursor()

        curs.execute("SELECT * FROM QUIZ")
        data = curs.fetchall()
        self.assertEqual(len(data), 0)

        curs.execute("SELECT * FROM SAVEDSCORE")
        data = curs.fetchall()
        self.assertEqual(len(data), 0)

        dc.populate()

        # Check data has been added.
        curs.execute("SELECT * FROM QUIZ")
        data = curs.fetchall()
        self.assertGreater(len(data), 0)

        curs.execute("SELECT * FROM SAVEDSCORE")
        data = curs.fetchall()
        self.assertGreater(len(data), 0)

        curs.close()
        conn.close()