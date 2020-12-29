import weakref
import time
import eel
from .config import Config


class PlayingStopException(Exception):
    pass


class Player:
    def __init__(self, app):
        self._app = weakref.ref(app)
        self.click = app.window.click
        self.sleep = eel.sleep
        self.sleep_step = Config.read('player.sleep_step')
        self.stop_flg = False

    @property
    def app(self):
        return self._app()

    def wait_for(self, sample: str = 'attack.0'):
        while not self.app.window.check(sample):
            if(self.stop_flg):
                raise PlayingStopException()

            self.sleep(self.sleep_step)
        return

    def skill(self, skill_no: int, target: str = '', target_wait: float = 0.5):
        self.wait_for()
        self.click('skill.{:d}'.format(skill_no))

        if len(target):
            self.sleep(target_wait)
            self.click(target)
        self.sleep(1)
        self.wait_for()
        return

    def stop(self):
        self.stop_flg = True

    def play(self, stage_no: int = 0, cmd_no: int = 0):
        self.app.log('{:02d}-{:02d} :play start'.format(stage_no, cmd_no))
        self.stop_flg = False

        '''
        self.app.log('{:02d}-{:02d} :play start'.format(stage_no, cmd_no))

        self.stop_flg = False
        lines = self.app.stage.stages[stage_no]['commands'][cmd_no]

        try:
            for line_no, cmd in enumerate(lines):
                label = '{:02d}-{:02d}-{:02d}'.format(
                    stage_no, cmd_no, line_no)
                self.app.log(label + ':' + cmd)
                self.app.set_line(line_no)
                self.step(cmd)
                if(self.stop_flg):
                    raise PlayingStopException()

        except PlayingStopException:
            self.app.log('{:02d}-{:02d} :play stop'.format(stage_no, cmd_no))

        self.app.set_line(-1)
        self.app.log('{:02d}-{:02d} :play end'.format(stage_no, cmd_no))
        '''

        pass

    def step(self, stage_no: int = 0, cmd_no: int = 0, line_no: int = 0):
        cmd = self.app.stage.stages[stage_no]['commands'][cmd_no][line_no]
        eval('self.' + cmd)

    def master_skill(self, i):
        self.wait_for()
        self.click('master_skill.3')
        self.sleep(0.2)
        self.click('master_skill', i)
        self.sleep(0.2)

    def swap(self, i, j):
        self.master_skill(2)
        self.click('swap', i)
        self.click('swap', j)
        self.click('swap.6')
        self.sleep(5)

    def attack(self, *args: tuple):
        self.wait_for()
        self.click('attack.0')
        self.sleep(2)
        for arg in args:
            self.select_card(arg)

    def select_card(self, arg: str):
        if arg[0] == 'N':
            self.click('noble_phantasm', arg[1])

        if arg[0] == 'C':
            self.click('card', arg[1])
