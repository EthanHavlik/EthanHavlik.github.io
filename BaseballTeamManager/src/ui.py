#!/usr/bin/env python3
#Ethan Havlik
#Project 2

import os, sqlite3
import tkinter as tk
from tkinter import ttk, messagebox

script_dir = os.path.dirname(__file__)
db_path = os.path.join(script_dir, "..", "baseball.db")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

root = tk.Tk()
root.title("Player")
root.geometry("400x400")
frame = ttk.Frame(root)
frame.pack(expand=True)

playerID = tk.IntVar()
resetID = playerID.get()
firstName = tk.StringVar()
lastName = tk.StringVar()
position = tk.StringVar()
atBats = tk.IntVar()
hits = tk.IntVar()
average = tk.StringVar()

def update_average(*args):
    try:
        ab = atBats.get()
        h = hits.get()
        if ab > 0:
            avg = round(h / ab, 3)
            average.set(f"{avg:.3f}")
        else:
            average.set("")
    except tk.TclError:
        average.set("")

atBats.trace_add("write", update_average)
hits.trace_add("write", update_average)

def get_player():
    pid = playerID.get()
    cursor.execute("SELECT * FROM Player WHERE playerID = ?", (pid,))
    row = cursor.fetchone()
    if row is None:
        messagebox.showerror("Invalid ID", "No players in the lineup have that ID.")
        playerID.set(0)
        firstName.set("")
        lastName.set("")
        position.set("")
        atBats.set(0)
        hits.set(0)
        return
    
    fn, ln, pos, ab, h = row[2:]
    global resetID
    resetID = playerID.get()
    firstName.set(fn)
    lastName.set(ln)
    position.set(pos)
    atBats.set(ab)
    hits.set(h)
    average.set(str(round(hits.get() / atBats.get(), 3)))

def save():
    cursor.execute(
        "UPDATE Player SET firstName = ?, lastName = ?, position = ?, atBats = ?, hits = ? WHERE playerID = ?",
        (firstName.get(), lastName.get(), position.get(), atBats.get(), hits.get(), playerID.get())
        )
    conn.commit()
    playerID.set(0)
    firstName.set("")
    lastName.set("")
    position.set("")
    atBats.set(0)
    hits.set(0)

def cancel():
    playerID.set(resetID)
    get_player()

ttk.Label(frame, text="Player ID:").grid(column=0, row=0, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=playerID).grid(column=1, row=0, padx=10, pady=5)
ttk.Button(frame, text="Get player", command=get_player).grid(column=2, row=0)

ttk.Label(frame, text="First name:").grid(column=0, row=1, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=firstName).grid(column=1, row=1, padx=10, pady=5)

ttk.Label(frame, text="Last name:").grid(column=0, row=2, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=lastName).grid(column=1, row=2, padx=10, pady=5)

ttk.Label(frame, text="Position:").grid(column=0, row=3, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=position).grid(column=1, row=3, padx=10, pady=5)

ttk.Label(frame, text="At bats:").grid(column=0, row=4, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=atBats).grid(column=1, row=4, padx=10, pady=5)

ttk.Label(frame, text="Hits:").grid(column=0, row=5, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=hits).grid(column=1, row=5, padx=10, pady=5)

ttk.Label(frame, text="Batting avg:").grid(column=0, row=6, sticky=tk.E)
ttk.Entry(frame, width=30, textvariable=average, state="readonly").grid(column=1, row=6, padx=10, pady=5)

ttk.Button(frame, text="Save changes", command=save).grid(column=1, row=7, sticky=tk.E, padx=10)
ttk.Button(frame, text="Cancel", command=cancel).grid(column=2, row=7)

root.mainloop()
conn.close()