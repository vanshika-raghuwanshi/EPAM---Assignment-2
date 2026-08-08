// =====================================================
// TREE OF TRUSTED SERVERS
// JavaScript
// =====================================================


// ===========================
// HTML ELEMENTS
// ===========================

const nInput = document.getElementById("n");
const kInput = document.getElementById("k");

const keysInput = document.getElementById("keys");
const edgesInput = document.getElementById("edges");

const calculateBtn =
    document.getElementById("calculateBtn");

const sampleBtn =
    document.getElementById("sampleBtn");

const resetBtn =
    document.getElementById("resetBtn");

const totalServers =
    document.getElementById("totalServers");

const trustedServers =
    document.getElementById("trustedServers");

const displayK =
    document.getElementById("displayK");

const resultTable =
    document.getElementById("resultTable");

const resultMessage =
    document.getElementById("resultMessage");

const treeContainer =
    document.getElementById("tree");


// ===========================
// LOAD SAMPLE
// ===========================

sampleBtn.addEventListener("click", () => {

    nInput.value = 7;

    kInput.value = 5;

    keysInput.value =
        "3 6 2 7 1 4 5";

    edgesInput.value =
`1 2
1 3
2 4
2 5
3 6
3 7`;

    calculateTrustedServers();

});


// ===========================
// RESET
// ===========================

