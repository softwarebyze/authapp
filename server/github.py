import os
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()
github_token = os.getenv("GITHUB_TOKEN")

def create_github_issue(issue_title, issue_body, issue_labels):
    url = "https://api.github.com/repos/softwarebyze/authapp/issues"
    headers = {"Authorization": f"token {github_token}"}

    issue_data = {
        "title": issue_title,
        "body": issue_body,
        "labels": issue_labels
    }

    response = requests.post(url, json=issue_data, headers=headers)

    if response.status_code == 201:
        return True
    else:
        return False
