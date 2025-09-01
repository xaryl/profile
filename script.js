document.addEventListener('DOMContentLoaded', function () {

    const canvas = document.querySelector('.canvas');
    let lastToggleTime = 0;

    function toggleLoop(timestamp) {
        if (!lastToggleTime) {
            lastToggleTime = timestamp;
        }

        const elapsed = timestamp - lastToggleTime;

        if (elapsed > 20000) {
            canvas.classList.toggle('is-fbt');

            lastToggleTime = timestamp;
        }

        animationFrameId = requestAnimationFrame(toggleLoop);
    }

    animationFrameId = requestAnimationFrame(toggleLoop);

});