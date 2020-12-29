import eel
from modules.app import App

def start_gui():
    App.init()
    eel.init('html')
    eel.start('index.html')

if __name__ == '__main__': 
    start_gui()
