import unittest
import requests

class TestApplyRole(unittest.TestCase):
    def test_apply_role(self):
        staffId = 8857
        response = requests.get(f'http://localhost:5001/apply_role/8857')
        self.assertEqual(response.status_code, 200)
        self.assertIn('result', response.json())
        self.assertIsInstance(response.json()['result'], list)
        self.assertGreater(len(response.json()['result']), 0)
        
if __name__ == '__main__':
    unittest.main()