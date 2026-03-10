fetch("header.html")
    .then(res => res.text())
    .then(data => {
        document.querySelector("#header").innerHTML = data;
        let hamBtns = document.querySelectorAll('.ham-btn a');
        let closeBtn = document.querySelector('.ham-close');

        hamBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.add('active');
            });
        });

        function closeHam() {
            document.body.classList.remove('active');
        }

        closeBtn.addEventListener('click', closeHam);
    })

fetch("footer.html")
    .then(res => res.text())
    .then(data => {
        document.querySelector("#footer").innerHTML = data;
    })