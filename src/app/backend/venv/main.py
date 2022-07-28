from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.post("/typography")
async def submit(request: Request, taskname: str = Form(...), tasknumber: int = Form(...)):
    return f'Super resolution completed! task {tasknumber} of {taskname} done'

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("../../../index.html", {"request": request})