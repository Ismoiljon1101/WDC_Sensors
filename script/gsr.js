// import { Chart } from "chart.js/auto";

const WEBSOCKET_URL = "wss://ws.bitmex.com/realtime";
const MAX_CNT_DATA = 10;
const LABELS = new Array(MAX_CNT_DATA); // Empty label arr for x-axis without any value
LABELS.fill("", 0);
const dataArr = [];
let myChart = null;
let socket = null;



////////////////////////////////////////////////////////////////////////////////
// chart
////////////////////////////////////////////////////////////////////////////////
const createChart = ()=>{
    const canvas = document.querySelector("#gsr");
    myChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: LABELS,
            datasets: [ { label: "GSR", data: dataArr } ],
        },
        options: {
            maintainAspectRatio: false,
            animation: false,
        },
    });
};

const updateChart = (data)=>{

    dataArr.push(data["GSR_ohm"]);
    if(dataArr.length > MAX_CNT_DATA){
        dataArr.shift();
    }

    // console.log(dataArr);
    // console.log(myChart.data.datasets);

    myChart.data.datasets[0].data = dataArr;

    myChart.update();
}




////////////////////////////////////////////////////////////////////////////////
// websocket
////////////////////////////////////////////////////////////////////////////////
const connectWebsocket = ()=>{
    socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = (e)=>{
        console.log("socket opended");
        // need to change below
        const data = {"op": "subscribe", "args": ["trade"]};
        socket.send(JSON.stringify(data));
    };

    socket.onmessage = (e)=>{
        console.log("data recevied");

        // for the actual data
        // const data = JSON.parse(e.data);

        // dummy data for test
        const data = {
            "GSR_ohm" : Math.random()
        };

        updateChart(data);
    };

    socket.onerror = (e)=>{

    };

    socket.onclose = (e)=>{
        console.log("socket clsoed");
    }
};

const disconnectWebSocket = ()=>{
    socket.close();
}


////////////////////////////////////////////////////////////////////////////////
// create & destroy
////////////////////////////////////////////////////////////////////////////////
const createAll = ()=>{
    createChart();
    connectWebsocket();
};
const destroyAll = ()=>{
    disconnectWebSocket();
    myChart = null;
    socket = null;
};



////////////////////////////////////////////////////////////////////////////////
// for usage js file as module
////////////////////////////////////////////////////////////////////////////////
// export default {createAll, destroyAll};



////////////////////////////////////////////////////////////////////////////////
// Activate
////////////////////////////////////////////////////////////////////////////////
createAll();