function create_new() {
    m = {
        
    entries: undefined,
    mask: undefined,
    maximumDistanceFromIdeal: undefined,
    size: 0,
    resizeThreshold: undefined,

    hash: function(x, z) {
        x = x|0;
        z = z|0;

        x = (x | (x << 8)) & 0x00FF00FF;
        x = (x | (x << 4)) & 0x0F0F0F0F;
        x = (x | (x << 2)) & 0x33333333;
        x = (x | (x << 1)) & 0x55555555;
        z = (z | (z << 8)) & 0x00FF00FF;
        z = (z | (z << 4)) & 0x0F0F0F0F;
        z = (z | (z << 2)) & 0x33333333;
        z = (z | (z << 1)) & 0x55555555;
        return (x | (z << 1))|0;
    },
    make_entry: function(x, z, value) {
        x = x|0;
        z = z|0;

        return {
            x: x,
            z: z,
            value: value,
            distance: 0,
        };
    },

    put: function(x, z, value) {
        x = x|0;
        z = z|0;

        var replaced = this.insert(this.make_entry(x, z, value));
        if (replaced) {
            return replaced;
        }
        this.size++;
        if (this.size >= this.resizeThreshold) {
            this.resize();
        }
        return null;
    },
    remove: function(x, z) {
        x = x|0;
        z = z|0;

        var removed = this.remove0(x, z);
        if (removed) {
            this.size--;
            return removed.value;
        }
        return null;
    },
    get: function(x, z) {
        x = x|0;
        z = z|0;

        var rec = this.lookup(x, z);
        if (rec) {
            return rec.value;
        }
        return null;
    },
    values: function() {
        return this.entries
                   .filter(function(entry) { return entry; })
                   .map(function(entry) { return entry.value });
    },

    nextPowerOfTwo: function(num) {
        num = num|0;

        if (num == 0) return 1;
        num--;
        num |= num >> 1;
        num |= num >> 2;
        num |= num >> 4;
        num |= num >> 8;
        return ((num | num >> 16) + 1)|0;
    },
    allocate: function(capacity) {
        capacity = capacity|0;

        capacity = this.nextPowerOfTwo(capacity);
        this.allocate0(capacity);
    },
    allocate0: function(capacity) {
        capacity = capacity|0;

        this.entries = Array(capacity);
        this.mask = capacity - 1;
        this.resizeThreshold = capacity >> 1;
        this.maximumDistanceFromIdeal = 0;
    },
    resize: function() {
        var oldEntries = this.entries;
        this.allocate0(this.entries.length << 1);
        for (var i = 0; i < oldEntries.length; i++) {
            entry = oldEntries[i];
            if (entry) {
                this.insert(entry);
            }
        }
    },
    insert: function(e) {
        var index = this.hash(e.x, e.z) & this.mask;

        while (true) {
            this.maximumDistanceFromIdeal = Math.max(e.distance, this.maximumDistanceFromIdeal);

            var entry = this.entries[index];
            if (!entry) {
                this.entries[index] = e;
                return;
            } else if (entry.x === e.x && entry.z === e.z) {
                this.entries[index] = e;
                return entry;
            } else if (e.distance > entry.distance) {
                this.entries[index] = e;
                e = entry;
            }

            e.distance++;
            index = (index + 1) & this.mask;
        }
    },
    lookup: function(x, z) {
        x = x|0;
        z = z|0;

        var index = this.hash(x, z) & this.mask;
        var distance = 0;

        while (true) {
            var entry = this.entries[index];
            if (!entry) {
                return null;
            } else if (distance > this.maximumDistanceFromIdeal) {
                return null;
            } else if (entry.x === x && entry.z === z) {
                return entry;
            }

            distance++;
            index = (index + 1) & this.mask;
        }
    },
    remove0: function(x, z) {
        x = x|0;
        z = z|0;

        var index = this.hash(x, z) & this.mask;

        while (true) {
            var entry = this.entries[index];
            if (!entry) {
                return null;
            } else if (entry.x === x && entry.z === z) {
                var index_previous = index;
                var index_swap = (index + 1) & this.mask;
                while (true) {
                    if (!this.entries[index_swap] || this.entries[index_swap].distance === 0) {
                        delete this.entries[index_previous];
                        return entry;
                    }

                    this.entries[index_previous] = this.entries[index_swap];
                    this.entries[index_previous].distance--;
                    index_previous = index_swap;
                    index_swap = (index_swap + 1) & this.mask;
                }
            }

            index = (index + 1) & this.mask;
        }
    }

    }
    m.allocate(200);
    return m;
}