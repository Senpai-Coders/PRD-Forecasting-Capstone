# PRD-Forecasting-Server

# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate

# Install Django
pip install -r requirements.txt

# Set up a new project with a single application
django-admin startapp prdrest
cd prdrest

# Start PRD Django Server
python manage.py runserver

# For requesting you can use 
POST http://127.0.0.1:5000/xgboost-predict
# Json Request Format
```json
{
    "days":365
}
```