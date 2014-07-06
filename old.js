function create_old() {
    map = {
        data: {},
        get: function(x, z) {
            return this.data[x + ":" + z];
        },
        put: function(x, z, chunk) {
            this.data[x + ":" + z] = chunk;
        },
        remove: function(x, z) {
            delete this.data[x + ":" + z];
        },
        values: function() {
            var data = this.data;
            var keys = Object.keys(data);
            return keys.map(function (k) { return data[k]; });
        }
    }
    return map;
}