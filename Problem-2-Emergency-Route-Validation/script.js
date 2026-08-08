// =====================================================
// EMERGENCY ROUTE VALIDATION
// BFS SHORTEST PATH
// =====================================================


// ===========================
// HTML ELEMENTS
// ===========================

const nInput = document.getElementById("n");
const mInput = document.getElementById("m");
const dInput = document.getElementById("d");

const edgesInput =
    document.getElementById("edges");

const calculateBtn =
    document.getElementById("calculateBtn");

const sampleBtn =
    document.getElementById("sampleBtn");

const resetBtn =
    document.getElementById("resetBtn");

const totalCities =
    document.getElementById("totalCities");

const reachableCities =
    document.getElementById("reachableCities");

const displayD =
    document.getElementById("displayD");

const resultTable =
    document.getElementById("resultTable");

const resultMessage =
    document.getElementById("resultMessage");

const graphContainer =
    document.getElementById("graph");


// ===========================
// LOAD SAMPLE
// ===========================

sampleBtn.addEventListener("click", () => {

    nInput.value = 7;

    mInput.value = 8;

    dInput.value = 2;

    edgesInput.value =
`1 2
1 3
2 4
2 5
3 6
6 7
5 7
4 6`;

    calculateRoutes();

});


// ===========================
// RESET
// ===========================

