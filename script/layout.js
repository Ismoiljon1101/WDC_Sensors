(()=>{
    const toggleSidebar = ()=>{
        const sidebar = document.querySelector("#mySidebar");
        const current = sidebar.style.display;
        // console.log(current);
        sidebar.style.display = current == "block" ? "none" : "block";
    };
    
    document.querySelectorAll(".toggle-sidebar-btn").forEach((btn)=>{
        btn.addEventListener('click', toggleSidebar);
    });
    
    $("#btn-index").on('click', ()=>{
        $("body").load("./index.html");
    });
    $("#btn-epocX").on('click', ()=>{
        $("body").load("./epocX.html");
    });
    $("#btn-shimmer").on('click', ()=>{
        $("body").load("./shimmer.html");
    });


})();
