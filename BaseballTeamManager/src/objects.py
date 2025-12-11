#!/usr/bin/env python3

class Player:
    def __init__(self, number, first, last, pos, bats, hits):
        self.number = number
        self.first = first
        self.last = last
        self.pos = pos
        self.bats = bats
        self.hits = hits
    
    def name(self):
        return self.first + " " + self.last
    
    def avg(self):
        return round(self.hits / self.bats, 3)

class Lineup:
    def __init__(self, players):
        self.players = players
    
    def __iter__(self):
        return iter(self.players)
    
    def find(self, selector):
        if isinstance(selector, int):
            return self.players[selector - 1]
        else:
            return next(p for p in self.players if p.name() == selector)

    def add(self, first, last, pos, bats, hits):
        self.players.append(Player(len(self.players) + 1, first, last, pos, bats, hits))
    
    def remove(self, selector):
        player = self.find(selector)
        self.players.remove(player)
        print(player.name(), "was removed.")
        for i in range(len(self.players)):
            self.players[i].number = i + 1
    
    def move(self, selector, target):
        moving = self.find(selector)
        self.players.remove(moving)
        self.players.insert(target - 1, moving)
        print(f"{moving.name()} is now number {target}.")
        for i in range(len(self.players)):
            self.players[i].number = i + 1
    
    def edit(self, selector, pos, bats, hits):
        player = self.find(selector)
        self.players.remove(player)
        player.pos = pos
        player.bats = bats
        player.hits = hits
        self.players.insert(player.number - 1, player)