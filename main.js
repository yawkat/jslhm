load("new.js");

print("\nEmpty:")

print(map.get(0, 0))
print("[" + map.values() + "]")

print("\nFilled:")

for (var x = 0; x < 100; x++) {
    for (var z = 0; z < 100; z++) {
        map.put(x, z, x + ":" + z);
    }
}
print(map.get(0, 0))
print("[" + map.values() + "]")

print("\nCleared:")

map.remove(0, 0)
print(map.get(0, 0))
print("[" + map.values() + "]")