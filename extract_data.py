import requests

# Define URLs
target_url = "https://erp.lbrce.ac.in/Discipline/StudentHistory.aspx"

# Use the copied cookie from browser
cookies = {
    "ASP.NET_SessionId": "yx01pvad0u2k5j3sqpziqbcb"
}

# Fetch the target page using stored cookies
response = requests.get(target_url, cookies=cookies)

if response.status_code == 200:
    print("Page fetched successfully!")
    print(response.text)  # Prints the HTML content
else:
    print(f"Failed to fetch page. Status code: {response.status_code}")
