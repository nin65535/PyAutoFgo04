import eel
from modules.app import App

def start_gui():
    App.init()
    eel.init('html')
    eel.start('index.html', size=(400, 1800), position=(0,0))

if __name__ == '__main__': 
    start_gui()
