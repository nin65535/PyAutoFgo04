import eel
from .stage import Stage
from .window import Window
from .player import Player


class App:
    _instance = None

    @classmethod
    def init(cls):
        if cls._instance is None:
            cls._instance = App()

    def __init__(self):
        self.stage = Stage()
        self.window = Window()
        self.player = Player(self)

    @staticmethod
    @eel.expose
    def get_stages() -> list:
        App._instance.log('get_stage called')
        return App._instance.stage.stages

    @staticmethod
    @eel.expose
    def update_stages() -> None:
        return App._instance.stage.read_all()

    @staticmethod
    @eel.expose
    def play(stage: int, command: int) -> None:
        App._instance.window.set_window_active()
        App._instance.player.play(stage, command)

    @staticmethod
    @eel.expose
    def stop() -> None:
        App._instance.player.stop()

    def set_line(self, line: int) -> None:
        if hasattr(eel, 'set_line'):
            # pylint: disable=no-member        
            eel.set_line(line)
        else:
            print(line)

    def log(self, msg: str) -> None:
        if hasattr(eel, 'log'):
            # pylint: disable=no-member        
            eel.log(msg)
        else:
            print(msg)