resetBtn.addEventListener("click", () => {

    nInput.value = "";

    mInput.value = "";

    dInput.value = "";

    edgesInput.value = "";

    totalCities.textContent = "0";

    reachableCities.textContent = "0";

    displayD.textContent = "0";

    resultTable.innerHTML = "";

    resultMessage.className =
        "result-message";

    resultMessage.innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        Enter the highway details and validate
        the routes.
    `;

    graphContainer.innerHTML = `
        <div class="empty-graph">

            <div class="empty-icon">
                <i class="fa-solid fa-route"></i>
            </div>

            <h3>
                Highway Network
            </h3>

            <p>
                Load a sample or enter your own
                network to visualize the routes.
            </p>

        </div>
    `;

});


// ===========================
// CALCULATE BUTTON
// ===========================

calculateBtn.addEventListener(
    "click",
    calculateRoutes
);


// =====================================================
// MAIN FUNCTION
// =====================================================

function calculateRoutes() {

    // -------------------------
    // READ INPUT
    // -------------------------

    const N =
        Number(nInput.value);

    const M =
        Number(mInput.value);

    const D =
        Number(dInput.value);


    if (
        !Number.isInteger(N) ||
        N < 1
    ) {

        alert(
            "Please enter a valid number of cities."
        );

        return;
    }


    if (
        !Number.isInteger(M) ||
        M < 0
    ) {

        alert(
            "Please enter a valid number of roads."
        );

        return;
    }


    if (
        !Number.isInteger(D) ||
        D < 0
    ) {

        alert(
            "Please enter a valid value of D."
        );

        return;
    }


    // -------------------------
    // READ EDGES
    // -------------------------

    const edgeText =
        edgesInput.value.trim();


    let edgeLines = [];


    if (edgeText) {

        edgeLines =
            edgeText
                .split(/\r?\n/)
                .filter(
                    line => line.trim() !== ""
                );

    }


    if (edgeLines.length !== M) {

        alert(
            `Expected ${M} roads, but received ${edgeLines.length}.`
        );

        return;
    }


    // -------------------------
    // CREATE GRAPH
    // -------------------------

    const graph =
        Array.from(
            { length: N + 1 },
            () => []
        );


    const visualizationEdges = [];


    for (const line of edgeLines) {

        const parts =
            line.trim().split(/\s+/);


        if (parts.length !== 2) {

            alert(
                "Invalid road format. Use: u v"
            );

            return;
        }


        const u =
            Number(parts[0]);

        const v =
            Number(parts[1]);


        if (
            !Number.isInteger(u) ||
            !Number.isInteger(v) ||
            u < 1 ||
            u > N ||
            v < 1 ||
            v > N ||
            u === v
        ) {

            alert(
                `Invalid road: ${line}`
            );

            return;
        }


        graph[u].push(v);

        graph[v].push(u);


        visualizationEdges.push({

            from: u,

            to: v

        });

    }


    // -------------------------
    // BFS DISTANCE ARRAY
    // -------------------------

    const distance =
        new Array(N + 1)
            .fill(-1);


    // -------------------------
    // BFS QUEUE
    // -------------------------

    const queue = [];

    let front = 0;


    distance[1] = 0;

    queue.push(1);


    // -------------------------
    // BFS
    // -------------------------

    while (
        front < queue.length
    ) {

        const current =
            queue[front++];


        for (
            const neighbor
            of graph[current]
        ) {

            if (
                distance[neighbor] === -1
            ) {

                distance[neighbor] =
                    distance[current] + 1;

                queue.push(neighbor);

            }

        }

    }


    // -------------------------
    // COUNT REACHABLE
    // -------------------------

    let count = 0;


    for (
        let i = 1;
        i <= N;
        i++
    ) {

        if (
            distance[i] !== -1 &&
            distance[i] <= D
        ) {

            count++;

        }

    }


    // -------------------------
    // UPDATE STATS
    // -------------------------

    totalCities.textContent =
        N;

    reachableCities.textContent =
        count;

    displayD.textContent =
        D;


    // -------------------------
    // MESSAGE
    // -------------------------

    resultMessage.className =
        "result-message success";


    resultMessage.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Analysis complete.
        ${count} out of ${N}
        cities are efficiently reachable.
    `;


    // -------------------------
    // TABLE
    // -------------------------

    resultTable.innerHTML = "";


    for (
        let i = 1;
        i <= N;
        i++
    ) {

        const row =
            document.createElement("tr");


        const isReachable =
            distance[i] !== -1 &&
            distance[i] <= D;


        let distanceText;


        if (distance[i] === -1) {

            distanceText =
                "Unreachable";

        }
        else {

            distanceText =
                distance[i];

        }


        const status =
            isReachable

                ? `<span class="reachable">
                       Reachable ✓
                   </span>`

                : `<span class="notReachable">
                       Not Reachable ✕
                   </span>`;


        row.innerHTML = `

            <td>
                City ${i}
            </td>

            <td>
                ${distanceText}
            </td>

            <td>
                ${status}
            </td>

        `;


        resultTable.appendChild(row);

    }


    // -------------------------
    // DRAW GRAPH
    // -------------------------

    drawGraph(
        N,
        D,
        distance,
        visualizationEdges
    );


    // -------------------------
    // CONSOLE
    // -------------------------

    console.log(
        "=============================="
    );

    console.log(
        "Emergency Route Validation"
    );

    console.log(
        "Cities:",
        N
    );

    console.log(
        "Roads:",
        M
    );

    console.log(
        "Maximum Distance:",
        D
    );

    console.log(
        "Distances:",
        distance
    );

    console.log(
        "Reachable Cities:",
        count
    );

    console.log(
        "=============================="
    );

}


// =====================================================
// DRAW GRAPH
// =====================================================

function drawGraph(
    N,
    D,
    distance,
    visualizationEdges
) {

    graphContainer.innerHTML = "";


    // -------------------------
    // CREATE NODES
    // -------------------------

    const nodes = [];


    for (
        let i = 1;
        i <= N;
        i++
    ) {

        const isCapital =
            i === 1;


        const isReachable =
            distance[i] !== -1 &&
            distance[i] <= D;


        let background;


        if (isCapital) {

            background =
                "#0ea5e9";

        }
        else if (isReachable) {

            background =
                "#22c55e";

        }
        else {

            background =
                "#ef4444";

        }


        let distanceText;


        if (distance[i] === -1) {

            distanceText =
                "Unreachable";

        }
        else {

            distanceText =
                `Distance: ${distance[i]}`;

        }


        nodes.push({

            id: i,

            label:
`City ${i}
${distanceText}`,

            shape: "circle",

            size: 34,

            color: {

                background: background,

                border:
                    isCapital
                        ? "#7dd3fc"
                        : "#ffffff",

                highlight: {

                    background:
                        "#a78bfa",

                    border:
                        "#ffffff"

                },

                hover: {

                    background:
                        "#a78bfa",

                    border:
                        "#ffffff"

                }

            },

            font: {

                color: "#ffffff",

                size: 11,

                face: "Inter"

            },

            borderWidth:
                isCapital ? 4 : 2,

            shadow: {

                enabled: true,

                color:
                    "rgba(0,0,0,0.4)",

                size: 10,

                x: 3,

                y: 3

            }

        });

    }


    // -------------------------
    // DATA
    // -------------------------

    const data = {

        nodes:
            new vis.DataSet(nodes),

        edges:
            new vis.DataSet(
                visualizationEdges
            )

    };


    // -------------------------
    // OPTIONS
    // -------------------------

    const options = {

        layout: {

            improvedLayout: true

        },


        edges: {

            width: 2,

            color: {

                color:
                    "#475569",

                highlight:
                    "#38bdf8",

                hover:
                    "#38bdf8"

            },

            smooth: {

                enabled: true,

                type:
                    "dynamic"

            }

        },


        nodes: {

            borderWidth: 2

        },


        interaction: {

            hover: true,

            tooltipDelay: 100,

            navigationButtons: true,

            keyboard: true,

            zoomView: true,

            dragView: true,

            dragNodes: true

        },


        physics: {

            enabled: true,

            stabilization: {

                iterations: 200

            },

            barnesHut: {

                gravitationalConstant:
                    -2500,

                centralGravity:
                    0.2,

                springLength:
                    150,

                springConstant:
                    0.04,

                damping:
                    0.09

            }

        }

    };


    // -------------------------
    // CREATE NETWORK
    // -------------------------

    const network =
        new vis.Network(
            graphContainer,
            data,
            options
        );


    // -------------------------
    // FIT GRAPH
    // -------------------------

    setTimeout(() => {

        network.fit({

            animation: {

                duration: 600,

                easing:
                    "easeInOutQuad"

            }

        });

    }, 500);


    // Highlight capital

    network.selectNodes([1]);

}