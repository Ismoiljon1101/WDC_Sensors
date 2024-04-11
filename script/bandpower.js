// import { Chart } from "chart.js/auto";

const WEBSOCKET_URL = "wss://ws.bitmex.com/realtime";
const MAX_CNT_SENSORS = 2;  // change this number to regulate the maximum number of sensors can be selected
let myChart = null;
let selectedSensors = null;
let socket = null;

////////////////////////////////////////////////////////////////////////////////
// selecting sensors to display on chart
////////////////////////////////////////////////////////////////////////////////
const updateSelectedSensors = (e)=>{
    const beforeNumOfSensors = selectedSensors.length;
    const checkboxes = document.querySelectorAll(`input[type=checkbox]`);
    const newSelectedSensors = [];

    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked)    
            newSelectedSensors.push(checkbox.value);
    });
    selectedSensors = newSelectedSensors;

    if(selectedSensors.length >= MAX_CNT_SENSORS){
        checkboxes.forEach((checkbox)=>{
            if(!checkbox.checked)
                checkbox.disabled = true;
        });
    }else if(beforeNumOfSensors>= MAX_CNT_SENSORS && selectedSensors.length < MAX_CNT_SENSORS){
        checkboxes.forEach((checkbox)=>{
            checkbox.disabled = false;
        });
    }

    console.log("selectedSensors", selectedSensors);
};
const attachEventListeners = ()=>{
    const checkboxes = document.querySelectorAll("#select-sensors input[type=checkbox]");
    checkboxes.forEach((checkbox)=>{
        checkbox.addEventListener('change', updateSelectedSensors);
    });
};
const removeEventListeners = ()=>{
    const checkboxes = document.querySelectorAll("#select-sensors input[type=checkbox]");
    checkboxes.forEach((checkbox)=>{
        checkbox.removeEventListener('change', updateSelectedSensors);
    });
};



////////////////////////////////////////////////////////////////////////////////
// chart
////////////////////////////////////////////////////////////////////////////////
const createChart = ()=>{
    const canvas = document.querySelector("#bandpower");
    myChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: ["alpha", "beta Low", "beta High", "theta", "gamma"],
            datasets: [ { label: "AF3", data: [] } ],
        },
        options: {
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: { max: 50 }, 
            }
        },
    });
};

const updateChart = (data)=>{
    const newDataSet = [];

    selectedSensors.forEach((sensor)=>{
        newDataSet.push({
            label: sensor,
            data: data[sensor],
        });
    });

    myChart.data.datasets = newDataSet;

    // console.log(selectedSensors)
    // console.log(newDataSet)

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
            "af3": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "f7": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "f3": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "fc5": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "t7": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "p7": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "o1": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "o2": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "p8": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "t8": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "fc6": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "f4": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "f8": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
            "af4": [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50],
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
    selectedSensors = ["af3"];  // initial data src
    attachEventListeners();
    createChart();
    connectWebsocket();
};
const destroyAll = ()=>{
    disconnectWebSocket();
    removeEventListeners();
    myChart = null;
    selectedSensors = null;
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