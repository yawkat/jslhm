load("old.js");
load("new.js");

REPS = 10000;
LENGTH = 100;

indicies_a_x = Array(LENGTH);
indicies_a_z = Array(LENGTH);
indicies_b_x = Array(LENGTH);
indicies_b_z = Array(LENGTH);

for (var i = 0; i < LENGTH; i++) {
    indicies_a_x[i] = Math.round((Math.random() - 0.5) * LENGTH * 5);
    indicies_a_z[i] = Math.round((Math.random() - 0.5) * LENGTH * 5);
    indicies_b_x[i] = Math.round((Math.random() - 0.5) * LENGTH * 5);
    indicies_b_z[i] = Math.round((Math.random() - 0.5) * LENGTH * 5);
}

function benchmark_put(m) {
    for (var r = 0; r < REPS; r++) {
        for (var i = 0; i < LENGTH; i++) {
            m[r].put(indicies_a_x[i], indicies_a_z[i], "test");
        }
    }
}
function benchmark_get_hit(m) {
    for (var r = 0; r < REPS; r++) {
        for (var i = 0; i < LENGTH; i++) {
            m[r].get(indicies_a_x[i], indicies_a_z[i]);
        }
    }
}
function benchmark_get_miss(m) {
    for (var r = 0; r < REPS; r++) {
        for (var i = 0; i < LENGTH; i++) {
            m[r].get(indicies_b_x[i], indicies_b_z[i]);
        }
    }
}
function benchmark_remove_hit(m) {
    for (var r = 0; r < REPS; r++) {
        for (var i = 0; i < LENGTH; i++) {
            m[r].remove(indicies_a_x[i], indicies_a_z[i]);
        }
    }
}
function benchmark_remove_miss(m) {
    for (var r = 0; r < REPS; r++) {
        for (var i = 0; i < LENGTH; i++) {
            m[r].remove(indicies_b_x[i], indicies_b_z[i]);
        }
    }
}

function measure(m, func) {
    samp = Array(m);
    for (var r = 0; r < REPS; r++) {
        samp[r] = m();
    }
    start = new Date().getTime();
    func(samp);
    end = new Date().getTime();
    return end - start + "ms";
}

function benchmark(m, label) {
    print("Reps: " + REPS);
    print("Count: " + LENGTH);

    print("");
    print("Testing " + label + "...");
    print("Put:      " + measure(m, benchmark_put))
    print("Get Hit:  " + measure(m, benchmark_put))
    print("Get Miss: " + measure(m, benchmark_put))
    print("Rem Hit:  " + measure(m, benchmark_put))
    print("Rem Miss: " + measure(m, benchmark_put))
    print("--------------------------------------");
    print("");
}

/*
benchmark(create_old(), "Old");
benchmark(create_new(), "New");
benchmark(create_old(), "Old");
benchmark(create_new(), "New");
*/