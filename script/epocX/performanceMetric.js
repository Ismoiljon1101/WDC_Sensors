(()=>{

const ctx = document.querySelector('#performanceMetric canvas');
        
new Chart(ctx, {
    type: 'radar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple',],
    datasets: [{
        label: 'LABE IT HERE',
        data: [12, 19, 3, 5, 2,],
        borderWidth: 5
    }]
    },
    options: {
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});

})();