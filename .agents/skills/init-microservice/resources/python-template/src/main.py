from fastapi import FastAPI

app = FastAPI(title="{{service_name}}")

@app.get("/")
def read_root():
    return {"message": "Welcome to {{service_name}}"}
