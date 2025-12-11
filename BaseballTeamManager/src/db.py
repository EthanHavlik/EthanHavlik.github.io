#!/usr/bin/env python3
#Ethan Havlik
#Project 2

from datetime import datetime
from objects import Player, Lineup
import os, csv, sqlite3

script_dir = os.path.dirname(__file__)
FILE = os.path.join(script_dir, "team.csv")
db_path = os.path.join(script_dir, "..", "baseball.db")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

#startup
def display_menu():
    print("MENU OPTIONS")
    print("1 - Display lineup")
    print("2 - Add player")
    print("3 - Remove player")
    print("4 - Move player")
    print("5 - Edit player position")
    print("6 - Edit player stats")
    print("7 - Days until game day")
    print("8 - Upload players to database")
    print("9 - Save and quit")
    print("=" * 64)

def welcome():
    print("=" * 64)
    print(f"{'Baseball Team Manager':^64}\n")
    display_menu()

def read_player(data):
    return Player(int(data[0]), data[1], data[2], data[3], int(data[4]), int(data[5]))

def read_lineup():
    lineup = []
    with open(FILE, "r") as file:
        reader = csv.reader(file)
        for row in reader:
            lineup.append(read_player(row))
    return lineup

#menu functions
def display_lineup(lineup):
    print("   Player" + " " * 29 + "POS       AB     H     AVG")
    print("-" * 64)
    for player in lineup:
        print(f"{player.number:<3}{player.name():35}{player.pos:8}{player.bats:>4}{player.hits:>6}{player.avg():8}")
    print("=" * 64)

def show_positions(positions):
    print("\nPOSITIONS")
    print(positions)
    print()

def stats():
    while True:
        try:
            bats = int(input("At bats: "))
            if bats < 0:
                raise ValueError
            break
        except:
            print("At bats must be a whole number.")
    
    while True:
        try:
            hits = int(input("Hits: "))
            if hits > bats:
                print("Hits cannot be greater than at bats.")
            else:
                break
        except:
            print("Hits must be a whole number.")
    
    return [bats, hits]

def add_player(lineup, positions):
    print("-" * 64)
    print("Add player\n")
    first = input("First name: ")
    last = input("Last name: ")

    show_positions(positions)
    while True:
        position = input("Position: ")
        if position not in positions:
            print("Invalid position. Try again.")
        else:
            break

    bats, hits = stats()
    
    lineup.add(first, last, position, bats, hits)
    print(first + " " + last + " was added.")

def find_player(lineup):
    display = "n"
    while True:
        if display.lower() == "y":
            print()
            display_lineup(lineup)
        selection = input("Enter player name or number: ")
        try:
            if int(selection) < 1 or int(selection) > len(lineup.players):
                raise IndexError
            return int(selection)
        except IndexError:
            display = input("Invalid number. Do you want to see the player list? (y/n): ")
        except:
            found = False
            for player in lineup:
                if player.name() == selection:
                    found = True
            if found:
                return selection
            display = input("Name not found. Do you want to see the player list? (y/n): ")

def remove_player(lineup):
    print("-" * 64)
    print("Remove player\n")
    selection = find_player(lineup)
    lineup.remove(selection)

def move_player(lineup):
    print("-" * 64)
    print("Move player\n")
    selection = find_player(lineup)

    while True:
        try:
            target = int(input(f"Enter new player number (1 - {len(lineup.players)}): "))
            if target < 1 or target > len(lineup.players):
                raise IndexError
            break
        except:
            print("Invalid number. Try again.")

    lineup.move(selection, target)

def edit_position(lineup, positions):
    print("-" * 64)
    print("Edit position\n")
    selection = find_player(lineup)
    player = lineup.find(selection)
    show_positions(positions)
    print(f"{player.name()}'s position is currently {player.pos}.")

    while True:
        position = input("New position: ")
        if position not in positions:
            print("Invalid position. Try again.")
        else:
            break

    lineup.edit(selection, position, player.bats, player.hits)
    print(f"{player.name()}'s position has been updated.")

def edit_stats(lineup):
    print("-" * 64)
    print("Edit stats\n")
    selection = find_player(lineup)
    player = lineup.find(selection)
    print(f"Editing {player.name()}'s stats.")

    bats, hits = stats()
    lineup.edit(selection, player.pos, bats, hits)
    print(f"{player.name()}'s stats have been updated.")

def game_day():
    print("-" * 64)
    today = datetime.today().date()
    print("\nCURRENT DATE:           " + str(today))

    while True:
        date_string = input("GAME DATE (YYYY-MM-DD): ")
        try:
            game_date = datetime.strptime(date_string, "%Y-%m-%d").date()
            break
        except:
            print("Invalid date format. Try again.")

    days_remaining = game_date - today
    days_remaining = days_remaining.days
    if days_remaining > 0:
        print("DAYS UNTIL GAME:       ", days_remaining)
    elif days_remaining < 0:
        print("DAYS SINCE GAME:       ", + days_remaining * -1)
    else:
        print("TODAY IS GAME DAY")

def upload(lineup):
    cursor.execute("DELETE FROM Player;")
    cursor.execute("DELETE FROM sqlite_sequence WHERE name = 'Player';")
    for player in lineup:
        cursor.execute(
            "INSERT INTO Player (batOrder, firstName, lastName, position, atBats, hits) VALUES (?, ?, ?, ?, ?, ?)",
            (player.number, player.first, player.last, player.pos, player.bats, player.hits)
        )
    conn.commit()
    print("Player data uploaded to database.")

def write_lineup(lineup):
    rows = []
    for player in lineup:
        rows.append([player.number, player.first, player.last, player.pos, player.bats, player.hits])
    with open(FILE, "w", newline = "") as file:
        writer = csv.writer(file)
        writer.writerows(rows)
    print("Saved file: " + FILE)

def main():
    welcome()
    positions = ("C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "P")
    try:
        lineup = Lineup(read_lineup())
    except FileNotFoundError:
        print("Team data file could not be found.\nA new file will be created.")
        lineup = Lineup([])
    while True:
        menu = input("\nMenu option: ")
        if menu == "1":
            display_lineup(lineup)
        elif menu == "2":
            add_player(lineup, positions)
        elif menu == "3":
            remove_player(lineup)
        elif menu == "4":
            move_player(lineup)
        elif menu == "5":
            edit_position(lineup, positions)
        elif menu == "6":
            edit_stats(lineup)
        elif menu == "7":
            game_day()
        elif menu == "8":
            upload(lineup)
        elif menu == "9":
            write_lineup(lineup)
            break
        else:
            print("Not a menu option. Try again.\n")
            display_menu()

if __name__ == "__main__":
    main()

conn.close()