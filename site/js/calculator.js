/* ===========================
   EliGal – Solar Calculator
   Vanilla JS – No frameworks
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    const areaSlider = document.getElementById('calc-area');
    const areaDisplay = document.getElementById('calc-area-value');
    const tiledBtn = document.getElementById('roof-tiled');
    const flatBtn = document.getElementById('roof-flat');
    const directionSelect = document.getElementById('roof-direction');

    const resultSize = document.getElementById('result-size');
    const resultCost = document.getElementById('result-cost');
    const resultIncome = document.getElementById('result-income');
    const resultRoi = document.getElementById('result-roi');

    if (!areaSlider) return;

    let area = parseInt(areaSlider.value) || 120;
    let roofType = 'tiled';
    let direction = 1;

    function getPricePerKw(size) {
        if (size < 10) return 7000;
        if (size < 20) return 6200;
        if (size < 50) return 5500;
        return 4800;
    }

    function calculate() {
        const density = roofType === 'tiled' ? 7.5 : 10;
        const size = area / density;
        const pricePerKw = getPricePerKw(size);
        const totalCost = size * pricePerKw;
        const efficiency = 0.8;
        const annualProd = size * 1700 * efficiency * direction;
        const tariff = 0.52;
        const annualIncome = annualProd * tariff;
        const roi = totalCost / annualIncome;

        resultSize.textContent = size.toFixed(1);
        resultCost.textContent = '₪' + Math.round(totalCost).toLocaleString('he-IL');
        resultIncome.textContent = '₪' + Math.round(annualIncome).toLocaleString('he-IL');
        resultRoi.textContent = roi.toFixed(1) + ' שנים';
    }

    // Slider
    areaSlider.addEventListener('input', () => {
        area = parseInt(areaSlider.value);
        areaDisplay.textContent = area + ' מ"ר';
        calculate();
    });

    // Roof type toggle
    tiledBtn.addEventListener('click', () => {
        roofType = 'tiled';
        tiledBtn.classList.add('active');
        flatBtn.classList.remove('active');
        calculate();
    });
    flatBtn.addEventListener('click', () => {
        roofType = 'flat';
        flatBtn.classList.add('active');
        tiledBtn.classList.remove('active');
        calculate();
    });

    // Direction
    directionSelect.addEventListener('change', () => {
        direction = parseFloat(directionSelect.value);
        calculate();
    });

    // Initial calculation
    calculate();
});
