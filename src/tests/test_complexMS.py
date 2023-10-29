import unittest
import psycopg2
import requests

class TestApplyRole(unittest.TestCase):
    def setUp(self):
        # # need install psycopg2-binary
        
        # # Connect to the database
        # conn = psycopg2.connect(
        #     host="<hostname>",
        #     port="<port>",
        #     user="<username>",
        #     password="<password>",
        #     database="<database>"
        # )

        # # Create a cursor object
        # cur = conn.cursor()

        # # Execute the SQL command to create the database
        # cur.execute("CREATE DATABASE <database>")

        # # Close the cursor and connection
        # cur.close()
        # conn.close()
        pass
    
    def tearDown(self):
        pass
    
    def test_apply_role(self):
        staffId = 8857
        response = requests.get(f'http://localhost:5001/apply_role/8857')
        self.assertEqual(response.status_code, 200)
        self.assertIn('result', response.json())
        self.assertIsInstance(response.json()['result'], list)
        self.assertGreater(len(response.json()['result']), 0)
        
if __name__ == '__main__':
    unittest.main()