resetBtn.addEventListener("click", () => {

    nInput.value = "";

    kInput.value = "";

    keysInput.value = "";

    edgesInput.value = "";

    totalServers.textContent = "0";

    trustedServers.textContent = "0";

    displayK.textContent = "0";

    resultTable.innerHTML = "";

    resultMessage.className =
        "result-message";

    resultMessage.innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        Enter the server details and analyze
        the tree.
    `;

    treeContainer.innerHTML = `
        <div class="empty-tree">

            <div class="empty-icon">

                <i class="fa-solid fa-sitemap"></i>

            </div>

            <h3>
                Tree Visualization
            </h3>

            <p>
                Load a sample or enter your own
                input to visualize the server tree.
            </p>

        </div>
    `;

});


// ===========================
// CALCULATE
// ===========================

calculateBtn.addEventListener(
    "click",
    calculateTrustedServers
);


// =====================================================
// MAIN FUNCTION
// =====================================================

function calculateTrustedServers() {

    // -------------------------
    // READ N AND K
    // -------------------------

    const N =
        Number(nInput.value);

    const K =
        Number(kInput.value);


    if (
        !Number.isInteger(N) ||
        N < 1
    ) {

        alert(
            "Please enter a valid number of servers."
        );

        return;
    }


    if (
        !Number.isInteger(K) ||
        K < 0
    ) {

        alert(
            "Please enter a valid threshold K."
        );

        return;
    }


    // -------------------------
    // READ KEYS
    // -------------------------

    const keyText =
        keysInput.value.trim();


    if (!keyText) {

        alert(
            "Please enter security keys."
        );

        return;
    }


    const keys =
        keyText
            .split(/\s+/)
            .map(Number);


    if (keys.length !== N) {

        alert(
            `Expected ${N} security keys, but received ${keys.length}.`
        );

        return;
    }


    if (
        keys.some(
            key =>
                !Number.isInteger(key) ||
                key < 0
        )
    ) {

        alert(
            "Security keys must be non-negative integers."
        );

        return;
    }


    // -------------------------
    // READ EDGES
    // -------------------------

    const edgeText =
        edgesInput.value.trim();


    if (N === 1 && edgeText === "") {

        // A single-node tree has no edges.

    }
    else if (!edgeText) {

        alert(
            "Please enter the tree edges."
        );

        return;
    }


    let edgeLines = [];


    if (edgeText) {

        edgeLines =
            edgeText
                .split(/\r?\n/)
                .filter(
                    line => line.trim() !== ""
                );

    }


    if (edgeLines.length !== N - 1) {

        alert(
            `A tree with ${N} servers must contain exactly ${N - 1} edges.`
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
                "Invalid edge format. Use: u v"
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
                `Invalid edge: ${line}`
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
    // DFS ARRAYS
    // -------------------------

    const visited =
        new Array(N + 1)
            .fill(false);


    const xorValue =
        new Array(N + 1)
            .fill(0);


    let trustedCount = 0;


    // -------------------------
    // DFS
    // -------------------------

    function dfs(node, parentXor) {

        visited[node] = true;


        xorValue[node] =
            parentXor ^
            keys[node - 1];


        if (
            xorValue[node] >= K
        ) {

            trustedCount++;

        }


        for (
            const neighbor
            of graph[node]
        ) {

            if (
                !visited[neighbor]
            ) {

                dfs(
                    neighbor,
                    xorValue[node]
                );

            }

        }

    }


    // -------------------------
    // START DFS
    // -------------------------

    dfs(1, 0);


    // -------------------------
    // CHECK CONNECTIVITY
    // -------------------------

    for (
        let i = 1;
        i <= N;
        i++
    ) {

        if (!visited[i]) {

            alert(
                "The given edges do not form a connected tree."
            );

            return;
        }

    }


    // -------------------------
    // UPDATE STATISTICS
    // -------------------------

    totalServers.textContent =
        N;

    trustedServers.textContent =
        trustedCount;

    displayK.textContent =
        K;


    // -------------------------
    // RESULT MESSAGE
    // -------------------------

    resultMessage.className =
        "result-message success";


    resultMessage.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Analysis complete. 
        ${trustedCount} out of ${N}
        servers satisfy the security policy.
    `;


    // -------------------------
    // RESULT TABLE
    // -------------------------

    resultTable.innerHTML = "";


    for (
        let i = 1;
        i <= N;
        i++
    ) {

        const row =
            document.createElement("tr");


        const isTrusted =
            xorValue[i] >= K;


        const status =
            isTrusted

                ? `<span class="trusted">
                       Trusted ✓
                   </span>`

                : `<span class="notTrusted">
                       Not Trusted ✕
                   </span>`;


        row.innerHTML = `

            <td>
                Server ${i}
            </td>

            <td>
                ${keys[i - 1]}
            </td>

            <td>
                ${xorValue[i]}
            </td>

            <td>
                ${status}
            </td>

        `;


        resultTable.appendChild(row);

    }


    // -------------------------
    // DRAW TREE
    // -------------------------

    drawTree(
        N,
        K,
        keys,
        xorValue,
        visualizationEdges
    );


    // -------------------------
    // CONSOLE
    // -------------------------

    console.log(
        "=============================="
    );

    console.log(
        "Tree of Trusted Servers"
    );

    console.log(
        "Servers:",
        N
    );

    console.log(
        "Threshold:",
        K
    );

    console.log(
        "Keys:",
        keys
    );

    console.log(
        "Path XOR:",
        xorValue
    );

    console.log(
        "Trusted:",
        trustedCount
    );

    console.log(
        "=============================="
    );

}


// =====================================================
// DRAW TREE
// =====================================================

function drawTree(
    N,
    K,
    keys,
    xorValue,
    visualizationEdges
) {

    treeContainer.innerHTML = "";


    // -------------------------
    // CREATE NODES
    // -------------------------

    const nodes = [];


    for (
        let i = 1;
        i <= N;
        i++
    ) {

        const isTrusted =
            xorValue[i] >= K;


        const isRoot =
            i === 1;


        let backgroundColor;


        if (isRoot) {

            backgroundColor =
                "#8b5cf6";

        }
        else if (isTrusted) {

            backgroundColor =
                "#22c55e";

        }
        else {

            backgroundColor =
                "#ef4444";

        }


        nodes.push({

            id: i,

            label:
`Server ${i}
Key: ${keys[i - 1]}
XOR: ${xorValue[i]}`,

            shape: "circle",

            size: 34,

            color: {

                background:
                    backgroundColor,

                border:
                    isRoot
                        ? "#c4b5fd"
                        : "#ffffff",

                highlight: {

                    background:
                        "#38bdf8",

                    border:
                        "#ffffff"

                },

                hover: {

                    background:
                        "#38bdf8",

                    border:
                        "#ffffff"

                }

            },

            font: {

                color:
                    "#ffffff",

                size: 11,

                face:
                    "Inter"

            },

            borderWidth:
                isRoot ? 4 : 2,

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
    // CREATE DATA
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
    // NETWORK OPTIONS
    // -------------------------

    const options = {

        layout: {

            hierarchical: {

                enabled: true,

                direction: "UD",

                sortMethod: "directed",

                levelSeparation: 110,

                nodeSpacing: 160,

                treeSpacing: 180,

                blockShifting: true,

                edgeMinimization: true,

                parentCentralization: true

            }

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
                    "cubicBezier",

                forceDirection:
                    "vertical",

                roundness:
                    0.35

            },

            arrows: {

                to: {

                    enabled: false

                }

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

            dragNodes: false

        },


        physics: {

            enabled: false

        }

    };


    // -------------------------
    // CREATE NETWORK
    // -------------------------

    const network =
        new vis.Network(
            treeContainer,
            data,
            options
        );


    // -------------------------
    // FIT TREE
    // -------------------------

    setTimeout(() => {

        network.fit({

            animation: {

                duration: 600,

                easing: "easeInOutQuad"

            }

        });

    }, 200);


    // -------------------------
    // ROOT HIGHLIGHT
    // -------------------------

    network.selectNodes([1]);

}